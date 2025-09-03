# PUAGMAE Festival Website

Modern, responsive web app for the PUAGMAE Festival — celebrating the African Golden 13th Month.

## Features

- **Responsive UI**: Desktop, tablet, and mobile
- **Registration**: Festival signup with confirmation page
- **Newsletter**: Double opt‑in subscription, unsubscribe by link or email
- **Admin**: Manage registrations and subscribers
- **Contact**: Email the team via form
- **Gallery**: Photos and videos

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Data**: PostgreSQL (newsletter subscribers)
- **Email**: Nodemailer (Gmail App Password)
-- **CI/CD**: GitHub Actions (quality, security, deploy)
- **Hosting**: Render (Backend), any static host for Frontend

## Quick Start

### Frontend (root)
```bash
npm install
npm run export   # outputs static site to ./out
npm run start    # serves ./out locally at http://localhost:3000
```

### Backend
```bash
cd backend
npm install
npm run dev   # or: npm start
```

## Project Structure
```
puagmae-festival-website1/
├── src/app/                # Next.js app router
│   ├── components/         # Reusable UI
│   ├── about/              # About page
│   ├── admin/              # Admin panel
│   ├── contact/            # Contact page
│   ├── gallery/            # Photos & videos
│   ├── Registration/       # User registration
│   ├── schedule/           # Festival schedule
│   └── testimonials/       # Testimonials
├── backend/                # Express API
│   ├── config/             # db, email, admin config
│   ├── routes/             # newsletter endpoints
│   └── middleware/         # auth
└── public/                 # static assets
```

## API (selected)

- POST `/api/newsletter/subscribe`
- POST `/api/newsletter/unsubscribe`
- GET  `/api/newsletter/confirm/:token`
- GET  `/api/newsletter/unsubscribe/:token`

## Environment Variables

### Frontend
```
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url
```

### Backend (PostgreSQL + Email)
```
PGHOST=your-db-host
PGUSER=postgres
PGPASSWORD=your-password
PGDATABASE=puagmae_festival
PGPORT=5432
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=https://your-frontend-url
```

## Development Notes

- Lint: `npm run lint` (frontend) and `cd backend && npm run lint`
- For deployment, upload the `out/` folder to any static host (Vercel static, Netlify, GitHub Pages, Cloudflare Pages, S3+CloudFront, etc.)
- Set `NEXT_PUBLIC_API_BASE_URL` to point the frontend to the backend

## Security

- CORS configured in backend
- Email double opt‑in and secure unsubscribe tokens
- Admin actions protected server‑side

—

PUAGMAE Festival — Celebrating the African Golden 13th Month
