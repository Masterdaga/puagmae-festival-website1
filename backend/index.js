require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const os = require('os');
const mongoose = require('mongoose');
const validator = require('validator');
const basicAuth = require('express-basic-auth');

// Database Connection with error handling
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
  console.error('❌ MongoDB connection error:', err.message);
  process.exit(1);
});

// Enhanced User Schema with validation
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        return /^[+]?[\d\s\-()]{10,20}$/.test(v);
      },
      message: 'Please provide a valid phone number'
    }
  },
  emailSent: {
    type: Boolean,
    default: false
  },
  emailError: {
    type: String,
    default: null
  },
  registeredAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);

// Admin credentials
const adminUsers = {
  [process.env.ADMIN_USER || 'admin']: process.env.ADMIN_PASS || 'puagme2023'
};

// Express setup
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - Enhanced CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  pool: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify email configuration
transporter.verify((error) => {
  if (error) {
    console.warn('⚠️ Email service not fully configured:', error.message);
  } else {
    console.log('✅ Email service ready');
  }
});

// PDF generation function
async function generatePDF(user) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, `confirmation-${Date.now()}.pdf`);
    const stream = fs.createWriteStream(filePath);
    
    doc.pipe(stream);

    // Add logo if exists
    const logoPath = path.join(__dirname, 'public', 'logo.png');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, { fit: [100, 100], align: 'center' }).moveDown(1);
    }

    doc
      .fontSize(24)
      .fillColor('#1F4E79')
      .text('PUAGME Festival Registration Confirmation', { align: 'center', underline: true })
      .moveDown(2);

    doc
      .fontSize(16)
      .fillColor('#000')
      .text('Registrant Details', { underline: true })
      .moveDown(0.5)
      .fontSize(14)
      .text(`Name: ${user.name}`)
      .text(`Email: ${user.email}`)
      .text(`Phone: ${user.phone}`)
      .moveDown(2);

    const schedule = [
      { date: 'September 6', event: 'Peace and Love Day' },
      { date: 'September 7', event: 'Pan-Africanism Day' },
      { date: 'September 8', event: 'The Great Run on the Rain Day' },
      { date: 'September 9', event: 'Trade Day' },
      { date: 'September 10', event: 'Beauty Pageant & Live Concert' },
    ];

    doc.fontSize(16).fillColor('#000').text('Festival Schedule', { underline: true }).moveDown(1);

    schedule.forEach(({ date, event }) => {
      doc.fontSize(13).text(`${date}: ${event}`, { indent: 20 });
    });

    doc.moveDown(2);
    doc
      .fontSize(14)
      .fillColor('#333')
      .text(`Please keep this confirmation for your records. We look forward to celebrating with you at the PUAGME Festival.`)
      .moveDown(2)
      .fontSize(12)
      .fillColor('#888')
      .text('— PUAGME Festival Team', { align: 'right', italic: true });

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
}

// 🔒 Admin Routes
app.use('/admin', basicAuth({
  users: adminUsers,
  challenge: true,
  unauthorizedResponse: 'Unauthorized access'
}));

app.get('/admin/registrations', async (req, res) => {
  try {
    const users = await User.find().sort({ registeredAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// ✅ Enhanced registration endpoint - SUCCEEDS EVEN IF EMAIL FAILS
app.post('/register', async (req, res) => {
  try {
    console.log('📨 Received registration attempt:', req.body);
    
    const { name, email, phone } = req.body;
    
    // Validation
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        error: 'ValidationError',
        message: 'All fields are required'
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'Invalid email format'
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ 
      $or: [{ email: email.toLowerCase() }, { phone: phone.trim() }] 
    });
    
    if (existingUser) {
      return res.status(409).json({
        error: 'DuplicateError',
        message: 'Email or phone number already registered'
      });
    }

    // Create user in database FIRST (registration always succeeds)
    const newUser = await User.create({ 
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      phone: phone.trim(),
      emailSent: false
    });

    console.log('✅ User registered successfully:', newUser.email);

    // Send immediate response - registration is successful
    res.status(201).json({
      success: true,
      message: 'Registration complete!',
      userId: newUser._id,
      emailSent: false // Will be updated async
    });

    // ✅ Handle email in BACKGROUND (non-blocking)
    sendConfirmationEmail(newUser).catch(emailError => {
      console.warn('⚠️ Email sending failed (non-critical):', emailError.message);
    });

  } catch (error) {
    console.error('❌ Registration Error:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'DuplicateError',
        message: 'Email or phone number already registered'
      });
    }
    
    res.status(500).json({
      error: 'InternalError',
      message: 'Registration failed. Please try again.'
    });
  }
});

// ✅ Async function to send confirmation email (non-blocking)
async function sendConfirmationEmail(user) {
  try {
    const pdfPath = await generatePDF(user);
    
    await transporter.sendMail({
      from: `"PUAGME Festival" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Your PUAGME Festival Registration Confirmation',
      html: `
        <h1>Welcome to PUAGME Festival!</h1>
        <p>Dear ${user.name},</p>
        <p>Thank you for registering for the PUAGME Festival. We're excited to have you join us!</p>
        <p><strong>Your registration details:</strong></p>
        <ul>
          <li><strong>Name:</strong> ${user.name}</li>
          <li><strong>Email:</strong> ${user.email}</li>
          <li><strong>Phone:</strong> ${user.phone}</li>
        </ul>
        <p>Please find your official confirmation attached to this email.</p>
        <p>We look forward to celebrating with you!</p>
        <br>
        <p><em>— The PUAGME Festival Team</em></p>
      `,
      attachments: [{
        filename: 'PUAGME_Confirmation.pdf',
        path: pdfPath
      }]
    });

    // Update user record to indicate email was sent
    await User.findByIdAndUpdate(user._id, { 
      emailSent: true,
      emailError: null 
    });

    console.log('✅ Confirmation email sent to:', user.email);

    // Cleanup temp file
    fs.unlink(pdfPath, (err) => {
      if (err) console.warn('⚠️ Could not delete temp PDF:', err.message);
    });

  } catch (emailError) {
    console.error('❌ Email sending failed for:', user.email, emailError.message);
    
    // Update user record with error (but registration still succeeded)
    await User.findByIdAndUpdate(user._id, { 
      emailSent: false,
      emailError: emailError.message 
    });
  }
}

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    server: 'PUAGME Festival Backend',
    version: '1.0.0',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    email: process.env.EMAIL_USER ? 'configured' : 'not configured'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
  console.log(`🌐 CORS allowed: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`🔐 Admin panel: http://localhost:${PORT}/admin/registrations`);
  console.log(`🛡️  Admin username: ${Object.keys(adminUsers)[0]}`);
  console.log(`💡 Registration will succeed even if email fails`);
});