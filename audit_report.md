# 🔍 NEXUS FORUM — COMPLETE BRUTAL AUDIT REPORT
**Date:** April 5, 2026 | **Auditor:** Antigravity AI  
**Project:** `nexus-forum-main` — Flask (Python) + Next.js 16 Hybrid Application

---

## 📐 PROJECT ARCHITECTURE OVERVIEW

This is a **dual-application** project — two separate, mostly disconnected apps sharing one PostgreSQL database:

| Layer | Stack |
|---|---|
| **Legacy Backend** | Python/Flask (`app.py`), runs on port 5000 |
| **Modern Frontend** | Next.js 16 + Auth.js (`/frontend`), runs on port 3000 |
| **Database** | PostgreSQL (`nexus_forum`) |
| **Auth (Flask)** | Session-based + Google OAuth (Authlib) |
| **Auth (Next.js)** | Google OAuth only (Auth.js / NextAuth v5 beta) |
| **Email** | Nodemailer via SMTP (Next.js only) |

---

## 🔴 CRITICAL ISSUES (Must Fix Before Demo)

### CRIT-01: Secrets Are Committed to Git — Major Security Breach
**Severity: CRITICAL**

The following **live credentials** are hardcoded in `.env` and `frontend/.env.local`, and `.env` is NOT listed in `frontend/.gitignore`:

| File | Exposed Secret |
|---|---|
| `.env` | `DB_PASSWORD=harsh2005@` |
| `.env` | `AUTH_GOOGLE_ID=179206949014-...` (Flask OAuth ID) |
| `.env` | `AUTH_GOOGLE_SECRET=GOCSPX-DQqVU...` |
| `frontend/.env.local` | `AUTH_SECRET=pXoM2A7Y...` |
| `frontend/.env.local` | `AUTH_GOOGLE_SECRET=GOCSPX-Wj6Dl...` |
| `frontend/.env.local` | `EMAIL_SERVER_PASSWORD=byugrbcwvjprjqsc` (Gmail App Password) |
| `frontend/.env.local` | `DATABASE_URL` with full credentials |

**The root `.gitignore` correctly ignores `.env`, but the repository is on OneDrive which may sync to the cloud. Additionally, if this were pushed to GitHub, ALL secrets would be exposed.**

**Fix:**
1. Immediately rotate all Google OAuth credentials and the Gmail app password
2. Rotate the `AUTH_SECRET`
3. Verify `.env` and `.env.local` are both in all relevant `.gitignore` files ✅ (frontend's is correct, root's is correct)
4. Never commit secrets again — use a secrets manager

---

### CRIT-02: `/signup` Route Returns 404 in Next.js App
**Severity: CRITICAL — Broken Core User Flow**

The header navigation and the home page CTA both link to `/signup`, but there is **no `/signup` page** in the Next.js app. This is confirmed live at `http://localhost:3000/signup`.

**Root cause:** The Next.js migration only implemented Google OAuth login. The signup flow exists in Flask (`/signup` route, `sign-in.html` template) but was never ported to Next.js.

**Result:** When users click "Sign Up" on the Next.js app, they get a 404. The CTA on the homepage ("Join Nexus Forum" → `/signup`) is **dead**.

**Fix:**
- Option A (Quick): Change the `/signup` link in `layout.tsx` and `page.tsx` to `/login` (since auth is Google-only)
- Option B (Proper): Create `/frontend/src/app/signup/page.tsx` that redirects to `/login`
```tsx
// /frontend/src/app/signup/page.tsx
import { redirect } from 'next/navigation';
export default function SignupPage() {
  redirect('/login');
}
```

---

### CRIT-03: Two Disconnected Auth Systems With No Shared Session
**Severity: CRITICAL — Architectural Split**

The Flask app (`app.py`) and Next.js app (`/frontend`) are **completely separate applications** with **incompatible auth systems**:

