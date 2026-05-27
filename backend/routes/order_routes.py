from fastapi import APIRouter
from db import get_connection

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)

@router.get("/")
def get_orders():

    connection = get_connection()

    cursor = connection.cursor()

    query = "SELECT * FROM orders"

    cursor.execute(query)

    orders = cursor.fetchall()

    return {
        "success": True,
        "data": orders
    }