import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def fix_admin():
    try:
        conn = psycopg2.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            database=os.getenv('DB_NAME', 'nexus_forum'),
            user=os.getenv('DB_USER', 'postgres'),
            password=os.getenv('DB_PASSWORD'),
            port=os.getenv('DB_PORT', '5432')
        )
        cursor = conn.cursor()
        
        email = "harshwardhanjadhav01@gmail.com"
        
        # Check current status
        cursor.execute("SELECT name, email, role FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        
        if user:
            print(f"--- DATABASE CHECK ---")
            print(f"Name: {user[0]}")
            print(f"Email: {user[1]}")
            print(f"Current Role: {user[2]}")
            
            if user[2] != 'admin':
                print("Setting role to 'admin' now...")
                cursor.execute("UPDATE users SET role = 'admin' WHERE email = %s", (email,))
                conn.commit()
                print("SUCCESS: Role updated to admin!")
            else:
                print("The database already has you set as 'admin'.")
        else:
            print(f"ERROR: No user found with email {email}. Please sign up first!")

        cursor.close()
        conn.close()
    except Exception as e:
        print(f"CONNECTION ERROR: {e}")

if __name__ == "__main__":
    fix_admin()
