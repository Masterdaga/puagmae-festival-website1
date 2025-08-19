require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const os = require('os');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const basicAuth = require('express-basic-auth');

// Database Connection with error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
})
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
  registeredAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

const User = mongoose.model('User', userSchema);

// Admin credentials (store securely in production)
const adminUsers = {
  [process.env.ADMIN_USER || 'admin']: process.env.ADMIN_PASS || 'puagme2023'
};

// Express setup
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
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
    rejectUnauthorized: false // For local testing only
  }
});

// PDF generation function
async function generatePDF(user) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const tempPath = path.join(os.tmpdir(), `puagme-confirmation-${Date.now()}.pdf`);
    const stream = fs.createWriteStream(tempPath);
    
    doc.pipe(stream);

// Add logo at the very top center
const logoPath = path.join(__dirname, 'public', 'logo.png');
if (fs.existsSync(logoPath)) {
  const pageWidth = doc.page.width;
  doc.image(logoPath, (pageWidth - 100) / 2, 40, { width: 100 });
  doc.moveDown(4); // add spacing after logo
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
  .text(`Name: ${name}`)
  .text(`Email: ${email}`)
  .text(`Phone: ${phone}`)
  .moveDown(2);

doc
  .fontSize(14)
  .text(
    `Dear ${name},\n\nThank you for registering for the PUAGME Festival. We're excited to welcome you to this inspiring event that celebrates unity, culture, and empowerment.`
  )
  .moveDown(1)
  .text(`The festival kicks off on September 6 and will span 5 unforgettable days. Below is your full event schedule.`)
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
  .text(
    `Please keep this confirmation for your records. We look forward to celebrating with you at the PUAGME Festival.`,
    { align: 'left' }
  )
  .moveDown(2)
  .fontSize(12)
  .fillColor('#888')
  .text('— PUAGME Festival Team', { align: 'right', italic: true });

doc.end();

    
    stream.on('finish', () => resolve(tempPath));
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

// Enhanced registration endpoint
app.post('/register', async (req, res) => {
  try {
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

    // Create user in database
    const newUser = await User.create({ name, email, phone });

    // Generate and send confirmation
    const pdfPath = await generatePDF(newUser);
    await transporter.sendMail({
      from: `"PUAGME Festival" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Registration Confirmation',
      html: `
        <h1>Welcome to PUAGME Festival!</h1>
        <p>Dear ${name},</p>
        <p>Thank you for registering. Your details:</p>
        <ul>
          <li>Email: ${email}</li>
          <li>Phone: ${phone}</li>
        </ul>
        <p>See attachment for official confirmation.</p>
      `,
      attachments: [{
        filename: 'PUAGME_Confirmation.pdf',
        path: pdfPath
      }]
    });

    // Cleanup temp file
    fs.unlink(pdfPath, (err) => {
      if (err) console.error('Error deleting temp PDF:', err);
    });

    res.status(201).json({
      success: true,
      message: 'Registration complete! Check your email.',
      userId: newUser._id
    });

  } catch (error) {
    console.error('Registration Error:', error);
    
    if (error.code === 11000) {
      return res.status(409).json({
        error: 'DuplicateError',
        message: 'Email already registered'
      });
    }
    
    res.status(500).json({
      error: 'InternalError',
      message: 'Registration failed. Please try again.'
    });
  }
});

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'healthy',
    server: 'PUAGME Festival Backend',
    version: '1.0.0',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Disabled'}`);
  console.log(`🌐 CORS allowed: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`🔐 Admin panel: http://localhost:${PORT}/admin/registrations`);
  console.log(`🛡️  Admin username: ${Object.keys(adminUsers)[0]}`);
});