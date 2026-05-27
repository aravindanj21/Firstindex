from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db import connection, cursor

app = FastAPI()

app.add_middleware(

    CORSMiddleware,

    allow_origins=["*"],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)



@app.get("/products")

def get_products():

    query = "SELECT * FROM products"

    cursor.execute(query)

    products = cursor.fetchall()

    return products



@app.post("/products")

def add_product(product: dict):

    query = """

    INSERT INTO products
    (title, category, stock, price, image)

    VALUES (%s, %s, %s, %s, %s)

    """

    values = (

        product["title"],
        product["category"],
        product["stock"],
        product["price"],
        product["image"]
    )

    cursor.execute(query, values)

    connection.commit()

    return {
        "message": "Product Added"
    }




@app.put("/products/{product_id}")

def update_product(product_id: int, product: dict):

    query = """

    UPDATE products

    SET
        title=%s,
        category=%s,
        stock=%s,
        price=%s,
        image=%s

    WHERE id=%s

    """

    values = (

        product["title"],
        product["category"],
        product["stock"],
        product["price"],
        product["image"],
        product_id
    )

    cursor.execute(query, values)

    connection.commit()

    return {
        "message": "Product Updated"
    }



@app.delete("/products/{product_id}")

def delete_product(product_id: int):

    query = "DELETE FROM products WHERE id=%s"

    cursor.execute(query, (product_id,))

    connection.commit()

    return {
        "message": "Product Deleted"
    }




@app.get("/dashboard")

def dashboard():

    cursor.execute("SELECT COUNT(*) AS total FROM products")

    total_products = cursor.fetchone()["total"]

    cursor.execute("SELECT SUM(stock) AS stock FROM products")

    stock_result = cursor.fetchone()

    overall_stock = stock_result["stock"] or 0

    return {

        "totalProducts": total_products,

        "overallStock": overall_stock,

        "pendingRequests": 20,

        "recentActivity": 15
    }