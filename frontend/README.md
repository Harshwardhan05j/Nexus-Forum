# 🌐 Nexus Forum — Frontend (Next.js)

This is the primary user-facing application for **The Nexus Forum**, the official tech platform of the Computer Science & Data Science Department at UPES.

Built with **Next.js 15**, **Auth.js v5**, **Prisma ORM**, and **MySQL**.

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- MySQL 8+ running locally
- A Google Cloud project with OAuth credentials

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `frontend/.env.local` file with the following keys:

```env
# Database
DATABASE_URL=mysql://root:yourpassword@127.0.0.1:3306/nexus_forum

# Auth.js
AUTH_SECRET=<generate with: npx auth secret>
AUTH_GOOGLE_ID=<your Google OAuth Client ID>
AUTH_GOOGLE_SECRET=<your Google OAuth Client Secret>

# Email (Nodemailer / Gmail SMTP)
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=465
EMAIL_SERVER_USER=your@gmail.com
EMAIL_SERVER_PASSWORD=<Gmail App Password>
EMAIL_FROM=your@gmail.com
ADMIN_EMAIL=your@gmail.com

# Admin access — comma-separated Gmail addresses
ADMIN_EMAILS=admin1@gmail.com,admin2@gmail.com

# Production base URL (update before deploying)
# NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### 3. Set Up the Database
```bash
# Push Prisma schema to your MySQL database
npx prisma db push

# (Optional) Open the visual database editor
npx prisma studio
```

### 4. Run the Dev Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
frontend/
├── prisma/
│   └── schema.prisma         # All database models (MySQL)
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home page
│   │   ├── layout.tsx         # Root layout (Navbar, Footer)
│   │   ├── admin/             # Admin dashboard (protected)
│   │   ├── events/            # Events listing page
│   │   ├── clubs/             # Clubs listing page
│   │   ├── committee/         # Committee info page
│   │   ├── committee-application/  # Application info page
│   │   ├── archive/           # Photo archive / gallery
│   │   ├── hackronyx-registration/ # HackRonyX interest form
│   │   ├── event-proposal/    # Event proposal form
│   │   ├── event-register/    # Event registration form
│   │   ├── join/[club]/       # Club join form
│   │   ├── login/             # Login page (Google + credentials)
│   │   ├── signup/            # Sign up page
│   │   ├── terms/             # Terms of Service & Copyright
│   │   ├── privacy/           # Privacy Policy
│   │   ├── robots.ts          # SEO: robots.txt
│   │   └── sitemap.ts         # SEO: sitemap.xml
│   ├── components/
│   │   ├── Footer.tsx         # Shared footer
│   │   ├── MobileMenu.tsx     # Mobile navigation menu
│   │   └── CustomCursor.tsx   # Custom cursor effect
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── nodemailer.ts      # Email transporter setup
│   │   ├── rateLimit.ts       # IP-based rate limiter
│   │   └── helpers.ts         # Shared utility functions
│   └── auth.ts                # Auth.js configuration
└── next.config.ts             # Next.js config
```

---

## 🔑 Admin Access

Admin access is controlled entirely via the `ADMIN_EMAILS` environment variable — no code changes needed.

1. Add the email to `ADMIN_EMAILS` in `frontend/.env.local`
2. The user signs in via **Google**
3. They will automatically see the **Admin** link in the navbar and have access to `/admin`

**Admin Dashboard features:**
- View all registered users
- View all club applications (with CSV export)
- View all event registrations (with CSV export)
- View and Approve / Reject event proposals
- View HackRonyX interest registrations (with CSV export)

---

## 🛠️ Common Maintenance Tasks

### Adding a New Club
Edit `frontend/src/app/clubs/page.tsx` and add a new club card with the correct `slug` that matches the `/join/[club]` route.

### Adding a New Event
Edit `frontend/src/app/events/page.tsx` and add a new event card. Registration forms are handled by the `/api/event-register` route.

### Changing the Schema
1. Edit `frontend/prisma/schema.prisma`
2. Run `npx prisma db push` from inside the `frontend/` directory
3. Restart the dev server

---

## 📦 Build for Production

```bash
npm run build
npm start
```

> ⚠️ Set `NEXT_PUBLIC_BASE_URL` in your environment before building for production so `sitemap.xml` and `robots.txt` use the correct domain.
