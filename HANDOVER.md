# 📑 Nexus Forum — Handover Documentation

**Project:** The Nexus Forum  
**Department:** Computer Science Engineering & Data Science, UPES  
**Handover Date:** April 2026  
**Developed by:** Team DS — Lead: Harshwardhan | Contributors: Umang, Aarush

---

## 🏗️ Architecture

Nexus Forum is a **Hybrid Stack** application:

| Layer | Technology | Role |
|-------|-----------|------|
| **Frontend** | Next.js 15 (App Router) | Main website, all user-facing pages, admin dashboard |
| **Auth** | Auth.js v5 | Google OAuth + Email/Password login |
| **Database** | MySQL 8 via Prisma ORM | All registrations, users, proposals, analytics |
| **Email** | Nodemailer (Gmail SMTP) | Confirmation & admin notification emails |
| **Legacy Backend** | Python 3 + Flask | Older club join forms (being phased out) |

> **The Next.js frontend is the primary application.** The Flask backend is legacy and handles a small subset of forms. Future maintainers should continue migrating Flask routes into Next.js API routes.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js 18+
- Python 3.10+
- MySQL 8 running locally (database name: `nexus_forum`)

### Step 1 — Clone the repository
```bash
git clone https://github.com/Harshwardhan05j/Nexus-Forum.git
cd Nexus-Forum
```

### Step 2 — Configure environment variables

**Create `frontend/.env.local`:**
```env
DATABASE_URL=mysql://root:yourpassword@127.0.0.1:3306/nexus_forum
AUTH_SECRET=<run: npx auth secret>
AUTH_GOOGLE_ID=your-google-oauth-client-id
AUTH_GOOGLE_SECRET=your-google-oauth-client-secret
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=465
EMAIL_SERVER_USER=your@gmail.com
EMAIL_SERVER_PASSWORD=your-gmail-app-password
EMAIL_FROM=your@gmail.com
ADMIN_EMAIL=your@gmail.com
ADMIN_EMAILS=your@gmail.com
```

**Create root `.env`:**
```env
SECRET_KEY=any-random-secret-string
DATABASE_URL=mysql+pymysql://root:yourpassword@127.0.0.1:3306/nexus_forum
```

### Step 3 — Set up the database
```bash
cd frontend
npx prisma db push    # Creates all tables in MySQL
```

### Step 4 — Install & run

```bash
# Terminal 1: Next.js frontend
cd frontend
npm install
npm run dev           # Runs at http://localhost:3000

# Terminal 2: Flask backend (legacy)
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py         # Runs at http://localhost:5000
```

---

## 🔑 Admin Access

Admin privileges are granted via the `ADMIN_EMAILS` environment variable — **no code changes needed**.

### To add a new admin:
1. Open `frontend/.env.local`
2. Add their Gmail to `ADMIN_EMAILS` (comma-separated):
   ```env
   ADMIN_EMAILS=person1@gmail.com,person2@gmail.com
   ```
3. Restart the Next.js server. When that person signs in with Google, the Admin link appears in their navbar.

### Admin dashboard (`/admin`) capabilities:
- 👥 View all registered users
- 🏛️ View all club applications per club — with CSV export
- 📅 View all event registrations — with CSV export
- 📋 View, Approve, or Reject event proposals — with CSV export
- 🔥 View HackRonyX registration interest — with CSV export

---

## 📂 File Structure Reference

