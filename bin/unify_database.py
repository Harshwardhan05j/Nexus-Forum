import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def migrate_users():
    try:
        conn = psycopg2.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            database=os.getenv('DB_NAME', 'nexus_forum'),
            user=os.getenv('DB_USER', 'postgres'),
            password=os.getenv('DB_PASSWORD'),
            port=os.getenv('DB_PORT', '5432')
        )
        cur = conn.cursor()

        # 1. Add missing columns to "User" table (handling quotes for table name)
        print("Ensuring 'password' and 'role' columns exist in the 'User' table...")
        cur.execute('ALTER TABLE "User" ADD COLUMN IF NOT EXISTS password TEXT;')
        cur.execute('ALTER TABLE "User" ADD COLUMN IF NOT EXISTS role TEXT DEFAULT \'user\';')
        conn.commit()

        # 2. Check if there are users in 'users' that aren't in 'User'
        print("Syncing data from 'users' to 'User'...")
        cur.execute("""
            INSERT INTO "User" (id, name, email, password, role, "updatedAt")
            SELECT CAST(id AS TEXT), name, email, password, role, NOW() FROM users
            ON CONFLICT (email) DO NOTHING;
        """)
        conn.commit()

        print("Migration and data sync complete! Your 'User' table is now unified.")
        cur.close()
        conn.close()
    except Exception as e:
        print(f"Error during migration: {e}")

if __name__ == "__main__":
    migrate_users()
