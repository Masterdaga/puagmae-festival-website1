const crypto = require('crypto');
const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const { createTransporter, emailTemplates, generateConfirmLink, generateUnsubscribeLink } = require('../config/email');

// SQLite Database Setup for newsletters
const dbPath = path.join(__dirname, '..', 'newsletter.db');
const newsletterDb = new sqlite3.Database(dbPath);

// Create newsletter subscribers table if it doesn't exist
newsletterDb.serialize(() => {
  newsletterDb.run(`
    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'active', 'unsubscribed')),
      isActive INTEGER DEFAULT 0,
      subscribedAt DATETIME,
      source TEXT DEFAULT 'website',
      confirmToken TEXT,
      confirmTokenExpires DATETIME,
      unsubscribeToken TEXT,
      lastEmailSent DATETIME,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  newsletterDb.run('CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers (email)');
  newsletterDb.run('CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscribers (status)');
  newsletterDb.run('CREATE INDEX IF NOT EXISTS idx_newsletter_confirm_token ON newsletter_subscribers (confirmToken)');
  newsletterDb.run('CREATE INDEX IF NOT EXISTS idx_newsletter_unsubscribe_token ON newsletter_subscribers (unsubscribeToken)');
});

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

    // Look up existing record
    newsletterDb.get(
      'SELECT * FROM newsletter_subscribers WHERE email = ?',
      [email.toLowerCase()],
      async (err, subscriber) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({
            success: false,
            message: 'Database error occurred'
          });
        }

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
          newsletterDb.run(
            `INSERT INTO newsletter_subscribers 
             (email, status, isActive, confirmToken, confirmTokenExpires, unsubscribeToken, source) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [email.toLowerCase(), 'pending', 0, confirmToken, confirmTokenExpires.toISOString(), unsubscribeToken, req.body.source || 'website'],
            async function (err) {
              if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                  success: false,
                  message: 'Failed to create subscription'
                });
              }

              await sendConfirmationEmail(email, confirmToken, unsubscribeToken);
              res.status(201).json({
                success: true,
                message: 'Please check your email to confirm your subscription.'
              });
            }
          );
        } else {
          // Update existing subscriber
          newsletterDb.run(
            `UPDATE newsletter_subscribers 
             SET status = ?, isActive = ?, confirmToken = ?, confirmTokenExpires = ?, unsubscribeToken = ?, updatedAt = CURRENT_TIMESTAMP 
             WHERE email = ?`,
            ['pending', 0, confirmToken, confirmTokenExpires.toISOString(), unsubscribeToken, email.toLowerCase()],
            async function (err) {
              if (err) {
                console.error('Database error:', err);
                return res.status(500).json({
                  success: false,
                  message: 'Failed to update subscription'
                });
              }

              await sendConfirmationEmail(email, confirmToken, unsubscribeToken);
              res.status(200).json({
                success: true,
                message: 'Please check your email to confirm your subscription.'
              });
            }
          );
        }
      }
    );

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

    newsletterDb.run(
      'UPDATE newsletter_subscribers SET status = ?, isActive = ?, updatedAt = CURRENT_TIMESTAMP WHERE email = ?',
      ['unsubscribed', 0, email.toLowerCase()],
      function (err) {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({
            success: false,
            message: 'Database error occurred'
          });
        }

        if (this.changes === 0) {
          return res.status(404).json({
            success: false,
            message: 'Email not found in subscribers list.'
          });
        }

        res.json({
          success: true,
          message: 'Successfully unsubscribed!'
        });
      }
    );

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
    
    newsletterDb.run(
      'UPDATE newsletter_subscribers SET status = ?, isActive = ?, updatedAt = CURRENT_TIMESTAMP WHERE unsubscribeToken = ?',
      ['unsubscribed', 0, token],
      function (err) {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).send('Database error occurred.');
        }

        if (this.changes === 0) {
          return res.status(400).send('Invalid unsubscribe link.');
        }

        res.send('You have been unsubscribed successfully.');
      }
    );
  } catch (error) {
    console.error('Unsubscribe token error:', error);
    res.status(500).send('Failed to unsubscribe.');
  }
});

