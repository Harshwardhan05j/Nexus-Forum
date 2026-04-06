import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        database=os.getenv('DB_NAME', 'nexus_forum'),
        user=os.getenv('DB_USER', 'postgres'),
        password=os.getenv('DB_PASSWORD'),
        port=os.getenv('DB_PORT', '5432')
    )
    return conn

try:
    with get_db_connection() as conn:
        with conn.cursor() as cursor:
            cursor.execute('SELECT email, role FROM "User"')
            users = cursor.fetchall()
            for user in users:
                print(f"Email: {user[0]}, Role: {user[1]}")
except Exception as e:
    print(f"Error: {e}")
