# 🚀 Deployment Platforms Guide

## 📋 Universal Configuration

The project works on **any platform** with this environment variable:
```
NEXT_PUBLIC_API_BASE_URL=https://puagmae-festival-backend.onrender.com
```

## 🌐 Platform-Specific Instructions

### **Vercel (Recommended)**
- Import repository
- Set environment variable
- Deploy (automatic configuration)

### **Netlify**
- Import repository  
- Set environment variable
- Build command: `npm run build`
- Deploy

### **Render**
- Import repository
- Set environment variables:
  - `NEXT_PUBLIC_API_BASE_URL=https://puagmae-festival-backend.onrender.com`
  - `RENDER=true`
- Build command: `npm run build`
- Publish directory: `./out`

### **Any Other Platform**
- Import repository
- Set environment variable
- Deploy

## ✅ What Works Everywhere

- User registration
- Newsletter subscription
- Contact form
- Admin panel
- Mobile menu
- All images/videos
- Social media links

**Same code, any platform!** 🎯
