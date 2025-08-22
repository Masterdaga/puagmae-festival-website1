require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const newsletterRouter = require('./routes/newsletter');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const os = require('os');
const sqlite3 = require('sqlite3').verbose();
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { adminAuth, readAdminStore, ADMIN_STORE } = require('./middleware/auth');

// SQLite Database Setup
const dbPath = path.join(__dirname, 'registrations.db');
const db = new sqlite3.Database(dbPath);
// Newsletter DB (for admin subscribers view)
const newsletterDb = new sqlite3.Database(path.join(__dirname, 'newsletter.db'));

// Create users table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT NOT NULL,
      emailSent INTEGER DEFAULT 0,
      emailError TEXT DEFAULT NULL,
      registeredAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  db.run('CREATE INDEX IF NOT EXISTS idx_email ON users (email)');
  db.run('CREATE INDEX IF NOT EXISTS idx_phone ON users (phone)');
});

// Ensure admin store exists with a default account if missing
if (!fs.existsSync(ADMIN_STORE)) {
  const defaultUser = process.env.ADMIN_USER || 'admin';
  const defaultPass = process.env.ADMIN_PASS || 'puagme2023';
  const passwordHash = bcrypt.hashSync(defaultPass, 10);
  fs.mkdirSync(require('path').dirname(ADMIN_STORE), { recursive: true });
  fs.writeFileSync(ADMIN_STORE, JSON.stringify({ username: defaultUser, passwordHash }, null, 2));
}

// Express setup
const PORT = process.env.PORT || 5000;
const app = express();

// Middleware - Enhanced CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Handle preflight requests
app.options('*', cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// Mount newsletter routes
app.use('/api/newsletter', newsletterRouter);

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
app.use('/admin', adminAuth);

app.get('/admin/registrations', (req, res) => {
  db.all('SELECT * FROM users ORDER BY registeredAt DESC', (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch registrations' });
    }
    res.json(rows);
  });
});

// List newsletter subscribers (all statuses) - admin only
app.get('/admin/newsletter/subscribers', (req, res) => {
  newsletterDb.all(
    'SELECT email, status, isActive, subscribedAt, source, createdAt, updatedAt FROM newsletter_subscribers ORDER BY COALESCE(subscribedAt, createdAt) DESC',
    (err, rows) => {
      if (err) {
        console.error('Newsletter DB error:', err);
        return res.status(500).json({ success: false, message: 'Failed to fetch subscribers' });
      }
      res.json({ success: true, count: rows.length, subscribers: rows });
    }
  );
});

// Delete a registration (admin only)
app.delete('/admin/registrations/:id', (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ success: false, message: 'Missing registration id' });

  // Look up user first
  db.get('SELECT * FROM users WHERE id = ?', [id], (findErr, user) => {
    if (findErr) {
      console.error('Database error:', findErr);
      return res.status(500).json({ success: false, message: 'Failed to fetch registration' });
    }
    if (!user) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    // Delete
    db.run('DELETE FROM users WHERE id = ?', [id], function (delErr) {
      if (delErr) {
        console.error('Database error:', delErr);
        return res.status(500).json({ success: false, message: 'Failed to delete registration' });
      }

      // Try to send an email notification (non-blocking)
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS && user.email) {
        transporter.sendMail({
          from: `PUAGMAE Festival <${process.env.EMAIL_USER}>`,
          to: user.email,
          subject: 'Your PUAGMAE Festival Registration Has Been Cancelled',
          html: `
            <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto">
              <div style="background:#fbbf24;padding:16px 20px;color:#111827;font-weight:700">Registration Update</div>
              <div style="padding:20px;background:#f9fafb;color:#111827">
                <p>Dear ${user.name || 'Participant'},</p>
                <p>Your PUAGMAE Festival registration has been cancelled as requested. If this was a mistake, you can register again on our website.</p>
                <p style="margin-top:16px">We hope to see you at the festival in the future.</p>
                <p style="margin-top:24px">— PUAGMAE Festival Team</p>
              </div>
            </div>
          `
        }).catch(err => console.warn('Unregister email failed:', err.message));
      }

      return res.json({ success: true });
    });
  });
});

// 🔧 Admin settings - update username/password
app.post('/admin/settings', adminAuth, async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    fs.writeFileSync(ADMIN_STORE, JSON.stringify({ username, passwordHash }, null, 2));
    res.json({ success: true });
  } catch (e) {
    console.error('Admin settings update error:', e);
    res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
});