// Confirm subscription
router.get('/confirm/:token', async (req, res) => {
  try {
    const { token } = req.params;
    
    newsletterDb.run(
      `UPDATE newsletter_subscribers 
       SET status = ?, isActive = ?, subscribedAt = CURRENT_TIMESTAMP, confirmToken = NULL, confirmTokenExpires = NULL, updatedAt = CURRENT_TIMESTAMP 
       WHERE confirmToken = ? AND confirmTokenExpires > datetime('now')`,
      ['active', 1, token],
      function (err) {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).send('Database error occurred.');
        }

        if (this.changes === 0) {
          return res.status(400).send('Invalid or expired confirmation link.');
        }

        res.send('Subscription confirmed! Welcome to the PUAGMAE Festival newsletter.');
      }
    );
  } catch (error) {
    console.error('Confirm subscription error:', error);
    res.status(500).send('Failed to confirm subscription.');
  }
});

// Get all subscribers (admin only)
router.get('/subscribers', async (req, res) => {
  try {
    newsletterDb.all(
      'SELECT email, subscribedAt, source FROM newsletter_subscribers WHERE status = ? AND isActive = ? ORDER BY subscribedAt DESC',
      ['active', 1],
      (err, rows) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({
            success: false,
            message: 'Failed to fetch subscribers.'
          });
        }

        res.json({
          success: true,
          count: rows.length,
          subscribers: rows
        });
      }
    );
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

    newsletterDb.all(
      'SELECT email FROM newsletter_subscribers WHERE status = ? AND isActive = ?',
      ['active', 1],
      async (err, rows) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({
            success: false,
            message: 'Database error occurred'
          });
        }

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
          const emailPromises = rows.map(subscriber => {
            return transporter.sendMail({
              from: process.env.EMAIL_USER || 'puagmaef@gmail.com',
              to: subscriber.email,
              subject: newsletterEmail.subject,
              html: newsletterEmail.html
            });
          });

          await Promise.all(emailPromises);

          // Update lastEmailSent for all subscribers
          newsletterDb.run(
            'UPDATE newsletter_subscribers SET lastEmailSent = CURRENT_TIMESTAMP WHERE status = ? AND isActive = ?',
            ['active', 1]
          );

          res.json({
            success: true,
            message: `Newsletter sent to ${rows.length} subscribers successfully!`
          });

        } catch (emailError) {
          console.error('Email sending error:', emailError);
          res.status(500).json({
            success: false,
            message: 'Failed to send newsletter emails.'
          });
        }
      }
    );

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
    newsletterDb.get(
      'SELECT COUNT(*) as totalActive FROM newsletter_subscribers WHERE status = ? AND isActive = ?',
      ['active', 1],
      (err, activeRow) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics.'
          });
        }

        newsletterDb.get(
          'SELECT COUNT(*) as totalInactive FROM newsletter_subscribers WHERE status = ?',
          ['unsubscribed'],
          (err, inactiveRow) => {
            if (err) {
              console.error('Database error:', err);
              return res.status(500).json({
                success: false,
                message: 'Failed to fetch statistics.'
              });
            }

            newsletterDb.get(
              'SELECT COUNT(*) as thisMonth FROM newsletter_subscribers WHERE status = ? AND isActive = ? AND subscribedAt >= datetime("now", "start of month")',
              ['active', 1],
              (err, monthRow) => {
                if (err) {
                  console.error('Database error:', err);
                  return res.status(500).json({
                    success: false,
                    message: 'Failed to fetch statistics.'
                  });
                }

                res.json({
                  success: true,
                  stats: {
                    totalActive: activeRow.totalActive,
                    totalInactive: inactiveRow.totalInactive,
                    thisMonth: monthRow.thisMonth,
                    total: activeRow.totalActive + inactiveRow.totalInactive
                  }
                });
              }
            );
          }
        );
      }
    );

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