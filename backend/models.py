from pydantic import BaseModel

class Invoice(BaseModel):
    invoiceNumber: str
    vendorName: str
    supplierName: str
    productDetails: str
    quantity: int
    price: float
    tax: float
    totalAmount: float
    invoiceDate: str
    dueDate: str
    status: str


class Payment(BaseModel):
    transactionId: str
    invoiceNumber: str
    vendorName: str
    amount: float
    paymentMethod: str
    paymentDate: str
    status: str