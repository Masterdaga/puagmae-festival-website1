# 🌐 Universal Deployment Guide

## 📋 Configuration Overview

The project is configured to work on **any deployment platform**:

### **For Render (Static Export)**
- Uses `output: 'export'` for static site generation
- Publishes from `./out` directory
- Set `RENDER=true` environment variable

### **For Other Platforms (Vercel, Netlify, etc.)**
- Uses standard Next.js server-side rendering
- No static export needed
- Better performance and features

## 🚀 Deployment Instructions

### **Render Deployment**
1. Import repository to Render
2. Set environment variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://puagmae-festival-backend.onrender.com
   RENDER=true
   ```
3. Build command: `npm run build`
4. Publish directory: `./out`

### **Vercel Deployment (Recommended)**
1. Import repository to Vercel
2. Set environment variable:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://puagmae-festival-backend.onrender.com
   ```
3. Deploy (no additional configuration needed)

### **Netlify Deployment**
1. Import repository to Netlify
2. Set environment variable:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://puagmae-festival-backend.onrender.com
   ```
3. Build command: `npm run build`
4. Publish directory: `.next` (or let Netlify auto-detect)

### **Any Other Platform**
1. Import repository
2. Set environment variable:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://puagmae-festival-backend.onrender.com
   ```
3. Deploy

## 🎯 Key Points

- **One Environment Variable**: Only need `NEXT_PUBLIC_API_BASE_URL`
- **Universal Code**: Same code works on all platforms
- **Automatic Configuration**: Platform-specific settings are handled automatically
- **Backend Integration**: Works with https://puagmae-festival-backend.onrender.com

## 📞 Backend Status

- **URL**: https://puagmae-festival-backend.onrender.com
- **Status**: ✅ Working
- **Database**: ✅ Connected
- **Email**: ✅ Configured

## 🧪 Testing

After deployment, test:
- ✅ User registration
- ✅ Newsletter subscription
- ✅ Contact form
- ✅ Admin panel access
- ✅ Mobile menu functionality
- ✅ All images and videos

**The configuration is universal and works on any platform!** 🚀
