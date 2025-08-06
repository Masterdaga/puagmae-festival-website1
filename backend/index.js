const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


const registeredUsers = [];


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'puagmaeteampuagmae@gmail.com',
    pass: 'bivk lnyk fkej qeef',
  },
});


function generatePDF({ name, email, phone }) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const filePath = `./confirmation-${Date.now()}.pdf`;
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);

    
    const logoPath = path.join(__dirname, '..', 'public', 'logo.png');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, { fit: [100, 100], align: 'center' }).moveDown(1);
    }

    
    doc
      .fontSize(24)
      .fillColor('#1F4E79')
      .text('PUAGME Festival Registration Confirmation', {
        align: 'center',
        underline: true,
      })
      .moveDown(2);

    
    doc
      .fontSize(16)
      .fillColor('#000000')
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
      .text(
        `The festival kicks off on September 6 and will span 5 unforgettable days. Below is your full event schedule.`
      )
      .moveDown(2);

    
    const schedule = [
      { date: 'September 6', event: 'Peace and Love Day' },
      { date: 'September 7', event: 'Pan-Africanism Day' },
      { date: 'September 8', event: 'The Great Run on the Rain Day' },
      { date: 'September 9', event: 'Trade Day' },
      { date: 'September 10', event: 'Beauty Pageant & Live Concert' },
    ];

    doc.fontSize(16).fillColor('#000000').text('Festival Schedule', {
      underline: true,
    });
    doc.moveDown(1);

    schedule.forEach(({ date, event }) => {
      doc
        .fontSize(13)
        .text(`${date}: ${event}`, {
          indent: 20,
        });
    });

    doc.moveDown(2);

    
    doc
      .fontSize(14)
      .fillColor('#333333')
      .text(
        `Please keep this confirmation for your records. We look forward to celebrating with you at the PUAGME Festival.`,
        { align: 'left' }
      )
      .moveDown(2)
      .fontSize(12)
      .fillColor('#888888')
      .text('— PUAGME Festival Team', {
        align: 'right',
        italic: true,
      });

   
    doc.end();

    stream.on('finish', () => resolve(filePath));
    stream.on('error', reject);
  });
}


app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.post('/register', async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const userExists = registeredUsers.some(user => user.email === email);
  if (userExists) {
    return res.status(409).json({ message: 'This email is already registered.' });
  }

  const newUser = { name, email, phone };
  registeredUsers.push(newUser);

  try {
    const pdfPath = await generatePDF(newUser);

    const mailOptions = {
      from: 'puagmaeteampuagmae@gmail.com',
      to: email,
      subject: 'PUAGME Festival Registration Confirmation',
      text: `Dear ${name},\n\nWe're happy you registered for the PUAGME Festival! We look forward to welcoming you starting on September 6.\n\nPlease find your registration confirmation attached.\n\n With regards! \n\n PUAGME Festival Team`,
      attachments: [
        {
          filename: 'RegistrationConfirmation.pdf',
          path: pdfPath,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    
    fs.unlink(pdfPath, err => {
      if (err) console.error('Failed to delete PDF:', err);
    });

    res.status(201).json({ message: 'Registration successful and email sent!' });
  } catch (error) {
    console.error('Error during registration/email:', error);
    res.status(500).json({ message: 'Something went wrong. Try again later.' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
