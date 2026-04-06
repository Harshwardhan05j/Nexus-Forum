import psycopg2
from psycopg2.extras import RealDictCursor
import os
from dotenv import load_dotenv

load_dotenv()

def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=os.getenv('DB_HOST', 'localhost'),
            database=os.getenv('DB_NAME', 'nexus_forum'),
            user=os.getenv('DB_USER', 'postgres'),
            password=os.getenv('DB_PASSWORD'),
            port=os.getenv('DB_PORT', '5432')
        )
        return conn
    except Exception as e:
        print(f"Error connecting to PostgreSQL: {e}")
        return None

def setup_database():
    conn = get_db_connection()
    if not conn:
        print("Could not connect to database. Make sure PostgreSQL is running and your .env is correct.")
        return

    cursor = conn.cursor()

    # Create users table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(150) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR(20) DEFAULT 'user'
        )
    """)

    # Create Career Catalyst table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS career_catalyst(
            id SERIAL PRIMARY KEY,
            full_name VARCHAR(100) NOT NULL,
            email VARCHAR(150) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            department VARCHAR(100) NOT NULL,
            year VARCHAR(20) NOT NULL,
            skills TEXT NOT NULL,
            motivation TEXT NOT NULL,
            applied_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Create Data Science Innovation Club table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS data_science_innovation(
            id SERIAL PRIMARY KEY,
            full_name VARCHAR(100) NOT NULL,
            email VARCHAR(150) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            department VARCHAR(100) NOT NULL,
            year VARCHAR(20) NOT NULL,
            skills TEXT NOT NULL,
            motivation TEXT NOT NULL,
            applied_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Create Web Nest Technology Club table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS web_nest_technology(
            id SERIAL PRIMARY KEY,
            full_name VARCHAR(100) NOT NULL,
            email VARCHAR(150) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            department VARCHAR(100) NOT NULL,
            year VARCHAR(20) NOT NULL,
            skills TEXT NOT NULL,
            motivation TEXT NOT NULL,
            applied_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Create Event Registrations table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS event_registrations(
            id SERIAL PRIMARY KEY,
            event_name VARCHAR(100) NOT NULL,
            full_name VARCHAR(100) NOT NULL,
            email VARCHAR(150) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            year VARCHAR(20) NOT NULL,
            expectations TEXT NOT NULL,
            registered_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    print("PostgreSQL Database initialized successfully!")
    cursor.close()
    conn.close()

if __name__ == "__main__":
    setup_database()
