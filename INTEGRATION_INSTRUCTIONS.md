# 🔗 Frontend-Backend Integration Instructions

## 📋 What You Need to Deploy

### ✅ Backend Status
- **Backend URL**: https://puagmae-festival-backend.onrender.com
- **Status**: ✅ Working perfectly
- **Database**: ✅ Connected (3 registrations already)
- **Email**: ✅ Configured

### 🎯 Frontend Deployment
The frontend code is ready to deploy on ANY platform.

## 🔧 Required Environment Variable

**Set this ONE environment variable in your deployment platform:**

```
NEXT_PUBLIC_API_BASE_URL=https://puagmae-festival-backend.onrender.com
```

## 🌐 Deployment Platforms

### Vercel
1. Import GitHub repository
2. Add environment variable: `NEXT_PUBLIC_API_BASE_URL=https://puagmae-festival-backend.onrender.com`
3. Deploy

### Netlify
1. Import GitHub repository
2. Add environment variable: `NEXT_PUBLIC_API_BASE_URL=https://puagmae-festival-backend.onrender.com`
3. Deploy

### Any Other Platform
Just add: `NEXT_PUBLIC_API_BASE_URL=https://puagmae-festival-backend.onrender.com`

## 🧪 Testing After Deployment

1. **Test Registration**: Go to `/Registration` page and try registering
2. **Test Newsletter**: Scroll to footer and try subscribing
3. **Test Contact**: Go to `/contact` page and send a message
4. **Test Admin**: Visit https://puagmae-festival-backend.onrender.com/admin/registrations
   - Username: `admin`
   - Password: `puagme2023`

## 📞 What to Send to Your Team

**Send them this message:**

---

**Subject: PUAGMAE Festival Frontend Ready for Deployment**

Hi team,

The frontend is ready for deployment. Here's what you need:

**Backend**: ✅ Already deployed and working at https://puagmae-festival-backend.onrender.com

**Frontend Deployment**:
1. Import the GitHub repository to your chosen platform
2. Set this environment variable: `NEXT_PUBLIC_API_BASE_URL=https://puagmae-festival-backend.onrender.com`
3. Deploy

**Testing**:
- Registration page should connect to backend
- Newsletter subscription should work
- Contact form should send emails
- Admin panel: https://puagmae-festival-backend.onrender.com/admin/registrations (admin/puagme2023)

The code is configured to work with any deployment platform. Just set the environment variable and deploy!

Let me know if you need any help with the deployment.

---

## 🚨 Important Notes

- **CORS**: Backend is configured to accept requests from any frontend domain
- **API Endpoints**: All working and tested
- **Mobile**: All mobile issues have been fixed
- **Images/Videos**: All displaying correctly

## 📁 Files Ready for Deployment

- ✅ `src/app/` - All frontend pages
- ✅ `public/` - All images and videos
- ✅ `package.json` - Dependencies
- ✅ `next.config.js` - Configuration
- ✅ All mobile fixes implemented
- ✅ Social media links working
- ✅ Background scrolling fixed

**The frontend is 100% ready for deployment on any platform!**
