# 🌌 The Nexus Forum

The official platform for the **Computer Science Engineering and Data Science** department. This is a high-performance hub for technical collaboration, insights, and innovation.

## 🚀 Getting Started

### 1. Prerequisites
*   Python 3.10+
*   PostgreSQL
*   Google Cloud Console account (for SSO)

### 2. Installation
1.  Clone the repository and create a virtual environment:
    ```bash
    python -m venv venv
    venv\Scripts\activate
    pip install -r requirements.txt
    ```

2.  Set up your `.env` file from the credentials you got from Google Cloud:
    ```bash
    AUTH_GOOGLE_ID=your_client_id
    AUTH_GOOGLE_SECRET=your_client_secret
    SECRET_KEY=your_secret_key
    DB_HOST=localhost
    DB_NAME=nexus_forum
    DB_USER=postgres
    DB_PASSWORD=your_db_password
    ```

3.  Initialize the database:
    ```bash
    python bin/setup_postgresql.py
    ```

### 3. Running the App
```bash
python app.py
```
Access the application at `http://127.0.0.1:5000`.

## 📂 Project Structure
*   `app.py`: Main Flask application entry point with Google SSO and PostgreSQL integration.
*   `static/`: All CSS, JavaScript, and internal image assets.
*   `templates/`: Jinja2 HTML templates for all forum pages.
*   `bin/`: Utility scripts for database setup, administration, and themes.
*   `assets/`: Project-specific media files and legacy design screens.
*   `data/`: Legacy SQLite databases (for reference).
*   `frontend/`: Ongoing migration to a Next.js/Auth.js frontend.

---
© 2026 The Nexus Forum. All rights reserved.