from flask import Flask, render_template, request, url_for, redirect, session, flash
import psycopg2
from psycopg2.extras import RealDictCursor
import os
import uuid
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
from authlib.integrations.flask_client import OAuth

load_dotenv()

# Load admin emails from env — comma-separated list
ADMIN_EMAILS = [e.strip() for e in os.getenv('ADMIN_EMAILS', '').split(',') if e.strip()]

import re
EMAIL_RE = re.compile(r'^[^\s@]+@[^\s@]+\.[^\s@]+$')

def validate_form(fields: dict) -> str | None:
    """Returns an error message string if validation fails, else None."""
    for name, value in fields.items():
        if not value or not str(value).strip():
            return f"'{name.replace('_', ' ').title()}' is required."
    return None

app = Flask(__name__, 
    template_folder='templates',
    static_folder='static',
    static_url_path='/static')
app.secret_key = os.getenv('SECRET_KEY', 'nexus_secret_key_123')

oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id=os.getenv('AUTH_GOOGLE_ID'),
    client_secret=os.getenv('AUTH_GOOGLE_SECRET'),
    server_metadata_url='https://accounts.google.com/.well-known/openid-configuration',
    client_kwargs={
        'scope': 'openid email profile',
    }
)

def get_db_connection():
    conn = psycopg2.connect(
        host=os.getenv('DB_HOST', 'localhost'),
        database=os.getenv('DB_NAME', 'nexus_forum'),
        user=os.getenv('DB_USER', 'postgres'),
        password=os.getenv('DB_PASSWORD'),
        port=os.getenv('DB_PORT', '5432'),
        cursor_factory=RealDictCursor
    )
    return conn

