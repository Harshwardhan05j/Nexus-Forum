import sqlite3
from werkzeug.security import generate_password_hash

def setup_sqlite_admin():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    # 1. Ensure the role column exists in users table
    try:
        cursor.execute("PRAGMA table_info(users)")
        cols = [col[1] for col in cursor.fetchall()]
        if 'role' not in cols:
            print("Adding 'role' column to users...")
            cursor.execute("ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'")
            conn.commit()
    except Exception as e:
        print(f"Error updating table: {e}")

    # 2. Create the Admin account if it doesn't exist
    admin_email = "admin@nexus.edu"
    cursor.execute("SELECT * FROM users WHERE email = ?", (admin_email,))
    if not cursor.fetchone():
        print("Creating SQLite admin account...")
        hashed_pw = generate_password_hash("admin123")
        cursor.execute("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
                     ("Admin", admin_email, hashed_pw, 'admin'))
        conn.commit()
        print(f"Admin created: {admin_email} / admin123")
    else:
        # Just ensure role is admin
        cursor.execute("UPDATE users SET role = 'admin' WHERE email = ?", (admin_email,))
        conn.commit()
        print("Admin account verified.")

    conn.close()

if __name__ == "__main__":
    setup_sqlite_admin()
