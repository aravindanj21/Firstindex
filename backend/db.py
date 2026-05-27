import mysql.connector

connection = mysql.connector.connect(
    host='localhost',
    user='root',
    password='admin',
    database='admin_dashboard'
)

def get_connection():
    return connection