from fastapi import FastAPI

from routes.auth_routes import router as auth_router
from routes.supplier_routes import router as supplier_router
from routes.vendor_routes import router as vendor_router
from routes.product_routes import router as product_router
from routes.order_routes import router as order_router
from routes.dashboard_routes import router as dashboard_router

app = FastAPI()

app.include_router(auth_router)
app.include_router(supplier_router)
app.include_router(vendor_router)
app.include_router(product_router)
app.include_router(order_router)
app.include_router(dashboard_router)

@app.get("/")
def home():
    return {
        "message": "FastAPI Backend Running"
    }