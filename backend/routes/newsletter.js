const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const { createTransporter, emailTemplates, generateConfirmLink, generateUnsubscribeLink } = require('../config/email');

// PostgreSQL Database Setup for newsletters
async function initializeNewsletterTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        status VARCHAR(50) DEFAULT 'pending' CHECK(status IN ('pending', 'active', 'unsubscribed')),
        is_active BOOLEAN DEFAULT FALSE,
        subscribed_at TIMESTAMP,
        source VARCHAR(100) DEFAULT 'website',
        confirm_token VARCHAR(255),
        confirm_token_expires TIMESTAMP,
        unsubscribe_token VARCHAR(255),
        last_email_sent TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    await pool.query('CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers (email)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers (status)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_newsletter_confirm_token ON newsletter_subscribers (confirm_token)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_newsletter_unsubscribe_token ON newsletter_subscribers (unsubscribe_token)');
    
    console.log('✅ Newsletter table initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing newsletter table:', error);
  }
}

// Initialize newsletter table on startup
initializeNewsletterTable();

// Subscribe to newsletter (double opt-in)
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }

    try {
      // Look up existing record
      const result = await pool.query(
        'SELECT * FROM newsletter_subscribers WHERE email = $1',
        [email.toLowerCase()]
      );
      
      const subscriber = result.rows[0];

      // If already active - prevent double subscription
      if (subscriber && subscriber.status === 'active') {
        return res.status(409).json({
          success: false,
          message: 'This email is already subscribed to our newsletter.'
        });
      }

      // If pending but not expired, don't send another email
      if (subscriber && subscriber.status === 'pending' && subscriber.confirm_token_expires > new Date()) {
        return res.status(409).json({
          success: false,
          message: 'Please check your email for the confirmation link. If you didn\'t receive it, please check your spam folder.'
        });
      }

      // Create or reset pending record
      const confirmToken = crypto.randomBytes(24).toString('hex');
      const unsubscribeToken = crypto.randomBytes(24).toString('hex');
      const confirmTokenExpires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 2); // 48h

      if (!subscriber) {
        // Insert new subscriber
        const insertResult = await pool.query(
          `INSERT INTO newsletter_subscribers 
           (email, status, is_active, confirm_token, confirm_token_expires, unsubscribe_token, source) 
           VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
          [email.toLowerCase(), 'pending', false, confirmToken, confirmTokenExpires.toISOString(), unsubscribeToken, req.body.source || 'website']
        );

        await sendConfirmationEmail(email, confirmToken, unsubscribeToken);
        res.status(201).json({
          success: true,
          message: 'Please check your email to confirm your subscription.'
        });
      } else {
        // Update existing subscriber
        await pool.query(
          `UPDATE newsletter_subscribers 
           SET status = $1, is_active = $2, confirm_token = $3, confirm_token_expires = $4, unsubscribe_token = $5, updated_at = CURRENT_TIMESTAMP 
           WHERE email = $6`,
          ['pending', false, confirmToken, confirmTokenExpires.toISOString(), unsubscribeToken, email.toLowerCase()]
        );

        await sendConfirmationEmail(email, confirmToken, unsubscribeToken);
        res.status(200).json({
          success: true,
          message: 'Please check your email to confirm your subscription.'
        });
      }
    } catch (error) {
      console.error('Subscription error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to subscribe. Please try again.'
      });
    }

  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again.'
    });
  }
});

// Unsubscribe from newsletter (body email)
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address'
      });
    }

    // First check if the email exists and is subscribed
    const checkResult = await pool.query(
      'SELECT email, status FROM newsletter_subscribers WHERE email = $1',
      [email.toLowerCase()]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'This email is not in our subscribers list.'
      });
    }

    const subscriber = checkResult.rows[0];
    
    if (subscriber.status === 'unsubscribed') {
      return res.status(409).json({
        success: false,
        message: 'This email is already unsubscribed from our newsletter.'
      });
    }

    // Now unsubscribe
    const result = await pool.query(
      'UPDATE newsletter_subscribers SET status = $1, is_active = $2, updated_at = CURRENT_TIMESTAMP WHERE email = $3',
      ['unsubscribed', false, email.toLowerCase()]
    );

    // Send unsubscribe confirmation email
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `PUAGMAE Festival <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Unsubscribed from PUAGMAE Festival Newsletter',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); padding: 20px; text-align: center;">
              <h1 style="color: #1f2937; margin: 0;">PUAGMAE Festival</h1>
            </div>
            <div style="padding: 30px; background: #f9fafb;">
              <h2 style="color: #1f2937;">Unsubscribed Successfully</h2>
              <p style="color: #4b5563; line-height: 1.6;">
                You have been successfully unsubscribed from the PUAGMAE Festival newsletter.
              </p>
              <p style="color: #4b5563; line-height: 1.6;">
                We're sorry to see you go! If you change your mind, you can always subscribe again on our website.
              </p>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.FRONTEND_URL || 'https://puagmae-festival-e6ql.onrender.com'}" 
                   style="background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #1f2937; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                  Visit Our Website
                </a>
              </div>
            </div>
            <div style="background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px;">
              <p>© 2025 PUAGMAE Festival. All rights reserved.</p>
            </div>
          </div>
        `
      });
      console.log('✅ Unsubscribe confirmation email sent to:', email);
    } catch (emailError) {
      console.warn('⚠️ Failed to send unsubscribe confirmation email:', emailError.message);
    }

    res.json({
      success: true,
      message: 'Successfully unsubscribed!'
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unsubscribe. Please try again.'
    });
  }
});

// Unsubscribe via token (link)
router.get('/unsubscribe/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    // First check if the token exists and get subscriber info
    const checkResult = await pool.query(
      'SELECT email, status FROM newsletter_subscribers WHERE unsubscribe_token = $1',
      [token]
    );

    if (checkResult.rows.length === 0) {
      return res.status(400).send(`
        <html>
          <head><title>Invalid Link - PUAGMAE Festival</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #dc2626;">Invalid Unsubscribe Link</h1>
            <p>This unsubscribe link is invalid or has expired.</p>
            <p><a href="${process.env.FRONTEND_URL || 'https://puagmae-festival.onrender.com'}">Return to Website</a></p>
          </body>
        </html>
      `);
    }

    const subscriber = checkResult.rows[0];
    
    if (subscriber.status === 'unsubscribed') {
      return res.status(400).send(`
        <html>
          <head><title>Already Unsubscribed - PUAGMAE Festival</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #059669;">Already Unsubscribed</h1>
            <p>This email is already unsubscribed from our newsletter.</p>
            <p><a href="${process.env.FRONTEND_URL || 'https://puagmae-festival.onrender.com'}">Return to Website</a></p>
          </body>
        </html>
      `);
    }

    const email = subscriber.email;
    
    // Now unsubscribe
    const result = await pool.query(
      'UPDATE newsletter_subscribers SET status = $1, is_active = $2, updated_at = CURRENT_TIMESTAMP WHERE unsubscribe_token = $3',
      ['unsubscribed', false, token]
    );

    // Send unsubscribe confirmation email
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: `PUAGMAE Festival <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Unsubscribed from PUAGMAE Festival Newsletter',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); padding: 20px; text-align: center;">
              <h1 style="color: #1f2937; margin: 0;">PUAGMAE Festival</h1>
            </div>
            <div style="padding: 30px; background: #f9fafb;">
              <h2 style="color: #1f2937;">Unsubscribed Successfully</h2>
              <p style="color: #4b5563; line-height: 1.6;">
                You have been successfully unsubscribed from the PUAGMAE Festival newsletter.
              </p>
              <p style="color: #4b5563; line-height: 1.6;">
                We're sorry to see you go! If you change your mind, you can always subscribe again on our website.
              </p>
              <div style="text-align: center; margin-top: 30px;">
                <a href="${process.env.FRONTEND_URL || 'https://puagmae-festival-e6ql.onrender.com'}" 
                   style="background: linear-gradient(135deg, #fbbf24, #f59e0b); color: #1f2937; padding: 12px 24px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                  Visit Our Website
                </a>
              </div>
            </div>
            <div style="background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px;">
              <p>© 2025 PUAGMAE Festival. All rights reserved.</p>
            </div>
          </div>
        `
      });
      console.log('✅ Unsubscribe confirmation email sent to:', email);
    } catch (emailError) {
      console.warn('⚠️ Failed to send unsubscribe confirmation email:', emailError.message);
    }

    // Show success page instead of redirecting
    res.send(`
      <html>
        <head>
          <title>Unsubscribed Successfully - PUAGMAE Festival</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 0; 
              padding: 0; 
              background: linear-gradient(135deg, #1f2937, #374151);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              background: rgba(255, 255, 255, 0.95);
              border-radius: 15px;
              padding: 40px;
              text-align: center;
              max-width: 500px;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            .logo {
              background: linear-gradient(135deg, #fbbf24, #f59e0b);
              color: #1f2937;
              padding: 20px;
              border-radius: 10px;
              margin-bottom: 30px;
            }
            .logo h1 {
              margin: 0;
              font-size: 2.5em;
              font-weight: bold;
            }
            .success-icon {
              font-size: 4em;
              margin: 20px 0;
            }
            .btn {
              background: linear-gradient(135deg, #fbbf24, #f59e0b);
              color: #1f2937;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 25px;
              font-weight: bold;
              display: inline-block;
              margin: 10px;
              transition: transform 0.2s;
            }
            .btn:hover {
              transform: translateY(-2px);
            }
            .benefits {
              background: #f3f4f6;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
              text-align: left;
            }
            .benefits h3 {
              color: #1f2937;
              margin-top: 0;
            }
            .benefits ul {
              color: #4b5563;
              line-height: 1.6;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 0.9em;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <h1>PUAGMAE Festival</h1>
            </div>
            <div class="success-icon">✅</div>
            <h2 style="color: #059669; margin-bottom: 20px;">Unsubscribed Successfully</h2>
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 30px;">
              You have been successfully unsubscribed from the PUAGMAE Festival newsletter. 
              We respect your decision and have removed your email from our mailing list.
            </p>
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 30px;">
              If you change your mind, you can always subscribe again on our website.
            </p>
            <div>
              <a href="${process.env.FRONTEND_URL || 'https://puagmae-festival.onrender.com'}" class="btn">
                Visit Our Website
              </a>
            </div>
            <div class="footer">
              <p>© 2025 PUAGMAE Festival. Celebrating the African Golden 13th Month.</p>
            </div>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Unsubscribe token error:', error);
    res.status(500).send(`
      <html>
        <head><title>Error - PUAGMAE Festival</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #dc2626;">Error</h1>
          <p>An error occurred while processing your request.</p>
          <p><a href="${process.env.FRONTEND_URL || 'https://puagmae-festival.onrender.com'}">Return to Website</a></p>
        </body>
      </html>
    `);
  }
});

// Confirm subscription
router.get('/confirm/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    // First check if token exists and is valid
    const checkResult = await pool.query(
      'SELECT email, status, confirm_token_expires FROM newsletter_subscribers WHERE confirm_token = $1',
      [token]
    );

    if (checkResult.rows.length === 0) {
      return res.status(400).send(`
        <html>
          <head><title>Invalid Link - PUAGMAE Festival</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #dc2626;">Invalid Confirmation Link</h1>
            <p>This confirmation link is invalid or has expired.</p>
            <p><a href="${process.env.FRONTEND_URL || 'https://puagmae-festival.onrender.com'}">Return to Website</a></p>
          </body>
        </html>
      `);
    }

    const subscriber = checkResult.rows[0];
    
    if (subscriber.status === 'active') {
      return res.status(400).send(`
        <html>
          <head><title>Already Confirmed - PUAGMAE Festival</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #059669;">Already Confirmed</h1>
            <p>This email is already confirmed and active in our newsletter.</p>
            <p><a href="${process.env.FRONTEND_URL || 'https://puagmae-festival.onrender.com'}">Return to Website</a></p>
          </body>
        </html>
      `);
    }

    if (subscriber.confirm_token_expires < new Date()) {
      return res.status(400).send(`
        <html>
          <head><title>Expired Link - PUAGMAE Festival</title></head>
          <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
            <h1 style="color: #dc2626;">Link Expired</h1>
            <p>This confirmation link has expired. Please subscribe again from our website.</p>
            <p><a href="${process.env.FRONTEND_URL || 'https://puagmae-festival.onrender.com'}">Return to Website</a></p>
          </body>
        </html>
      `);
    }
    
    // Now confirm the subscription
    const result = await pool.query(
      `UPDATE newsletter_subscribers 
       SET status = $1, is_active = $2, subscribed_at = CURRENT_TIMESTAMP, confirm_token = NULL, confirm_token_expires = NULL, updated_at = CURRENT_TIMESTAMP 
       WHERE confirm_token = $3`,
      ['active', true, token]
    );

    // Show success page instead of redirecting
    res.send(`
      <html>
        <head>
          <title>Subscription Confirmed - PUAGMAE Festival</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 0; 
              padding: 0; 
              background: linear-gradient(135deg, #1f2937, #374151);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              background: rgba(255, 255, 255, 0.95);
              border-radius: 15px;
              padding: 40px;
              text-align: center;
              max-width: 500px;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            }
            .logo {
              background: linear-gradient(135deg, #fbbf24, #f59e0b);
              color: #1f2937;
              padding: 20px;
              border-radius: 10px;
              margin-bottom: 30px;
            }
            .logo h1 {
              margin: 0;
              font-size: 2.5em;
              font-weight: bold;
            }
            .success-icon {
              font-size: 4em;
              margin: 20px 0;
            }
            .btn {
              background: linear-gradient(135deg, #fbbf24, #f59e0b);
              color: #1f2937;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 25px;
              font-weight: bold;
              display: inline-block;
              margin: 10px;
              transition: transform 0.2s;
            }
            .btn:hover {
              transform: translateY(-2px);
            }
            .benefits {
              background: #f3f4f6;
              padding: 20px;
              border-radius: 10px;
              margin: 20px 0;
              text-align: left;
            }
            .benefits h3 {
              color: #1f2937;
              margin-top: 0;
            }
            .benefits ul {
              color: #4b5563;
              line-height: 1.6;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #e5e7eb;
              color: #6b7280;
              font-size: 0.9em;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">
              <h1>PUAGMAE Festival</h1>
            </div>
            <div class="success-icon">🎉</div>
            <h2 style="color: #059669; margin-bottom: 20px;">Welcome to PUAGMAE!</h2>
            <p style="color: #4b5563; line-height: 1.6; margin-bottom: 20px;">
              Your newsletter subscription has been confirmed successfully! 
              Welcome to the PUAGMAE Festival community.
            </p>
            <div class="benefits">
              <h3>What's Next?</h3>
              <ul>
                <li>🎭 Exclusive festival updates and announcements</li>
                <li>📅 Early access to event registrations</li>
                <li>🎪 Special performances and activities</li>
                <li>🎨 Cultural highlights and stories</li>
                <li>🎵 Music and entertainment news</li>
              </ul>
            </div>
            <div>
              <a href="${process.env.FRONTEND_URL || 'https://puagmae-festival.onrender.com'}" class="btn">
                Visit Our Website
              </a>
            </div>
            <div class="footer">
              <p>© 2025 PUAGMAE Festival. Celebrating the African Golden 13th Month.</p>
            </div>
          </div>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Confirm subscription error:', error);
    res.status(500).send(`
      <html>
        <head><title>Error - PUAGMAE Festival</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1 style="color: #dc2626;">Error</h1>
          <p>An error occurred while confirming your subscription.</p>
          <p><a href="${process.env.FRONTEND_URL || 'https://puagmae-festival.onrender.com'}">Return to Website</a></p>
        </body>
      </html>
    `);
  }
});

// Get all subscribers (admin only)
router.get('/subscribers', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT email, subscribed_at, source FROM newsletter_subscribers WHERE status = $1 AND is_active = $2 ORDER BY subscribed_at DESC',
      ['active', true]
    );

    res.json({
      success: true,
      count: result.rows.length,
      subscribers: result.rows
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch subscribers.'
    });
  }
});

// Send newsletter to all subscribers (admin only)
router.post('/send-newsletter', async (req, res) => {
  try {
    const { subject, content } = req.body;

    if (!subject || !content) {
      return res.status(400).json({
        success: false,
        message: 'Subject and content are required'
      });
    }

    const result = await pool.query(
      'SELECT email FROM newsletter_subscribers WHERE status = $1 AND is_active = $2',
      ['active', true]
    );

        if (rows.length === 0) {
          return res.status(400).json({
            success: false,
            message: 'No active subscribers found'
          });
        }

        try {
          const transporter = createTransporter();
          const newsletterEmail = emailTemplates.newsletter(subject, content);

          // Send to all subscribers
          const emailPromises = result.rows.map(subscriber => {
            return transporter.sendMail({
              from: process.env.EMAIL_USER || 'puagmaef@gmail.com',
              to: subscriber.email,
              subject: newsletterEmail.subject,
              html: newsletterEmail.html
            });
          });

          await Promise.all(emailPromises);

          // Update lastEmailSent for all subscribers
          await pool.query(
            'UPDATE newsletter_subscribers SET last_email_sent = CURRENT_TIMESTAMP WHERE status = $1 AND is_active = $2',
            ['active', true]
          );

          res.json({
            success: true,
            message: `Newsletter sent to ${result.rows.length} subscribers successfully!`
          });

        } catch (emailError) {
          console.error('Email sending error:', emailError);
          res.status(500).json({
            success: false,
            message: 'Failed to send newsletter emails.'
          });
        }

  } catch (error) {
    console.error('Send newsletter error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send newsletter. Please try again.'
    });
  }
});

// Get subscriber statistics (admin only)
router.get('/stats', async (req, res) => {
  try {
    const activeResult = await pool.query(
      'SELECT COUNT(*) as totalActive FROM newsletter_subscribers WHERE status = $1 AND is_active = $2',
      ['active', true]
    );

    const inactiveResult = await pool.query(
      'SELECT COUNT(*) as totalInactive FROM newsletter_subscribers WHERE status = $1',
      ['unsubscribed']
    );

    const monthResult = await pool.query(
      'SELECT COUNT(*) as thisMonth FROM newsletter_subscribers WHERE status = $1 AND is_active = $2 AND subscribed_at >= DATE_TRUNC(\'month\', CURRENT_DATE)',
      ['active', true]
    );

    const totalActive = parseInt(activeResult.rows[0].totalactive);
    const totalInactive = parseInt(inactiveResult.rows[0].totalinactive);
    const thisMonth = parseInt(monthResult.rows[0].thismonth);

    res.json({
      success: true,
      stats: {
        totalActive,
        totalInactive,
        thisMonth,
        total: totalActive + totalInactive
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics.'
    });
  }
});

// Helper function to send confirmation email
async function sendConfirmationEmail(email, confirmToken, unsubscribeToken) {
  try {
    const transporter = createTransporter();
    const confirmLink = generateConfirmLink(confirmToken);
    const unsubscribeLink = generateUnsubscribeLink(unsubscribeToken);
    const welcomeEmail = emailTemplates.welcome(email);

    const html = `
      ${welcomeEmail.html}
      <div style="padding:16px;text-align:center">
        <a href="${confirmLink}" style="display:inline-block;background:#fbbf24;color:#111827;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:700">Confirm subscription</a>
        <p style="color:#6b7280;margin-top:10px;font-size:12px">If you did not request this, you can ignore this message or <a href="${unsubscribeLink}">unsubscribe</a>.</p>
      </div>`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'puagmaef@gmail.com',
      to: email,
      subject: 'Confirm your subscription to PUAGMAE Festival',
      html
    });

    // Admin notification (optional)
    const adminEmail = emailTemplates.adminNotification({
      email,
      subscribedAt: new Date()
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER || 'puagmaef@gmail.com',
      to: process.env.ADMIN_EMAIL ? process.env.ADMIN_EMAIL : 'puagmaef@gmail.com',
      subject: adminEmail.subject,
      html: adminEmail.html
    });

    console.log('✅ Confirmation email sent to:', email);

  } catch (emailError) {
    console.error('❌ Email sending failed for:', email, emailError.message);
  }
}

module.exports = router; 