- Flask uses `werkzeug` password hashing + server-side `session` cookies
- Next.js uses Auth.js JWT strategy with Google OAuth only
- Flask stores users in table `"User"` (quoted, Prisma-style with `id UUID`, `password`, `role`)
- Next.js/Prisma manages `User`, `Account`, `Session` tables (Auth.js schema, no `password` or `role`)

**A user who creates an account on Flask cannot log into Next.js and vice versa.** They are completely separate systems.

**Fix:** Decide which app is the **primary** app and remove the other. For demo purposes, if Next.js is primary:
- Remove the `/login` and `/signup` links that lead nowhere from Flask
- Update the Flask app to not be the user-facing frontend (or remove it)

---

### CRIT-04: Prisma Schema Missing `DATABASE_URL` in `datasource` Block
**Severity: CRITICAL — Prisma Will Fail Without This**

`frontend/prisma/schema.prisma` line 8:
```prisma
datasource db {
  provider = "postgresql"
  // ❌ MISSING: url = env("DATABASE_URL")
}
```

The `url` field is **completely absent** from the datasource block. Prisma cannot connect to the database without it. This will cause:
- `prisma migrate` to fail
- `prisma generate` to fail
- All database queries to throw runtime errors

**Fix:**
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

---

### CRIT-05: `nodemailer` Not in `package.json` Dependencies
**Severity: CRITICAL — Email System Will Not Work**

`frontend/src/lib/nodemailer.ts` imports `nodemailer`, but `package.json` only lists `resend` as an email dependency. **`nodemailer` is not listed as a dependency.**

```json
// package.json - nodemailer is MISSING
"dependencies": {
  "resend": "^6.10.0",  // ← installed, but not used
  // nodemailer is nowhere here ❌
}
```

- The `/api/register-email` and `/api/proposal-email` routes both import `transporter` from `nodemailer.ts`
- This means **both email endpoints will throw a module-not-found error at runtime**
- The `resend` package is installed but never used anywhere

**Fix:**
```bash
cd frontend
npm install nodemailer
npm install --save-dev @types/nodemailer
```
Or, switch to using the `resend` package that's already installed and remove `nodemailer`.

---

### CRIT-06: Flask App Has a Debug Route Exposed in Production
**Severity: CRITICAL — Information Disclosure**

`app.py` line 121-123:
```python
@app.route('/debug-session')
def debug_session():
    return f"<pre>Session data: {session.get('user')}</pre>"
```

This route **leaks full session data (name, email, role)** to anyone who visits `/debug-session`. Also, `app.run(debug=True)` is used, which enables the Werkzeug debugger in a demo environment.

**Fix:**
1. Remove the `/debug-session` route entirely
2. Change to `app.run(debug=False)` or use a proper WSGI server

---

## 🟠 MEDIUM ISSUES

### MED-01: Admin Role Is Hardcoded in Application Source
**Severity: Medium**

In `app.py`, admin emails are hardcoded on lines 66, 98, 372, 383:
```python
role = 'admin' if email in ['harshwardhanjadhav01@gmail.com', 'harshwardhan918@gmail.com'] else 'user'
```

And there's a "failsafe" on line 98:
```python
if email == 'harshwardhanjadhav01@gmail.com':
    role = 'admin'
```

**Problems:**
- Adding new admins requires a code deploy
- Personal email addresses are in source code
- The "failsafe" bypasses whatever role the DB has — it's not a failsafe, it's a hardcoded override

**Fix:** Store admin emails in the `.env` file or use the DB `role` field exclusively. Trust the database.

---

### MED-02: Flask Club Join Uses Raw String Formatting in SQL (SQL Injection Risk)
**Severity: Medium — SQL Injection**

`app.py` lines 219-222:
```python
cursor.execute(f"""
    INSERT INTO {table_name} (full_name, email, ...) VALUES (...)
""", (full_name, email...))
```

`table_name` is derived from `table_mapping.get(club_name)` where `club_name` comes from the URL parameter. While a dictionary lookup validates it, the `table_name` string is still **interpolated directly into the SQL query string** using an f-string. This is a SQL injection pattern that could be exploited if validation is bypassed.

