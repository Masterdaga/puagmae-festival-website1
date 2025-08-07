require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS config: allow only your frontend origin (adjust as needed)
app.use(cors({
  origin: 'http://localhost:3000',
}));

app.use(express.json());

// Serve static files (logo, etc)
app.use('/public', express.static(path.join(__dirname, 'public')));

// In-memory storage of registered users (replace with DB if needed)
const registeredUsers = [];

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter config on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Mailer config error:', error);
  } else {
    console.log('✅ Mailer is ready');
  }
});

// Generate PDF confirmation, save in OS temp dir, return full path
function generatePDF({ name, email, phone }) {
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
      .text(`Please keep this confirmation for your records. We look forward to celebrating with you at the PUAGME Festival.`, {
        align: 'left',
      })
      .moveDown(2)
      .fontSize(12)
      .fillColor('#888')
      .text('— PUAGME Festival Team', { align: 'right', italic: true });

    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
}

// Health check route
app.get('/', (req, res) => {
  res.send('✅ Server is running!');
});

// Registration route
app.post('/register', async (req, res) => {
  const { name, email, phone } = req.body;
  console.log('Received registration:', { name, email, phone });

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (registeredUsers.some(user => user.email === email)) {
    return res.status(409).json({ message: 'This email is already registered.' });
  }

  registeredUsers.push({ name, email, phone });

  let pdfPath;

  try {
    console.log('Generating PDF...');
    pdfPath = await generatePDF({ name, email, phone });
    console.log('PDF generated at:', pdfPath);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'PUAGME Festival Registration Confirmation',
      text: `Dear ${name},\n\nWe're happy you registered for the PUAGME Festival! Please find your registration confirmation attached.\n\nWith regards,\nPUAGME Festival Team`,
      attachments: [{ filename: 'RegistrationConfirmation.pdf', path: pdfPath }],
    };

    console.log('Sending email...');
    await transporter.sendMail(mailOptions);
    console.log('Email sent!');

    res.status(201).json({ message: 'Registration successful and email sent!' });
  } catch (error) {
    console.error('❌ Error during registration/email:', error);
    res.status(500).json({ message: 'Something went wrong. Try again later.' });
  } finally {
    if (pdfPath) {
      fs.unlink(pdfPath, err => {
        if (err) console.error('❌ Failed to delete PDF:', err);
      });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
