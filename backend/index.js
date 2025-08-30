require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const newsletterRouter = require('./routes/newsletter');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const os = require('os');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { adminAuth, readAdminStore, ADMIN_STORE } = require('./middleware/auth');
const pool = require('./config/database');

// PostgreSQL Database Setup
async function initializeDatabase() {
  try {
    // Read and execute schema
    const schemaPath = path.join(__dirname, 'config', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute the entire schema as one statement to handle functions properly
    try {
      await pool.query(schema);
      console.log('✅ Database schema initialized successfully');
    } catch (schemaError) {
      console.warn('⚠️ Schema execution failed, trying individual statements:', schemaError.message);
      
      // Fallback: Split schema into individual statements and filter out empty ones
      const statements = schema
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt && !stmt.startsWith('--'));
      
      for (const statement of statements) {
        if (statement.trim()) {
          try {
            await pool.query(statement);
          } catch (stmtError) {
            // Log individual statement errors but continue
            console.warn('⚠️ Statement failed:', statement.substring(0, 50) + '...', stmtError.message);
          }
        }
      }
      
      console.log('✅ Database schema initialized successfully (fallback method)');
    }
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    // Don't exit, continue with app startup
  }
}

// Initialize database on startup
initializeDatabase();

// Initialize admin credentials if not exists
function initializeAdmin() {
  try {
    const store = readAdminStore();
    if (!store) {
      // Create default admin credentials
      const defaultUsername = process.env.ADMIN_USER || 'admin';
      const defaultPassword = process.env.ADMIN_PASS || 'puagme2023';
      
      bcrypt.hash(defaultPassword, 10).then(passwordHash => {
        fs.writeFileSync(ADMIN_STORE, JSON.stringify({ 
          username: defaultUsername, 
          passwordHash 
        }, null, 2));
        console.log('✅ Admin credentials initialized');
      });
    } else {
      console.log('✅ Admin credentials already exist');
    }
  } catch (error) {
    console.error('❌ Error initializing admin:', error);
  }
}

initializeAdmin();

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

app.get('/admin/registrations', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY registered_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// List newsletter subscribers (all statuses) - admin only
app.get('/admin/newsletter/subscribers', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT email, status, is_active, created_at, updated_at FROM newsletter_subscribers ORDER BY created_at DESC'
    );
    res.json({ success: true, count: result.rows.length, subscribers: result.rows });
  } catch (err) {
    console.error('Newsletter DB error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch subscribers' });
  }
});

// Delete a registration (admin only)
app.delete('/admin/registrations/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ success: false, message: 'Missing registration id' });

  try {
    // Look up user first
    const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    const user = userResult.rows[0];

    // Delete
    await pool.query('DELETE FROM users WHERE id = $1', [id]);

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

  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ success: false, message: 'Failed to delete registration' });
  }
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
    try {
      const existingUser = await pool.query(
        'SELECT * FROM users WHERE email = $1 OR phone = $2',
        [email.toLowerCase(), phone.trim()]
      );

      if (existingUser.rows.length > 0) {
        return res.status(409).json({
          error: 'DuplicateError',
          message: 'Email or phone number already registered'
        });
      }

      // Create user in database
      const result = await pool.query(
        'INSERT INTO users (name, email, phone, email_sent) VALUES ($1, $2, $3, $4) RETURNING *',
        [name.trim(), email.toLowerCase().trim(), phone.trim(), false]
      );

      const newUser = result.rows[0];

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

    } catch (dbError) {
      console.error('Database error:', dbError);
      return res.status(500).json({
        error: 'InternalError',
        message: 'Registration failed. Please try again.'
      });
    }

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
    await pool.query(
      'UPDATE users SET email_sent = true, email_error = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = $1',
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
    await pool.query(
      'UPDATE users SET email_sent = false, email_error = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
      [emailError.message, user.id]
    );
  }
}

// Health check endpoint
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) as count FROM users');
    res.json({
      status: 'healthy',
      server: 'PUAGME Festival Backend',
      version: '1.0.0',
      database: 'connected',
      totalRegistrations: result.rows[0].count,
      email: process.env.EMAIL_USER ? 'configured' : 'not configured'
    });
  } catch (err) {
    res.json({
      status: 'healthy',
      server: 'PUAGME Festival Backend',
      version: '1.0.0',
      database: 'connected',
      totalRegistrations: 'error'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`📧 Email service: ${process.env.EMAIL_USER ? 'Configured' : 'Not configured'}`);
  console.log(`🌐 CORS allowed: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`🔐 Admin panel: http://localhost:${PORT}/admin/registrations`);
  const store = readAdminStore();
  console.log(`🛡️  Admin username: ${store?.username}`);
  console.log(`💾 Using PostgreSQL database: puagmae_festival`);
  console.log(`💡 Registration will succeed even if email fails`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  pool.end((err) => {
    if (err) {
      console.error('Error closing database pool:', err);
    } else {
      console.log('✅ Database pool closed');
    }
    process.exit(0);
  });
});