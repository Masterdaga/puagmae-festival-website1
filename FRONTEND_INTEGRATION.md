# 🔗 Frontend-Backend Integration Guide

## 📋 Current Status
- ✅ Backend deployed on Render
- ✅ Database deployed on Render  
- 🔄 Frontend needs to connect to backend API

## 🎯 Integration Steps

### Step 1: Get Backend URL
Your backend URL from Render should be:
```
https://your-backend-service-name.onrender.com
```

### Step 2: Configure Frontend Environment
Set this environment variable in your frontend deployment platform:

```
NEXT_PUBLIC_API_BASE_URL=https://your-backend-service-name.onrender.com
```

### Step 3: Test Backend API
Test these endpoints to ensure backend is working:

1. **Health Check**:
   ```
   GET https://your-backend-url.onrender.com/
   ```
   Expected: `{"status":"healthy","server":"PUAGME Festival Backend"}`

2. **Admin Panel**:
   ```
   GET https://your-backend-url.onrender.com/admin/registrations
   ```
   Login: `admin` / `puagme2023`

## 🌐 Frontend Deployment Options

### Option A: Vercel (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Add environment variable:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-service-name.onrender.com
   ```
4. Deploy

### Option B: Netlify
1. Go to [netlify.com](https://netlify.com)
2. Import your GitHub repository
3. Add environment variable:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-service-name.onrender.com
   ```
4. Deploy

### Option C: Any Other Platform
Just add the environment variable:
```
NEXT_PUBLIC_API_BASE_URL=https://your-backend-service-name.onrender.com
```

## 🧪 Testing Integration

After deployment, test these features:

1. **User Registration**: `/Registration` page
2. **Newsletter Subscription**: Footer newsletter signup
3. **Contact Form**: `/contact` page
4. **Admin Panel**: Access via backend URL

## 🚨 Important Notes

### CORS Configuration
Make sure your backend has the correct CORS settings. In your Render backend environment variables, set:
```
FRONTEND_URL=https://your-frontend-domain.com
```

### API Endpoints Used
The frontend connects to these backend endpoints:
- `POST /register` - User registration
- `POST /api/newsletter/subscribe` - Newsletter subscription
- `POST /api/newsletter/unsubscribe` - Newsletter unsubscription
- `POST /api/contact` - Contact form
- `GET /admin/registrations` - Admin panel

## 📞 Need Help?
Share your backend URL and I'll help you configure the exact integration!
