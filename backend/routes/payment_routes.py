from fastapi import APIRouter
from db import get_connection
from models import Payment

router = APIRouter()


@router.post("/payment/create")
def create_payment(payment: Payment):

    conn = get_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO payments(
        transaction_id,
        invoice_number,
        vendor_name,
        amount,
        payment_method,
        payment_date,
        status
    )
    VALUES(%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        payment.transactionId,
        payment.invoiceNumber,
        payment.vendorName,
        payment.amount,
        payment.paymentMethod,
        payment.paymentDate,
        payment.status
    )

    cursor.execute(query, values)
    conn.commit()

    cursor.close()
    conn.close()

    return {
        "success": True,
        "message": "Payment Created Successfully"
    }


@router.get("/payment/list")
def get_payments():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM payments
        ORDER BY id DESC
    """)

    payments = cursor.fetchall()

    cursor.close()
    conn.close()

    return payments


@router.get("/payment/{transaction_id}")
def get_payment(transaction_id: str):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT *
        FROM payments
        WHERE transaction_id=%s
        """,
        (transaction_id,)
    )

    payment = cursor.fetchone()

    cursor.close()
    conn.close()

    return payment


@router.delete("/payment/delete/{transaction_id}")
def delete_payment(transaction_id: str):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        DELETE FROM payments
        WHERE transaction_id=%s
        """,
        (transaction_id,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "success": True,
        "message": "Payment Deleted"
    }