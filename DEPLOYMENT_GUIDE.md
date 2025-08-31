# 🚀 PUAGMAE Festival - Deployment Guide

## 📋 Overview
This guide explains how to deploy the PUAGMAE Festival website with backend and frontend integration.

## 🏗️ Architecture
- **Backend**: Node.js + PostgreSQL (Deploy on Render)
- **Frontend**: Next.js (Deploy on Vercel/Netlify/etc.)
- **Database**: PostgreSQL (Render)

## 🔧 Backend Deployment (Render)

### 1. Create Backend Service on Render
1. Go to [render.com](https://render.com)
2. Create new **Web Service**
3. Connect your GitHub repository
4. Set **Root Directory** to `backend`

### 2. Environment Variables (Backend)
Add these environment variables in Render dashboard:

```
# Database Configuration
DB_USER=postgres
DB_HOST=your-postgres-host.onrender.com
DB_NAME=puagmae_festival
DB_PASSWORD=your-postgres-password
DB_PORT=5432

# Email Configuration
EMAIL_USER=puagmaef@gmail.com
EMAIL_PASS=your-gmail-app-password

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-domain.com

# Admin Configuration
ADMIN_USER=admin
ADMIN_PASS=puagme2023

# Contact Configuration
CONTACT_TO=puagmaef@gmail.com,pjafrica.2020@gmail.com
```

### 3. Build & Deploy Settings
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Node Version**: 18 or higher

## 🌐 Frontend Deployment

### Option A: Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set **Root Directory** to `/` (root of project)
4. Add environment variable:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-service-name.onrender.com
   ```

### Option B: Netlify
1. Go to [netlify.com](https://netlify.com)
2. Import your GitHub repository
3. Set **Root Directory** to `/` (root of project)
4. Add environment variable:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-service-name.onrender.com
   ```

### Option C: Other Platforms
Any platform that supports Next.js can be used. Just add the environment variable:
```
NEXT_PUBLIC_API_BASE_URL=https://your-backend-service-name.onrender.com
```

## 🗄️ Database Setup (Render)

### 1. Create PostgreSQL Database
1. In Render dashboard, create new **PostgreSQL** service
2. Note down the connection details
3. Use these details in backend environment variables

### 2. Database Schema
The backend will automatically create the required tables:
- `users` - Festival registrations
- `newsletter_subscribers` - Newsletter subscriptions
- `admin_users` - Admin authentication

## 🔗 Integration Testing

### 1. Backend Health Check
Visit: `https://your-backend-service-name.onrender.com/`
Expected: `{"status":"healthy","server":"PUAGME Festival Backend"}`

### 2. Frontend-Backend Connection
1. Deploy frontend with correct `NEXT_PUBLIC_API_BASE_URL`
2. Go to registration page
3. Try registering a test user
4. Check if it connects to backend

### 3. Admin Panel
Visit: `https://your-backend-service-name.onrender.com/admin/registrations`
- Username: `admin`
- Password: `puagme2023`

## 🚨 Important Notes

### CORS Configuration
- Backend is configured to accept requests from `FRONTEND_URL`
- Make sure this matches your frontend domain exactly

### Environment Variables
- **Frontend**: Only needs `NEXT_PUBLIC_API_BASE_URL`
- **Backend**: Needs all the variables listed above

### Email Configuration
- Requires Gmail account with App Password
- Enable 2-Step Verification on Gmail
- Generate App Password for "Mail"

## 📞 Support
If you encounter issues:
1. Check environment variables are set correctly
2. Verify backend is running and accessible
3. Check CORS configuration matches frontend domain
4. Ensure database is connected and tables are created

## 🎯 Success Criteria
✅ Backend responds to health check  
✅ Frontend can register users  
✅ Newsletter subscription works  
✅ Admin panel is accessible  
✅ Contact form sends emails  
✅ All images and videos display correctly  
✅ Mobile menu works properly  
✅ Social media links work  

## 🔄 Updates
After deployment, any code changes will automatically trigger new deployments if connected to GitHub.
