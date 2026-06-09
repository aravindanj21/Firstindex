from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.invoice_routes import router as invoice_router
from routes.payment_routes import router as payment_router
from routes.billing_routes import router as billing_router

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(invoice_router)
app.include_router(payment_router)
app.include_router(billing_router)


@app.get("/")
def home():
    return {
        "message": "Invoice Billing Backend Running"
    }