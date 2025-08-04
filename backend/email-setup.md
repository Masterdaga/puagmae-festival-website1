# Email Setup Guide for PUAGMAE Festival Backend

## 🔧 Email Configuration

### Step 1: Gmail Setup
1. Go to your Gmail account settings
2. Enable "2-Step Verification"
3. Generate an "App Password":
   - Go to Security → App passwords
   - Select "Mail" and your device
   - Copy the generated password

### Step 2: Update Backend Configuration
In `backend/index.js`, update these lines:

```javascript
// SENDER email (needs app password)
user: 'dagim8100@gmail.com',
pass: 'your-app-password' // App password for dagim8100@gmail.com

// RECEIVER email (for testing)
to: 'masterdaga1995@gmail.com',
```

### Step 3: Environment Variables (Optional)
Create a `.env` file in the backend folder:

```
EMAIL_USER=dagim8100@gmail.com
EMAIL_PASS=your-app-password
FESTIVAL_EMAIL=masterdaga1995@gmail.com
```

Then update the backend code to use:
```javascript
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS,
to: process.env.FESTIVAL_EMAIL,
```

## 🚀 Testing

1. Start the backend: `cd backend && npm run dev`
2. Start the frontend: `npm run dev`
3. Go to contact page
4. Click "Test Backend" button
5. Fill out and submit the contact form

## ✅ Success Indicators
- Backend test shows "✅ Backend is running!"
- Contact form shows success toast
- Email received in your festival email inbox 