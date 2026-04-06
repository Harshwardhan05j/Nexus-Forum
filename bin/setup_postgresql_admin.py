import psycopg2
import os
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash

load_dotenv()

def create_admin():
    # --- EDIT YOUR CREDENTIALS HERE ---
    ADMIN_NAME = "Harshwardhan"
    ADMIN_EMAIL = "harshwardhanjadhav01@gmail.com"
    ADMIN_PASSWORD = "harsh2005"
    # ----------------------------------

    try:
        conn = psycopg2.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            database=os.getenv('DB_NAME', 'nexus_forum'),
            user=os.getenv('DB_USER', 'postgres'),
            password=os.getenv('DB_PASSWORD'),
            port=os.getenv('DB_PORT', '5432')
        )
        cursor = conn.cursor()

        # Fix the ID sequence in case it's out of sync
        cursor.execute("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users), true) WHERE (SELECT MAX(id) FROM users) IS NOT NULL")

        # Admin details
        name = ADMIN_NAME
        email = ADMIN_EMAIL
        password = ADMIN_PASSWORD
        role = "admin"
        hashed_password = generate_password_hash(password)

        # Check if exists
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            print("Admin user already exists!")
        else:
            try:
                cursor.execute(
                    "INSERT INTO users (name, email, password, role) VALUES (%s, %s, %s, %s)",
                    (name, email, hashed_password, role)
                )
                conn.commit()
                print(f"Admin user created successfully!")
                print(f"Email: {email}")
                print(f"Password: {password}")
            except psycopg2.IntegrityError:
                conn.rollback()
                print("Could not create admin due to a conflict. The user might already exist with a different ID.")

        cursor.close()
        conn.close()

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_admin()