```
nexus-forum/
├── frontend/                      ← ⭐ Main application
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx            Home page
│   │   │   ├── layout.tsx          Global layout: Navbar, Footer
│   │   │   ├── admin/              Admin dashboard (auth-protected)
│   │   │   ├── events/             Events page
│   │   │   ├── clubs/              Clubs page
│   │   │   ├── committee/          Committee info
│   │   │   ├── committee-application/  Application closed placeholder
│   │   │   ├── archive/            Photo gallery from past events
│   │   │   ├── hackronyx-registration/ HackRonyX willingness form
│   │   │   ├── event-proposal/     Event proposal form
│   │   │   ├── event-register/     Event registration form
│   │   │   ├── join/[club]/        Club application form
│   │   │   ├── login/              Login page
│   │   │   ├── signup/             Signup page
│   │   │   ├── terms/              Terms of Service & Copyright
│   │   │   ├── privacy/            Privacy Policy
│   │   │   ├── robots.ts           SEO robots.txt (auto-generated)
│   │   │   └── sitemap.ts          SEO sitemap.xml (auto-generated)
│   │   ├── components/
│   │   │   ├── Footer.tsx          Shared site footer
│   │   │   └── MobileMenu.tsx      Mobile navigation
│   │   ├── lib/
│   │   │   ├── prisma.ts           Database client (singleton)
│   │   │   ├── nodemailer.ts       Email sender config
│   │   │   └── rateLimit.ts        Rate limiting for form APIs
│   │   └── auth.ts                 Auth.js configuration
│   ├── prisma/
│   │   └── schema.prisma           MySQL database schema
│   └── .env.local                  🔒 Secret keys — NEVER commit to Git
│
├── app.py                          Flask legacy backend
├── templates/                      Flask HTML templates
├── static/                         Flask assets (CSS/JS)
├── requirements.txt                Python dependencies
├── .env                            🔒 Flask secrets — NEVER commit to Git
│
└── docs/
    └── MAINTAINER_GUIDE.md         Day-to-day guide for department staff
```

---

## 🗄️ Database Reference

The database is **MySQL**, managed through **Prisma ORM**. Key tables:

| Table | Description |
|-------|-------------|
| `User` | All registered users (Google + email/password) |
| `Account`, `Session` | Auth.js session management |
| `hackronyx_willingness` | HackRonyX event interest registrations |
| `event_registrations` | Registrations for specific events |
| `event_proposals` | User-submitted event proposals |
| `career_catalyst` | Career Catalyst club applications |
| `data_science_innovation` | Data Science Club applications |
| `web_nest_technology` | Web Nest Technology Club applications |
| `site_stats` | Simple visitor counter |

### Useful Prisma commands (run from `frontend/` directory):
```bash
npx prisma studio        # Visual DB editor in browser
npx prisma db push       # Apply schema changes (no migrations)
npx prisma generate      # Regenerate Prisma client after schema changes
```

---

## 📧 Email System

Emails are sent via **Nodemailer** using Gmail SMTP on port 465 (SSL).

Triggered automatically on:
- New HackRonyX registration → Email to the registrant + admin notification
- New club application → Email to the applicant + admin notification
- New event registration → Email to the registrant + admin notification
- New event proposal → Email to the proposer + admin notification

**To change the sender email:** Update `EMAIL_SERVER_USER`, `EMAIL_SERVER_PASSWORD`, and `EMAIL_FROM` in `frontend/.env.local`. You must generate a Gmail App Password (not your regular Gmail password).

---

## 🛡️ Security Notes

- `.env` and `.env.local` are in `.gitignore` — secrets are never pushed to GitHub
- Passwords are hashed with **bcrypt** — never stored in plain text
- All form APIs have **IP-based rate limiting** to prevent spam
- Email content is sanitized to prevent **XSS injection** in HTML emails
- Admin access is **email-allowlist based** — no hardcoded credentials

---

## 🔮 Future Roadmap

- [ ] **Migrate Flask routes** into Next.js API endpoints
- [ ] **Dynamic events system** — CMS-driven instead of hardcoded in `page.tsx`
- [ ] **Real-time notifications** for club announcements
- [ ] **Set production domain** in `NEXT_PUBLIC_BASE_URL` and update Google OAuth authorized origins

---

© 2026 Computer Science & Data Science Department, UPES.  
Developed by **Team DS** — Lead Developer: Harshwardhan | Contributors: Umang, Aarush.