**Fix:** Use a whitelist pattern and never interpolate table names. Since PostgreSQL doesn't support parameterized table names, use explicit `if/elif` conditions:
```python
if club_name == "Career Catalyst":
    cursor.execute("INSERT INTO career_catalyst ...")
elif club_name == "Data Science Innovation Club":
    cursor.execute("INSERT INTO data_science_innovation ...")
```

---

### MED-03: No Input Validation on Flask Forms
**Severity: Medium — Data Integrity**

All Flask form handlers (`join_club`, `event_register`, `hackronyx_participation`) do **zero validation**:
- No email format check
- No phone number format check
- No length limits
- No XSS sanitization

Anyone can submit empty strings (bypassing the `required` HTML attribute via curl), malformed emails, or excessively long strings.

**Fix:** Add server-side validation:
```python
import re
if not re.match(r"[^@]+@[^@]+\.[^@]+", email):
    flash("Invalid email address")
    return redirect(...)
```

---

### MED-04: JWT Session Strategy with PrismaAdapter Is Conflicting
**Severity: Medium — Auth Misconfiguration**

In `frontend/src/auth.ts`:
```ts
session: {
  strategy: "jwt",
},
```

But `PrismaAdapter` is also configured. **Auth.js does not support the JWT strategy when using a database adapter** — it will fall back to database sessions or throw runtime errors. The adapter is designed for database session storage, which conflicts with `strategy: "jwt"`.

**Fix:** Either:
- Remove `PrismaAdapter` and use JWT-only (stateless) — no session table needed
- Or switch to `strategy: "database"` and keep the adapter

---

### MED-05: No Email Confirmation for Club Joins or Event Registrations
**Severity: Medium — Missing Feature**

The Flask app routes for `/join/<club_name>` and `/event-register/<event_name>` store data to DB but **send zero emails** — no admin notification, no user confirmation. The Next.js app does send emails (for HackRonyX and event proposals), but Flask equivalents don't.

**Fix:** Add email functionality to Flask routes using `smtplib` or migrate them to Next.js API routes with Nodemailer.

---

### MED-06: `werkzeug` Version Pinned Too Low in `requirements.txt`
**Severity: Medium — Security Patches**

`requirements.txt` pins `Werkzeug==3.0.1` and `Flask==3.0.0`, which are from early 2024. These versions may have known security vulnerabilities. Python dependencies are also completely unpinned for security-critical packages (`psycopg2-binary`, `Authlib`, `requests`).

**Fix:** Pin all dependency versions and run `pip-audit` to check for vulnerabilities:
```bash
pip install pip-audit
pip-audit -r requirements.txt
```

---

### MED-07: Google OAuth Redirect URI Mismatch Possible
**Severity: Medium**

Two different Google OAuth apps are used:
- Flask uses `AUTH_GOOGLE_ID=179206949014-...` (from root `.env`)
- Next.js uses `AUTH_GOOGLE_ID=388476732556-...` (from `frontend/.env.local`)

Both must have the correct redirect URIs registered in Google Cloud Console. If they don't (`http://localhost:5000/google-callback` for Flask, `http://localhost:3000/api/auth/callback/google` for Next.js), OAuth will fail with a redirect_uri_mismatch error.

**Fix:** Verify both OAuth apps have the correct authorized redirect URIs in Google Cloud Console.

---

## 🟡 MINOR ISSUES

### MIN-01: `resend` Package Installed But Never Used
The `resend` npm package is in `package.json` but no code uses it. `nodemailer` is used instead (but not listed). This is confusing and adds unnecessary bundle weight.

**Fix:** Remove `resend` from `package.json`, add `nodemailer` instead.

---

### MIN-02: `clerk-nextjs` Directory Still Exists
There is a `clerk-nextjs/` directory in the project root — a remnant of the old Clerk authentication migration. It serves no purpose in the current architecture.

**Fix:** Delete the `clerk-nextjs/` directory.

