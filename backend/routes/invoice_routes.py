from fastapi import APIRouter
from db import get_connection
from models import Invoice

router = APIRouter()



@router.post("/invoice/create")
def create_invoice(invoice: Invoice):

    conn = get_connection()
    cursor = conn.cursor()

    query = """
    INSERT INTO invoices (
        invoice_number,
        vendor_name,
        supplier_name,
        product_details,
        quantity,
        price,
        tax,
        total_amount,
        invoice_date,
        due_date,
        status
    )
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        invoice.invoiceNumber,
        invoice.vendorName,
        invoice.supplierName,
        invoice.productDetails,
        invoice.quantity,
        invoice.price,
        invoice.tax,
        invoice.totalAmount,
        invoice.invoiceDate,
        invoice.dueDate,
        invoice.status
    )

    cursor.execute(query, values)
    conn.commit()

    cursor.close()
    conn.close()

    return {
        "success": True,
        "message": "Invoice Created Successfully"
    }



@router.get("/invoice/list")
def get_invoice_list():

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT *
        FROM invoices
        ORDER BY id DESC
    """)

    invoices = cursor.fetchall()

    cursor.close()
    conn.close()

    return invoices



@router.get("/invoice/{invoice_number}")
def get_invoice(invoice_number: str):

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT *
        FROM invoices
        WHERE invoice_number = %s
        """,
        (invoice_number,)
    )

    invoice = cursor.fetchone()

    cursor.close()
    conn.close()

    if not invoice:
        return {
            "success": False,
            "message": "Invoice Not Found"
        }

    return invoice



@router.put("/invoice/update/{invoice_number}")
def update_invoice(
    invoice_number: str,
    invoice: Invoice
):

    conn = get_connection()
    cursor = conn.cursor()

    query = """
    UPDATE invoices
    SET
        vendor_name=%s,
        supplier_name=%s,
        product_details=%s,
        quantity=%s,
        price=%s,
        tax=%s,
        total_amount=%s,
        invoice_date=%s,
        due_date=%s,
        status=%s
    WHERE invoice_number=%s
    """

    values = (
        invoice.vendorName,
        invoice.supplierName,
        invoice.productDetails,
        invoice.quantity,
        invoice.price,
        invoice.tax,
        invoice.totalAmount,
        invoice.invoiceDate,
        invoice.dueDate,
        invoice.status,
        invoice_number
    )

    cursor.execute(query, values)
    conn.commit()

    cursor.close()
    conn.close()

    return {
        "success": True,
        "message": "Invoice Updated Successfully"
    }



@router.delete("/invoice/delete/{invoice_number}")
def delete_invoice(invoice_number: str):

    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        DELETE FROM invoices
        WHERE invoice_number=%s
        """,
        (invoice_number,)
    )

    conn.commit()

    cursor.close()
    conn.close()

    return {
        "success": True,
        "message": "Invoice Deleted Successfully"
    }