// 📫 Contact endpoint - send message to festival team without opening email client
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message, category } = req.body || {};

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'Name, email, subject and message are required.'
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        error: 'ValidationError',
        message: 'Invalid email address.'
      });
    }

    // Ensure email service configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(503).json({
        success: false,
        error: 'EmailNotConfigured',
        message: 'Email service is not configured on the server.'
      });
    }

    // Compose email to admins
    // Recipient for contact messages (configurable via .env)
    // If CONTACT_TO is provided, supports comma-separated list. Otherwise, send to company emails only.
    const adminTo = process.env.CONTACT_TO
      ? process.env.CONTACT_TO.split(',').map(e => e.trim()).filter(Boolean)
      : ['puagmaef@gmail.com', 'pjafrica.2020@gmail.com'];

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
        <div style="background:#fbbf24;padding:16px 20px;color:#111827;font-weight:700">PUAGMAE Festival – New Contact Message</div>
        <div style="padding:20px;background:#f9fafb">
          <p style="margin:0 0 10px 0;color:#111827"><strong>From:</strong> ${name} &lt;${email}&gt;</p>
          <p style="margin:0 0 10px 0;color:#111827"><strong>Category:</strong> ${category || 'General Inquiry'}</p>
          <p style="margin:0 0 10px 0;color:#111827"><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top:16px;padding:12px;background:#fff;border:1px solid #e5e7eb;border-radius:8px;white-space:pre-wrap;color:#111827">${message}</div>
        </div>
        <div style="font-size:12px;color:#6b7280;text-align:center;padding:16px;background:#111827">© ${new Date().getFullYear()} PUAGMAE Festival</div>
      </div>`;

    const mailOptions = {
      from: `PUAGMAE Festival <${process.env.EMAIL_USER}>`,
      to: adminTo,
      replyTo: email,
      subject: `[Contact] ${category ? `[${category}] ` : ''}${subject}`,
      html
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Message sent successfully.' });
  } catch (err) {
    console.error('Contact email error:', err);
    return res.status(500).json({ 
      success: false, 
      error: 'InternalError', 
      message: 'Failed to send message.',
      // Expose minimal debug info in development to help diagnose
      debug: process.env.NODE_ENV !== 'production' ? err.message : undefined
    });
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
    db.get(
      'SELECT * FROM users WHERE email = ? OR phone = ?',
      [email.toLowerCase(), phone.trim()],
      (err, existingUser) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({
            error: 'InternalError',
            message: 'Registration failed. Please try again.'
          });
        }

        if (existingUser) {
          return res.status(409).json({
            error: 'DuplicateError',
            message: 'Email or phone number already registered'
          });
        }

        // Create user in database
        db.run(
          'INSERT INTO users (name, email, phone, emailSent) VALUES (?, ?, ?, ?)',
          [name.trim(), email.toLowerCase().trim(), phone.trim(), 0],
          function (err) {
            if (err) {
              console.error('Database error:', err);
              return res.status(500).json({
                error: 'InternalError',
                message: 'Registration failed. Please try again.'
              });
            }

            const newUser = {
              id: this.lastID,
              name: name.trim(),
              email: email.toLowerCase().trim(),
              phone: phone.trim(),
              emailSent: false
            };

            console.log('✅ User registered successfully:', newUser.email);

            // Send immediate response - registration is successful
            res.status(201).json({
              success: true,
              message: 'Registration complete!',
              userId: newUser.id,
              emailSent: false // Will be updated async
            });

            // ✅ Handle email in BACKGROUND (non-blocking)
            sendConfirmationEmail(newUser).catch(emailError => {
              console.warn('⚠️ Email sending failed (non-critical):', emailError.message);
            });
          }
        );
      }
    );

  } catch (error) {
    console.error('❌ Registration Error:', error);
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
    db.run(
      'UPDATE users SET emailSent = 1, emailError = NULL, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [user.id]
    );

    console.log('✅ Confirmation email sent to:', user.email);

    // Cleanup temp file
    fs.unlink(pdfPath, (err) => {
      if (err) console.warn('⚠️ Could not delete temp PDF:', err.message);
    });

  } catch (emailError) {
    console.error('❌ Email sending failed for:', user.email, emailError.message);
    
    // Update user record with error (but registration still succeeded)
    db.run(
      'UPDATE users SET emailSent = 0, emailError = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?',
      [emailError.message, user.id]
    );
  }
}

// Health check endpoint
app.get('/', (req, res) => {
  db.get('SELECT COUNT(*) as count FROM users', (err, row) => {
    if (err) {
      return res.json({
        status: 'healthy',
        server: 'PUAGME Festival Backend',
        version: '1.0.0',
        database: 'connected',
        totalRegistrations: 'error'
      });
    }
    
    res.json({
      status: 'healthy',
      server: 'PUAGME Festival Backend',
      version: '1.0.0',
      database: 'connected',
      totalRegistrations: row.count,
      email: process.env.EMAIL_USER ? 'configured' : 'not configured'
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
  console.log(`🌐 CORS allowed: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`🔐 Admin panel: http://localhost:${PORT}/admin/registrations`);
  const store = readAdminStore();
  console.log(`🛡️  Admin username: ${store?.username}`);
  console.log(`💾 Using SQLite database: registrations.db`);
  console.log(`💡 Registration will succeed even if email fails`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('✅ Database connection closed');
    }
    process.exit(0);
  });
});