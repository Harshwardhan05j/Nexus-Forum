import sqlite3

# Create or connect to database
conn = sqlite3.connect('database.db')
cursor = conn.cursor()

# Create users table if not exists
cursor.execute("""
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
""")

# Create Career Catalyst table
cursor.execute("""
    CREATE TABLE IF NOT EXISTS career_catalyst(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        department TEXT NOT NULL,
        year TEXT NOT NULL,
        skills TEXT NOT NULL,
        motivation TEXT NOT NULL,
        applied_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

# Create Data Science Innovation Club table
cursor.execute("""
    CREATE TABLE IF NOT EXISTS data_science_innovation(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        department TEXT NOT NULL,
        year TEXT NOT NULL,
        skills TEXT NOT NULL,
        motivation TEXT NOT NULL,
        applied_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

# Create Web Nest Technology Club table
cursor.execute("""
    CREATE TABLE IF NOT EXISTS web_nest_technology(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        department TEXT NOT NULL,
        year TEXT NOT NULL,
        skills TEXT NOT NULL,
        motivation TEXT NOT NULL,
        applied_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

# Create Event Registrations table
cursor.execute("""
    CREATE TABLE IF NOT EXISTS event_registrations(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_name TEXT NOT NULL,
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        year TEXT NOT NULL,
        expectations TEXT NOT NULL,
        registered_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
""")

conn.commit()
print("Database initialized successfully!")
print("Tables created:")
print("  - users")
print("  - career_catalyst")
print("  - data_science_innovation")
print("  - web_nest_technology")
print("  - event_registrations")
conn.close()
