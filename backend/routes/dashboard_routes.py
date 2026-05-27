from fastapi import APIRouter
from db import get_connection

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

@router.get("/summary")
def dashboard_summary():

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        "SELECT COUNT(*) AS total_suppliers FROM users WHERE role='supplier'"
    )

    suppliers = cursor.fetchone()

    cursor.execute(
        "SELECT COUNT(*) AS total_vendors FROM users WHERE role='vendor'"
    )

    vendors = cursor.fetchone()

    cursor.execute(
        "SELECT COUNT(*) AS total_products FROM products"
    )

    products = cursor.fetchone()

    cursor.execute(
        "SELECT COUNT(*) AS total_orders FROM orders"
    )

    orders = cursor.fetchone()

    return {
        "success": True,
        "data": {
            "suppliers": suppliers["total_suppliers"],
            "vendors": vendors["total_vendors"],
            "products": products["total_products"],
            "orders": orders["total_orders"]
        }
    }