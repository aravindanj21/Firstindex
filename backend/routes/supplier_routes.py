from fastapi import APIRouter
from db import get_connection

router = APIRouter(
    prefix="/suppliers",
    tags=["Suppliers"]
)

@router.get("/")
def get_suppliers():

    connection = get_connection()

    cursor = connection.cursor()

    query = """
    SELECT * FROM users
    WHERE role='supplier'
    """

    cursor.execute(query)

    suppliers = cursor.fetchall()

    return {
        "success": True,
        "data": suppliers
    }