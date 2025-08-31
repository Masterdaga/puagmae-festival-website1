# ✅ Deployment Checklist

## 🔧 Backend Setup (Render)
- [ ] Create PostgreSQL database on Render
- [ ] Create Web Service for backend
- [ ] Set Root Directory to `backend`
- [ ] Add environment variables:
  - [ ] `DB_USER`, `DB_HOST`, `DB_NAME`, `DB_PASSWORD`, `DB_PORT`
  - [ ] `EMAIL_USER`, `EMAIL_PASS`
  - [ ] `FRONTEND_URL`
  - [ ] `ADMIN_USER`, `ADMIN_PASS`
  - [ ] `CONTACT_TO`
- [ ] Deploy backend
- [ ] Test backend health: `https://your-backend.onrender.com/`

## 🌐 Frontend Setup
- [ ] Choose deployment platform (Vercel/Netlify/etc.)
- [ ] Connect GitHub repository
- [ ] Set Root Directory to `/` (root of project)
- [ ] Add environment variable:
  - [ ] `NEXT_PUBLIC_API_BASE_URL=https://your-backend.onrender.com`
- [ ] Deploy frontend
- [ ] Test frontend-backend connection

## 🧪 Testing
- [ ] Backend health check works
- [ ] User registration works
- [ ] Newsletter subscription works
- [ ] Admin panel accessible
- [ ] Contact form works
- [ ] All images display correctly
- [ ] Mobile menu works
- [ ] Social media links work

## 📞 Contact Information
- **Backend URL**: `https://your-backend.onrender.com`
- **Frontend URL**: `https://your-frontend-domain.com`
- **Admin Panel**: `https://your-backend.onrender.com/admin/registrations`
- **Admin Login**: `admin` / `puagme2023`

## 🚨 Common Issues
- [ ] CORS errors → Check `FRONTEND_URL` matches frontend domain
- [ ] 404 errors → Check backend URL is correct
- [ ] Database errors → Check PostgreSQL connection
- [ ] Email errors → Check Gmail app password
