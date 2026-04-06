import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def create_hackronyx_table():
    try:
        conn = psycopg2.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            database=os.getenv('DB_NAME', 'nexus_forum'),
            user=os.getenv('DB_USER', 'postgres'),
            password=os.getenv('DB_PASSWORD'),
            port=os.getenv('DB_PORT', '5432')
        )
        cur = conn.cursor()

        print("Dropping and recreating 'hackronyx_willingness' table with simplified fields...")
        cur.execute("DROP TABLE IF EXISTS hackronyx_willingness;")
        cur.execute("""
            CREATE TABLE hackronyx_willingness (
                id SERIAL PRIMARY KEY,
                full_name TEXT NOT NULL,
                department TEXT NOT NULL,
                mobile_no TEXT NOT NULL,
                email TEXT NOT NULL,
                submitted_at TIMESTAMP DEFAULT NOW()
            );
        """)
        conn.commit()

        print("Table recreated successfully!")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error during migration: {e}")

if __name__ == "__main__":
    create_hackronyx_table()
