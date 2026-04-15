# 🛡️ Nexus Forum — Maintainer's Guide

This guide is for the official college department staff who will manage the Nexus Forum website. 

---

## 🚀 Deployment Overview

The website consists of two main parts:
1.  **Modern Frontend (Recommended):** Located in the `frontend/` directory. Built with Next.js 16. This handles most modern features like Google Login, Event Proposals, and the Admin Dashboard.
2.  **Legacy Backend:** The `app.py` file in the root. Built with Flask. It currently handles some join forms and club registrations.

### To start the application locally:
1.  **Frontend:** `cd frontend && npm run dev` (Runs on port 3000)
2.  **Backend:** `python app.py` (Runs on port 5000)

---

## 🔑 Managing Administrators

Administrators are managed via environment variables and the database.

### Adding a New Admin:
1.  Open `frontend/.env.local`.
2.  Find the `ADMIN_EMAILS` line.
3.  Add the new admin's Gmail address (comma-separated):
    ```env
    ADMIN_EMAILS=user1@gmail.com,user2@gmail.com
    ```
4.  When that user logs in via Google, they will automatically be assigned the **Admin** role in the database.

---

## 📅 Updating Content

### 1. Events List
Currently, events on the `Events` page are managed in `frontend/src/app/events/page.tsx`. 
To add an event:
- Edit the file and copy an existing `Event Card` block.
- Update the title, date, and description.

### 2. Event Proposals
- Users can submit proposals via `/event-proposal`.
- Admins can view and **Approve/Reject** these in the **Admin Dashboard** (`/admin`).

---

## 💾 Database Management

The project uses **MySQL** (via Prisma ORM).
- The database connection string is in `frontend/.env.local` → `DATABASE_URL`.
- After changing the database structure in `frontend/prisma/schema.prisma`, always run:
  ```bash
  cd frontend
  npx prisma db push
  ```
- To view or edit the database in a browser-based UI, run:
  ```bash
  cd frontend
  npx prisma studio
  ```

---

## ⚠️ Reliability Checklist

- [ ] **Secrets:** Never share the `.env` or `.env.local` files.
- [ ] **Updates:** Keep Node.js and Python dependencies updated.
- [ ] **Backups:** Ensure the MySQL database is backed up regularly by the college technical team.

---

## 🛠️ Troubleshooting

- **Google Login Fails:** Check if the `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` in `.env.local` are still valid.
- **Emails Not Sending:** Check the `EMAIL_SERVER_PASSWORD` (Gmail App Password) in `.env.local`. 
- **Database Connection Error:** Verify that the MySQL service is running and that `DATABASE_URL` in `frontend/.env.local` is correct.
