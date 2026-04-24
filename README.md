# 🌌 The Nexus Forum

The official tech platform for the **Computer Science Engineering & Data Science Department at UPES**.  
A hub for technical collaboration, events, clubs, and innovation — built by Team DS.

---

## 🏗️ Architecture Overview

This project is built on a modern **Next.js** full-stack architecture.

| Layer | Technology | Port | Purpose |
|-------|-----------|------|---------|
| **Frontend/Backend** | Next.js 15 + Auth.js | `3000` | Main website, auth, admin dashboard, all api routes and forms |
| **Database** | MySQL 8 (via Prisma ORM) | `3306` | Single source of truth for all data |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+**
- **Python 3.10+**
- **MySQL 8+** running locally

### 1. Clone & Install
```bash
# Frontend
cd frontend
npm install



### 2. Configure Environment Variables

**`frontend/.env.local`** (Next.js — the main app):
```env
DATABASE_URL=mysql://root:yourpassword@127.0.0.1:3306/nexus_forum
AUTH_SECRET=<run: npx auth secret>
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=465
EMAIL_SERVER_USER=your@gmail.com
EMAIL_SERVER_PASSWORD=your-gmail-app-password
EMAIL_FROM=your@gmail.com
ADMIN_EMAIL=your@gmail.com
ADMIN_EMAILS=admin@gmail.com
```

> ⚠️ **Never commit `.env` or `.env.local` to Git.** They are already in `.gitignore`.

### 3. Set Up the Database
```bash
cd frontend
npx prisma db push   # Creates all tables in MySQL
```

### 4. Run the Application

```bash
cd frontend
npm run dev          # http://localhost:3000
```

### 5. Production Deployment (Windows/IIS)

To deploy to Windows Server (IIS / iisnode), use the deployment package builder:
```powershell
# 1. Build the standalone Next.js app
cd frontend
npm run build

# 2. Generate the DEPLOY package
cd ..
.\prepare-deploy.ps1
```
Upload the contents of the `DEPLOY` folder to your server's root directory using an FTP client like FileZilla.

---

## 📂 Project Structure

```
nexus-forum/
├── frontend/              ← Main Next.js application (start here)
│   ├── src/app/           ← All website pages (App Router)
│   ├── src/components/    ← Shared components (Footer, MobileMenu)
│   ├── src/lib/           ← Prisma client, email, rate limiter
│   ├── prisma/schema.prisma ← Database schema (MySQL)
│   ├── .env.local         ← 🔒 Secret keys (NOT in Git)
│   └── README.md          ← Detailed frontend documentation

│
├── docs/
│   └── MAINTAINER_GUIDE.md ← Guide for department staff
└── HANDOVER.md            ← Full handover documentation
```

---

## 📖 Documentation

| File | Purpose |
|------|---------|
| [`frontend/README.md`](./frontend/README.md) | Full frontend setup, structure & maintenance guide |
| [`HANDOVER.md`](./HANDOVER.md) | Complete project handover with architecture details |
| [`docs/MAINTAINER_GUIDE.md`](./docs/MAINTAINER_GUIDE.md) | Day-to-day guide for the department staff |

---

© 2026 Computer Science & Data Science Department, UPES.  
Developed by **Team DS** — Lead Developer: Harshwardhan | Contributors: Umang, Aarush.