from flask import Flask, render_template, request, url_for, redirect, session
import sqlite3
import os
from authlib.integrations.flask_client import OAuth
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'default_secret_key')

oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id=os.getenv('AUTH_GOOGLE_ID', 'placeholder_id'),
    client_secret=os.getenv('AUTH_GOOGLE_SECRET', 'placeholder_secret'),
    access_token_url='https://accounts.google.com/o/oauth2/token',
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
    client_kwargs={
        'scope': 'openid email profile',
        'issuer': 'https://accounts.google.com'
    },
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration'
)

@app.route('/')
def home():
    return render_template('index.html')

@app.context_processor
def inject_user():
    if 'user_email' in session:
        return {'current_user': {'name': session.get('user_name'), 'email': session.get('user_email'), 'role': session.get('user_role', 'user')}}
    return {'current_user': None}

@app.route('/signup', methods=['GET','POST'])
def signup():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']

        try:
            with sqlite3.connect('database.db') as conn:
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()
                cursor.execute('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', (name, email, password))
                conn.commit()
                session['user_email'] = email
                session['user_name'] = name
            return redirect(url_for('home'))
        except sqlite3.Error as e:
            return f"An error occurred: {e}"

    return render_template('sign-in.html')


@app.route('/login', methods=['GET','POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        try:
            with sqlite3.connect('database.db') as conn:
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()
                cursor.execute('SELECT * FROM users WHERE email = ? AND password = ?', (email, password))
                user = cursor.fetchone()
                if user:
                    session['user_email'] = user['email']
                    session['user_name'] = user['name']
                    session['user_role'] = user['role'] if 'role' in user.keys() else 'user'
                    return redirect(url_for('home'))
                else:
                    return "Invalid credentials"
        except sqlite3.Error as e:
            return f"An error occurred: {e}"

    return render_template('login.html')


@app.route('/events')
def events():
    return render_template('events.html')

@app.route('/clubs')
def clubs():
    return render_template('clubs.html')

@app.route('/committee')
def committee():
    return render_template('committee.html')

@app.route('/faculty')
def faculty():
    return render_template('faculty.html')

@app.route('/dsi')
def dsi():
    return render_template('dsi.html')

@app.route('/cc')
def cc():
    return render_template('cc.html')

@app.route('/google-login')
def google_login():
    redirect_uri = url_for('google_callback', _external=True)
    return google.authorize_redirect(redirect_uri)

@app.route('/google-callback')
def google_callback():
    token = google.authorize_access_token()
    user_info = token.get('userinfo')
    if user_info:
        name = user_info['name']
        email = user_info['email']
        
        # Check if user exists, if not create
        try:
            with sqlite3.connect('database.db') as conn:
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()
                cursor.execute('SELECT * FROM users WHERE email = ?', (email,))
                user = cursor.fetchone()
                if not user:
                    cursor.execute("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')", (name, email, 'oauth_user'))
                    conn.commit()
                session['user_email'] = email
                session['user_name'] = name
                session['user_role'] = 'user'
            return redirect(url_for('home'))
        except sqlite3.Error as e:
            return f"An error occurred: {e}"
    return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)