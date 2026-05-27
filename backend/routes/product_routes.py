from fastapi import APIRouter
from db import get_connection

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

@router.get("/")
def get_products():

    connection = get_connection()

    cursor = connection.cursor()

    query = "SELECT * FROM products"

    cursor.execute(query)

    products = cursor.fetchall()

    return {
        "success": True,
        "data": products
    }

@router.put("/approve/{id}")
def approve_product(id: int):

    connection = get_connection()

    cursor = connection.cursor()

    query = """
    UPDATE products
    SET status='Approved'
    WHERE id=%s
    """

    cursor.execute(query, (id,))

    connection.commit()

    return {
        "success": True,
        "message": "Product Approved"
    }

@router.put("/reject/{id}")
def reject_product(id: int):

    connection = get_connection()

    cursor = connection.cursor()

    query = """
    UPDATE products
    SET status='Rejected'
    WHERE id=%s
    """

    cursor.execute(query, (id,))

    connection.commit()

    return {
        "success": True,
        "message": "Product Rejected"
    }