import mysql.connector

connection = mysql.connector.connect(

    host="localhost",

    user="root",

    password="admin",

    database="supplier_db"
)

cursor = connection.cursor(dictionary=True)