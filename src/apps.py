from mysql.connector import connect

with connect(
    host="localhost",
    user="root",
    password="admin",
    database="sales_db"
) as conn:

    print("Connection created")

    cur = conn.cursor()

    query = """
        SELECT * FROM orders
    """

    cur.execute(query)
    result = cur.fetchall()

    for row in result:
        print(row)

