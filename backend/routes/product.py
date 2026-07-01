from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List
from app.database import get_connection

import pandas as pd
import shutil
import os
import math
import numpy as np

router = APIRouter()

UPLOAD_DIR = "uploads"
TEMPLATE_DIR = "templates"

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(TEMPLATE_DIR, exist_ok=True)



@router.get("/template")
def download_template():

    file_path = os.path.join(TEMPLATE_DIR, "Product_Template.xlsx")

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Template file not found.")

    return FileResponse(
        path=file_path,
        filename="Product_Template.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )



def clean_value(value):
    if value is None:
        return None
    if isinstance(value, float) and math.isnan(value):
        return None
    if isinstance(value, (np.floating,)) and np.isnan(value):
        return None
    if pd.isna(value):
        return None
    return value



@router.post("/bulk-upload")
async def validate_bulk_upload(
    supplier_id: int = Form(...),
    file: UploadFile = File(...)
):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    
    try:
        if file.filename.endswith(".csv"):
            df = pd.read_csv(file_path)
        else:
            df = pd.read_excel(file_path)

    except Exception:
        raise HTTPException(status_code=400, detail="Invalid Excel/CSV file.")

    required_columns = [
        "product_name",
        "category",
        "description",
        "price",
        "stock",
        "unit",
        "image_url",
        "status",
    ]

    missing_columns = [col for col in required_columns if col not in df.columns]

    if missing_columns:
        raise HTTPException(
            status_code=400,
            detail=f"Missing columns: {', '.join(missing_columns)}"
        )

    preview = []
    errors = []

    valid_rows = 0
    invalid_rows = 0

    
    for index, row in df.iterrows():

        row_errors = []

        product = {
            "product_name": clean_value(row["product_name"]),
            "category": clean_value(row["category"]),
            "description": clean_value(row["description"]),
            "price": clean_value(row["price"]),
            "stock": clean_value(row["stock"]),
            "unit": clean_value(row["unit"]),
            "image_url": clean_value(row["image_url"]),
            "status": clean_value(row["status"]),
            "error": None,
        }

        
        if not product["product_name"]:
            row_errors.append("Product Name is required")

        if not product["category"]:
            row_errors.append("Category is required")

        if product["price"] is None:
            row_errors.append("Price is required")

        if product["stock"] is None:
            row_errors.append("Stock is required")

        if row_errors:
            product["error"] = ", ".join(row_errors)
            invalid_rows += 1
            errors.append(f"Row {index + 2}: {product['error']}")
        else:
            valid_rows += 1

        preview.append(product)

    return {
        "preview": preview,
        "errors": errors,
        "valid_rows": valid_rows,
        "invalid_rows": invalid_rows,
    }



class ProductItem(BaseModel):
    product_name: str
    category: str
    description: str
    price: float
    stock: int
    unit: str
    image_url: str
    status: str


class ImportRequest(BaseModel):
    supplier_id: int
    products: List[ProductItem]



@router.post("/import")
def import_products(data: ImportRequest):

    conn = get_connection()
    cursor = conn.cursor()

    sql = """
        INSERT INTO products
        (
            supplier_id,
            category,
            product_name,
            description,
            price,
            stock,
            unit,
            image_url,
            status
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """

    inserted = 0

    for p in data.products:

        cursor.execute(
            sql,
            (
                data.supplier_id,
                p.category,
                p.product_name,
                p.description,
                p.price,
                p.stock,
                p.unit,
                p.image_url,
                p.status,
            ),
        )

        inserted += 1

    conn.commit()
    cursor.close()
    conn.close()

    return {
        "message": "Products imported successfully",
        "imported": inserted,
    }