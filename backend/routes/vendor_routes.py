from fastapi import APIRouter
from db import get_connection

router = APIRouter(
    prefix="/vendors",
    tags=["Vendors"]
)

@router.get("/")
def get_vendors():

    connection = get_connection()

    cursor = connection.cursor()

    query = """
    SELECT * FROM users
    WHERE role='vendor'
    """

    cursor.execute(query)

    vendors = cursor.fetchall()

    return {
        "success": True,
        "data": vendors
    }

@router.put("/block/{id}")
def block_vendor(id: int):

    connection = get_connection()

    cursor = connection.cursor()

    query = """
    UPDATE users
    SET status='Blocked'
    WHERE id=%s
    """

    cursor.execute(query, (id,))

    connection.commit()

    return {
        "success": True,
        "message": "Vendor Blocked"
    }

@router.put("/unblock/{id}")
def unblock_vendor(id: int):

    connection = get_connection()

    cursor = connection.cursor()

    query = """
    UPDATE users
    SET status='Approved'
    WHERE id=%s
    """

    cursor.execute(query, (id,))

    connection.commit()

    return {
        "success": True,
        "message": "Vendor Unblocked"
    }