@app.route('/')
def home():
    return render_template('index.html', current_user=session.get('user'))

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['password']
        hashed_password = generate_password_hash(password)
        
        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                # Check if email already exists
                cursor.execute('SELECT * FROM "User" WHERE email = %s', (email,))
                if cursor.fetchone():
                    flash('Email already exists! Please use a different email.')
                    return redirect(url_for('signup'))
                
                # Determine role - assign admin if it's a known admin email
                role = 'admin' if email in ADMIN_EMAILS else 'user'
                cursor.execute('INSERT INTO "User"(id, name, email, password, role, "updatedAt") VALUES(%s,%s,%s,%s,%s, NOW())', 
                             (str(uuid.uuid4()), name, email, hashed_password, role))
                conn.commit()
                
                session['user'] = {'name': name, 'email': email, 'role': role}
                flash(f'Thank you for signing up, {name}! Welcome to NEXUS FORUM 🎉')
                if role == 'admin':
                    return redirect(url_for('admin_dashboard'))
                return redirect(url_for('home'))

        except Exception as e:
            flash(f"An error occurred: {str(e)}")
            return redirect(url_for('signup'))

    return render_template('sign-in.html', current_user=session.get('user'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute('SELECT * FROM "User" WHERE email = %s', (email,))
                user = cursor.fetchone()

                if user and check_password_hash(user['password'], password):
                    role = user['role']
                    # Failsafe: force admin role for known admin emails
                    if email in ADMIN_EMAILS:
                        role = 'admin'
                    session['user'] = {'name': user['name'], 'email': user['email'], 'role': role}
                    print(f"DEBUG LOGIN: email={email}, db_role={user['role']}, session_role={role}")
                    # Standardized redirection
                    if role == 'admin':
                        return redirect(url_for('admin_dashboard'))
                    return redirect(url_for('home'))
                else:
                    flash('Invalid email or password')
                    return redirect(url_for('login'))

        except Exception as e:
            flash(f"An error occurred: {str(e)}")
            return redirect(url_for('login'))

    return render_template('login.html', current_user=session.get('user'))

@app.route('/logout')
def logout():
    session.pop('user', None)
    return redirect(url_for('home'))

# /debug-session route removed — it exposed session data publicly

@app.route('/clubs')
def clubs():
    return render_template('clubs.html', current_user=session.get('user'))

@app.route('/events')
def events():
    return render_template('events.html', current_user=session.get('user'))

@app.route('/committee')
def committee():
    return render_template('committee.html', current_user=session.get('user'))

@app.route('/faculty')
def faculty():
    return render_template('faculty.html', current_user=session.get('user'))

@app.route('/dsi')
def dsi():
    return render_template('dsi.html', current_user=session.get('user'))

@app.route('/cc')
def cc():
    return render_template('cc.html', current_user=session.get('user'))

@app.route('/webnest')
def webnest():
    return render_template('webnest.html', current_user=session.get('user'))

# Admin Dashboard
@app.route('/admin')
def admin_dashboard():
    if not session.get('user') or session.get('user').get('role') != 'admin':
        flash('Access denied. Admins only.')
        return redirect(url_for('home'))
    
    with get_db_connection() as conn:
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM "User"')
        users = cursor.fetchall()
        
        cursor.execute("SELECT * FROM web_nest_technology ORDER BY applied_on DESC")
        web_nest = cursor.fetchall()
        
        cursor.execute("SELECT * FROM data_science_innovation ORDER BY applied_on DESC")
        dsi = cursor.fetchall()
        
        cursor.execute("SELECT * FROM career_catalyst ORDER BY applied_on DESC")
        cc = cursor.fetchall()
        
        cursor.execute("SELECT * FROM event_registrations ORDER BY registered_on DESC")
        event_regs = cursor.fetchall()

        cursor.execute("SELECT * FROM event_proposals ORDER BY submitted_on DESC")
        proposals = cursor.fetchall()

        cursor.execute("SELECT * FROM hackronyx_willingness ORDER BY submitted_at DESC")
        hackronyx_entries = cursor.fetchall()

    return render_template('admin.html',
                         users=users,
                         web_nest=web_nest,
                         dsi=dsi,
                         cc=cc,
                         event_regs=event_regs,
                         proposals=proposals,
                         hackronyx_entries=hackronyx_entries,
                         current_user=session.get('user'))

@app.route('/join/<club_name>', methods=['GET', 'POST'])
def join_club(club_name):
    if request.method == 'POST':
        full_name  = request.form.get('full_name', '').strip()
        email      = request.form.get('email', '').strip().lower()
        phone      = request.form.get('phone', '').strip()
        department = request.form.get('department', '').strip()
        year       = request.form.get('year', '').strip()
        skills     = request.form.get('skills', '').strip()
        motivation = request.form.get('motivation', '').strip()

        err = validate_form({'full name': full_name, 'email': email, 'phone': phone,
                             'department': department, 'year': year, 'skills': skills, 'motivation': motivation})
        if err:
            flash(err)
            return redirect(url_for('join_club', club_name=club_name))
        if not EMAIL_RE.match(email):
            flash('Please enter a valid email address.')
            return redirect(url_for('join_club', club_name=club_name))

        # Use explicit safe queries per table — never interpolate table names into SQL
        VALID_CLUBS = {
            'Career Catalyst': 'career_catalyst',
            'Data Science Innovation Club': 'data_science_innovation',
            'Web Nest Technology Club': 'web_nest_technology'
        }
        if club_name not in VALID_CLUBS:
            flash('Invalid club name!')
            return redirect(url_for('clubs'))

        params = (full_name, email, phone, department, year, skills, motivation)
        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                if club_name == 'Career Catalyst':
                    cursor.execute("""
                        INSERT INTO career_catalyst (full_name, email, phone, department, year, skills, motivation)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                    """, params)
                elif club_name == 'Data Science Innovation Club':
                    cursor.execute("""
                        INSERT INTO data_science_innovation (full_name, email, phone, department, year, skills, motivation)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                    """, params)
                elif club_name == 'Web Nest Technology Club':
                    cursor.execute("""
                        INSERT INTO web_nest_technology (full_name, email, phone, department, year, skills, motivation)
                        VALUES (%s, %s, %s, %s, %s, %s, %s)
                    """, params)
                conn.commit()
                flash(f'Thank you for joining {club_name}! We will contact you soon.')
                return redirect(url_for('home'))
        except Exception as e:
            flash(f"An error occurred: {str(e)}")
            return redirect(url_for('join_club', club_name=club_name))

    return render_template('join-form.html', club_name=club_name, current_user=session.get('user'))

@app.route('/event-register/<event_name>', methods=['GET', 'POST'])
def event_register(event_name):
    if request.method == 'POST':
        full_name    = request.form.get('full_name', '').strip()
        email        = request.form.get('email', '').strip().lower()
        phone        = request.form.get('phone', '').strip()
        year         = request.form.get('year', '').strip()
        expectations = request.form.get('expectations', '').strip()

        err = validate_form({'full name': full_name, 'email': email, 'phone': phone,
                             'year': year, 'expectations': expectations})
        if err:
            flash(err)
            return redirect(url_for('event_register', event_name=event_name))
        if not EMAIL_RE.match(email):
            flash('Please enter a valid email address.')
            return redirect(url_for('event_register', event_name=event_name))

        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT INTO event_registrations (event_name, full_name, email, phone, year, expectations)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (event_name, full_name, email, phone, year, expectations))
                conn.commit()
                flash(f'Thank you for registering for {event_name}! We look forward to seeing you there.')
                return redirect(url_for('home'))
        except Exception as e:
            flash(f"An error occurred: {str(e)}")
            return redirect(url_for('event_register', event_name=event_name))

    return render_template('event-register.html', event_name=event_name, current_user=session.get('user'))

@app.route('/submit-event-proposal', methods=['GET', 'POST'])
def submit_event_proposal():
    if request.method == 'POST':
        organizer_name     = request.form['organizer_name']
        organizer_email    = request.form['organizer_email']
        event_title        = request.form['event_title']
        event_type         = request.form['event_type']
        proposed_date      = request.form['proposed_date']
        expected_attendees = request.form['expected_attendees']
        venue_needed       = request.form['venue_needed']
        description        = request.form['description']
        club_team          = request.form.get('club_team', '')

        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT INTO event_proposals
                        (organizer_name, organizer_email, event_title, event_type,
                         proposed_date, expected_attendees, venue_needed, description, club_team, status)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, 'pending')
                """, (organizer_name, organizer_email, event_title, event_type,
                      proposed_date, expected_attendees, venue_needed, description, club_team))
                conn.commit()
            flash(f'Your proposal for "{event_title}" was submitted successfully! The team will review and contact you within 3–5 working days.')
            return redirect(url_for('events'))
        except Exception as e:
            flash(f'An error occurred: {str(e)}')
            return redirect(url_for('submit_event_proposal'))

    return render_template('event-proposal.html', current_user=session.get('user'))


@app.route('/hackronyx-participation', methods=['GET', 'POST'])
def hackronyx_participation():
    if request.method == 'POST':
        full_name  = request.form.get('full_name', '').strip()
        email      = request.form.get('email', '').strip().lower()
        department = request.form.get('department', '').strip()
        mobile_no  = request.form.get('mobile_no', '').strip()

        err = validate_form({'full name': full_name, 'email': email,
                             'department': department, 'mobile number': mobile_no})
        if err:
            flash(err)
            return redirect(url_for('hackronyx_participation'))
        if not EMAIL_RE.match(email):
            flash('Please enter a valid email address.')
            return redirect(url_for('hackronyx_participation'))
        
        try:
            with get_db_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("""
                    INSERT INTO hackronyx_willingness (full_name, department, mobile_no, email)
                    VALUES (%s, %s, %s, %s)
                """, (full_name, department, mobile_no, email))
                conn.commit()
                flash(f'Thank you, {full_name}! Your response for HackRonyX participation has been recorded.')
                return redirect(url_for('home'))
        except Exception as e:
            flash(f"An error occurred: {str(e)}")
            return redirect(url_for('hackronyx_participation'))

    return render_template('hackronyx-willingness.html', current_user=session.get('user'))


@app.route('/admin/proposal/<int:proposal_id>/approve', methods=['POST'])
def approve_proposal(proposal_id):
    if not session.get('user') or session.get('user').get('role') != 'admin':
        flash('Access denied.')
        return redirect(url_for('home'))
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE event_proposals SET status = 'approved' WHERE id = %s", (proposal_id,))
            conn.commit()
        flash('Proposal approved.')
    except Exception as e:
        flash(f'Error: {str(e)}')
    return redirect(url_for('admin_dashboard'))


@app.route('/admin/proposal/<int:proposal_id>/reject', methods=['POST'])
def reject_proposal(proposal_id):
    if not session.get('user') or session.get('user').get('role') != 'admin':
        flash('Access denied.')
        return redirect(url_for('home'))
    try:
        with get_db_connection() as conn:
            cursor = conn.cursor()
            cursor.execute("UPDATE event_proposals SET status = 'rejected' WHERE id = %s", (proposal_id,))
            conn.commit()
        flash('Proposal rejected.')
    except Exception as e:
        flash(f'Error: {str(e)}')
    return redirect(url_for('admin_dashboard'))


@app.route('/google-login')
def google_login():
    redirect_uri = url_for('google_callback', _external=True)
    return google.authorize_redirect(redirect_uri)

@app.route('/google-callback')
def google_callback():
    try:
        token = google.authorize_access_token()
        user_info = token.get('userinfo')
        if not user_info:
            flash('Failed to fetch user information from Google')
            return redirect(url_for('login'))
        
        name = user_info['name']
        email = user_info['email']
        
        with get_db_connection() as conn:
            cursor = conn.cursor()
            # Check if user exists
            cursor.execute('SELECT * FROM "User" WHERE email = %s', (email,))
            user = cursor.fetchone()
            
            if not user:
                # Create user with correct role for admin emails
                role = 'admin' if email in ['harshwardhanjadhav01@gmail.com', 'harshwardhan918@gmail.com'] else 'user'
                cursor.execute('INSERT INTO "User"(id, name, email, password, role, "updatedAt") VALUES(%s,%s,%s,%s,%s, NOW())', 
                             (str(uuid.uuid4()), name, email, 'oauth_user_no_pass', role))
                conn.commit()
                # Re-fetch to get current user data
                cursor.execute('SELECT * FROM "User" WHERE email = %s', (email,))
                user = cursor.fetchone()
            
            # Setup session in sync with nex.py style
            # Role enforcement for admin emails
            role = user['role']
            if email in ADMIN_EMAILS:
                role = 'admin'

            session['user'] = {'name': user['name'], 'email': user['email'], 'role': role}
            flash(f'Successfully logged in with Google! Welcome back, {name} 🎉')
            
            if role == 'admin':
                return redirect(url_for('admin_dashboard'))
            return redirect(url_for('home'))

    except Exception as e:
        flash(f"An error occurred during Google SSO: {str(e)}")
        return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=False)  # Never expose debug in a demo/production environment