from fastapi import APIRouter
from db import get_connection

router = APIRouter()


@router.get("/billing/summary")
def billing_summary():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT
        IFNULL(SUM(total_amount),0) AS totalRevenue
        FROM invoices
    """)

    totalRevenue = cursor.fetchone()

    cursor.execute("""
        SELECT
        IFNULL(SUM(total_amount),0) AS paidAmount
        FROM invoices
        WHERE status='Paid'
    """)

    paidAmount = cursor.fetchone()

    cursor.execute("""
        SELECT
        IFNULL(SUM(total_amount),0) AS pendingAmount
        FROM invoices
        WHERE status='Pending'
    """)

    pendingAmount = cursor.fetchone()

    cursor.execute("""
        SELECT
        IFNULL(SUM(total_amount),0) AS overdueAmount
        FROM invoices
        WHERE status='Overdue'
    """)

    overdueAmount = cursor.fetchone()

    cursor.close()
    conn.close()

    return {
        "totalRevenue": totalRevenue["totalRevenue"],
        "paidAmount": paidAmount["paidAmount"],
        "pendingAmount": pendingAmount["pendingAmount"],
        "overdueAmount": overdueAmount["overdueAmount"]
    }