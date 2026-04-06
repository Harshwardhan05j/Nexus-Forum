"""
Run this script ONCE to create the event_proposals table in your PostgreSQL database.
Usage: python setup_event_proposals.py
"""

import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

conn = psycopg2.connect(
    host=os.getenv('DB_HOST', 'localhost'),
    database=os.getenv('DB_NAME', 'nexus_forum'),
    user=os.getenv('DB_USER', 'postgres'),
    password=os.getenv('DB_PASSWORD'),
    port=os.getenv('DB_PORT', '5432')
)

cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE IF NOT EXISTS event_proposals (
        id                SERIAL PRIMARY KEY,
        organizer_name    VARCHAR(120) NOT NULL,
        organizer_email   VARCHAR(120) NOT NULL,
        event_title       VARCHAR(200) NOT NULL,
        event_type        VARCHAR(80)  NOT NULL,
        proposed_date     DATE,
        expected_attendees INTEGER,
        venue_needed      VARCHAR(100),
        description       TEXT,
        club_team         VARCHAR(150),
        status            VARCHAR(20)  NOT NULL DEFAULT 'pending',
        submitted_on      TIMESTAMP    NOT NULL DEFAULT NOW()
    );
""")

conn.commit()
cursor.close()
conn.close()

print("event_proposals table created successfully.")