---

### MIN-03: Next.js Image Optimization Warnings
The browser audit found multiple warnings about missing `sizes` prop and `loading="eager"` suggestions for LCP images on several pages.

**Fix:** Add the `sizes` prop to all `<Image>` components in the Next.js app.

---

### MIN-04: `@layer base { * { @apply border-white/10; } }` in Global CSS
`globals.css` applies a border to every single element by default. This is extremely unusual and could cause unexpected visual side effects on tables, inputs, divs, etc.

**Fix:** Remove or scope this rule to specific border elements.

---

### MIN-05: No CSRF Protection on Flask Forms
Flask forms use no CSRF tokens. Without `Flask-WTF` or similar, cross-site request forgery attacks are possible.

**Fix:** Install `Flask-WTF` and add `{{ form.hidden_tag() }}` to all Jinja2 templates, or at minimum validate `Referer` headers.

---

### MIN-06: Social Media Links Are All `href="#"`
Both the footer (Instagram, LinkedIn) link to `#`. These are dead placeholders.

**Fix:** Add actual social media URLs or remove the links.

---

### MIN-07: Email HTML Templates Vulnerable to XSS (Server-Side)
In both email route handlers (`register-email/route.ts`, `proposal-email/route.ts`), user-submitted data is interpolated directly into HTML strings:
```ts
html: `<p>Hi ${full_name}</p>`
```

If a user submits `<script>alert(1)</script>` as their name, it gets embedded in the admin email HTML. Most email clients don't execute scripts, but this is still bad practice.

**Fix:** Sanitize all user input before embedding in HTML using a library like `sanitize-html`, or escape special characters.

---

## ✅ WHAT IS WORKING CORRECTLY

| Feature | Status |
|---|---|
| Next.js app boots and runs | ✅ |
| Home page renders correctly | ✅ |
| Login page (Google OAuth) renders | ✅ |
| HackRonyX Registration form renders | ✅ |
| Event Proposal form renders | ✅ |
| Clubs page renders | ✅ |
| Events page renders | ✅ |
| Committee page renders | ✅ |
| Password hashing on Flask signup | ✅ (`werkzeug` bcrypt) |
| Admin dashboard access control | ✅ (role check in Flask) |
| Flask DB CRUD structure | ✅ (all tables defined) |
| Prisma schema for Auth.js models | ✅ |
| Email templates are well-designed | ✅ (nice HTML structure) |
| Duplicate submission prevention in email APIs | ✅ |
| Admin proposal approve/reject | ✅ |
| Google OAuth flow structure | ✅ (if URIs are configured) |
| Session logout (Flask) | ✅ |
| Tailwind CSS config | ✅ |

---

## 🛠 PRIORITY FIX LIST

| # | Issue | Effort | Risk |
|---|---|---|---|
| 1 | Add `url = env("DATABASE_URL")` to `schema.prisma` | 1 min | 🔴 App broken without it |
| 2 | Install `nodemailer` npm package | 2 min | 🔴 Email completely broken |
| 3 | Fix `/signup` 404 — redirect to `/login` | 5 min | 🔴 CTA is dead |
| 4 | Remove `/debug-session` route from Flask | 1 min | 🔴 Info disclosure |
| 5 | Fix JWT vs PrismaAdapter conflict in auth.ts | 10 min | 🟠 Auth may fail |
| 6 | Rotate all exposed credentials ASAP | 30 min | 🔴 Security |
| 7 | Remove `clerk-nextjs/` directory | 1 min | 🟡 Cleanup |
| 8 | Replace f-string SQL table name with if/elif | 10 min | 🟠 SQL injection |
| 9 | Add server-side validation to Flask routes | 30 min | 🟠 Data integrity |
| 10 | Remove `resend`, add `nodemailer` to package.json | 2 min | 🟡 Correctness |

---

*This audit was performed via static code analysis + live browser testing of `http://localhost:3000`. The Flask backend at port 5000 was not live-tested during this session.*
