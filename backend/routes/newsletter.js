const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');
const { createTransporter, emailTemplates } = require('../config/email');

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }

    // Check if already subscribed
    const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existingSubscriber) {
      return res.status(400).json({ 
        success: false, 
        message: 'You are already subscribed to our newsletter!' 
      });
    }

    // Create new subscriber
    const newSubscriber = new Subscriber({
      email: email.toLowerCase(),
      source: req.body.source || 'website'
    });

    await newSubscriber.save();

    // Send welcome email
    try {
      const transporter = createTransporter();
      const welcomeEmail = emailTemplates.welcome(email);
      
      await transporter.sendMail({
        from: process.env.EMAIL_USER || 'puagmaef@gmail.com',
        to: email,
        subject: welcomeEmail.subject,
        html: welcomeEmail.html
      });

      // Send admin notification
      const adminEmail = emailTemplates.adminNotification(newSubscriber);
      await transporter.sendMail({
        from: process.env.EMAIL_USER || 'puagmaef@gmail.com',
        to: process.env.ADMIN_EMAIL || 'puagmaef@gmail.com',
        subject: adminEmail.subject,
        html: adminEmail.html
      });

    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Don't fail the subscription if email fails
    }

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed! Welcome to the PUAGMAE Festival community.',
      subscriber: {
        email: newSubscriber.email,
        subscribedAt: newSubscriber.subscribedAt
      }
    });

  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to subscribe. Please try again.'
    });
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address'
      });
    }

    const subscriber = await Subscriber.findOne({ email: email.toLowerCase() });
    
    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in subscribers list.'
      });
    }

    // Soft delete - mark as inactive instead of removing
    subscriber.isActive = false;
    await subscriber.save();

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

// Get all subscribers (admin only)
router.get('/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.find({ isActive: true })
      .sort({ subscribedAt: -1 })
      .select('email subscribedAt source');

    res.json({
      success: true,
      count: subscribers.length,
      subscribers
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

    const activeSubscribers = await Subscriber.find({ isActive: true });
    
    if (activeSubscribers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No active subscribers found'
      });
    }

    const transporter = createTransporter();
    const newsletterEmail = emailTemplates.newsletter(subject, content);

    // Send to all subscribers
    const emailPromises = activeSubscribers.map(subscriber => {
      return transporter.sendMail({
        from: process.env.EMAIL_USER || 'puagmaef@gmail.com',
        to: subscriber.email,
        subject: newsletterEmail.subject,
        html: newsletterEmail.html
      });
    });

    await Promise.all(emailPromises);

    // Update lastEmailSent for all subscribers
    await Subscriber.updateMany(
      { isActive: true },
      { lastEmailSent: new Date() }
    );

    res.json({
      success: true,
      message: `Newsletter sent to ${activeSubscribers.length} subscribers successfully!`
    });

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
    const totalSubscribers = await Subscriber.countDocuments({ isActive: true });
    const totalInactive = await Subscriber.countDocuments({ isActive: false });
    const thisMonth = await Subscriber.countDocuments({
      isActive: true,
      subscribedAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
    });

    res.json({
      success: true,
      stats: {
        totalActive: totalSubscribers,
        totalInactive,
        thisMonth,
        total: totalSubscribers + totalInactive
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

module.exports = router; 