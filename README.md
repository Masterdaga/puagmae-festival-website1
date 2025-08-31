# 🎉 PUAGMAE Festival Website

A modern, responsive website for the PUAGMAE Festival - a vibrant celebration of the African Golden 13th Month.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **User Registration**: Festival registration with email confirmation
- **Newsletter Subscription**: Email newsletter management
- **Admin Panel**: Manage registrations and subscribers
- **Contact Form**: Direct communication with festival team
- **Gallery**: Photo and video showcase
- **Mobile Menu**: Optimized mobile navigation with social media links

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, PostgreSQL
- **Email**: Nodemailer with Gmail
- **Deployment**: Render (Backend) + Vercel/Netlify (Frontend)

## 🏃‍♂️ Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Backend Development

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start backend server
npm start
```

## 📋 Project Structure

```
puagmae-festival-website1/
├── src/
│   └── app/
│       ├── components/     # Reusable components
│       ├── about/         # About page
│       ├── admin/         # Admin panel
│       ├── contact/       # Contact page
│       ├── gallery/       # Photo/video gallery
│       ├── Registration/  # User registration
│       ├── schedule/      # Festival schedule
│       └── testimonials/  # Testimonials page
├── backend/               # Node.js backend
│   ├── config/           # Database and email config
│   ├── routes/           # API routes
│   └── middleware/       # Authentication middleware
├── public/               # Static assets
│   ├── photos/          # Gallery images
│   ├── videos/          # Gallery videos
│   └── testimonials/    # Testimonial images
└── DEPLOYMENT_GUIDE.md  # Complete deployment instructions
```

## 🌐 Deployment

### For Development Team
The code is ready for deployment! See:
- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions
- `DEPLOYMENT_CHECKLIST.md` - Quick deployment checklist

### Key Configuration
- **Frontend**: Set `NEXT_PUBLIC_API_BASE_URL` to your backend URL
- **Backend**: Set `FRONTEND_URL` to your frontend domain for CORS
- **Database**: PostgreSQL on Render
- **Email**: Gmail with App Password

## 🎯 API Endpoints

- `POST /register` - User registration
- `POST /api/newsletter/subscribe` - Newsletter subscription
- `POST /api/newsletter/unsubscribe` - Newsletter unsubscription
- `POST /api/contact` - Contact form
- `GET /admin/registrations` - Admin panel
- `DELETE /admin/registrations/:id` - Delete registration

## 🔧 Environment Variables

### Frontend
```
NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com
```

### Backend
```
DB_USER=postgres
DB_HOST=your-db-host
DB_NAME=puagmae_festival
DB_PASSWORD=your-password
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=https://your-frontend-url.com
```

## 📞 Support

For deployment and technical support, refer to:
- `DEPLOYMENT_GUIDE.md` - Complete setup instructions
- `DEPLOYMENT_CHECKLIST.md` - Quick reference checklist

## 🎨 Design Features

- **Modern UI**: Clean, professional design with yellow/gold theme
- **Mobile-First**: Responsive design optimized for all devices
- **Accessibility**: WCAG compliant with proper contrast and navigation
- **Performance**: Optimized images and fast loading times
- **SEO**: Meta tags and structured data for search engines

## 🔒 Security

- **CORS**: Properly configured for cross-origin requests
- **Input Validation**: Server-side validation for all forms
- **Admin Authentication**: Secure admin panel with bcrypt hashing
- **Email Security**: Gmail App Password authentication

---

**PUAGMAE Festival** - Celebrating the African Golden 13th Month
