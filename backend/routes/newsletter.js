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

      // If already active
      if (subscriber && subscriber.status === 'active') {
        return res.status(200).json({
          success: true,
          message: 'You are already subscribed.'
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

    const result = await pool.query(
      'UPDATE newsletter_subscribers SET status = $1, is_active = $2, updated_at = CURRENT_TIMESTAMP WHERE email = $3',
      ['unsubscribed', false, email.toLowerCase()]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in subscribers list.'
      });
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
    
    const result = await pool.query(
      'UPDATE newsletter_subscribers SET status = $1, is_active = $2, updated_at = CURRENT_TIMESTAMP WHERE unsubscribe_token = $3',
      ['unsubscribed', false, token]
    );

    if (result.rowCount === 0) {
      return res.status(400).send('Invalid unsubscribe link.');
    }

    // Redirect to frontend with success message
    const frontendUrl = process.env.FRONTEND_URL || 'https://puagmae-festival-e6ql.onrender.com';
    res.redirect(`${frontendUrl}?newsletter=unsubscribed`);
  } catch (error) {
    console.error('Unsubscribe token error:', error);
    res.status(500).send('Failed to unsubscribe.');
  }
});

// Confirm subscription
router.get('/confirm/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    const result = await pool.query(
      `UPDATE newsletter_subscribers 
       SET status = $1, is_active = $2, subscribed_at = CURRENT_TIMESTAMP, confirm_token = NULL, confirm_token_expires = NULL, updated_at = CURRENT_TIMESTAMP 
       WHERE confirm_token = $3 AND confirm_token_expires > NOW()`,
      ['active', true, token]
    );

    if (result.rowCount === 0) {
      return res.status(400).send('Invalid or expired confirmation link.');
    }

    // Redirect to frontend with success message
    const frontendUrl = process.env.FRONTEND_URL || 'https://puagmae-festival-e6ql.onrender.com';
    res.redirect(`${frontendUrl}?newsletter=confirmed`);
  } catch (error) {
    console.error('Confirm subscription error:', error);
    res.status(500).send('Failed to confirm subscription.');
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