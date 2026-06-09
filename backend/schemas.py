from pydantic import BaseModel
from datetime import date

class InvoiceCreate(BaseModel):
    invoice_number: str
    vendor_name: str
    supplier_name: str
    product_details: str
    quantity: int
    price: float
    tax: float
    invoice_date: date
    due_date: date
    status: str


class PaymentCreate(BaseModel):
    transaction_id: str
    invoice_number: str
    vendor_name: str
    amount: float
    payment_method: str
    payment_date: date
    status: str