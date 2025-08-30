const nodemailer = require('nodemailer');

// Base URLs for links in emails
const BACKEND_BASE_URL = process.env.FRONTEND_URL || 'https://puagmae-festival-e6ql.onrender.com';

// Create transporter for sending emails
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'puagmaef@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

// Helpers to generate action links
const generateConfirmLink = (token) => `${process.env.BACKEND_URL || 'https://puagmae-festival-backend.onrender.com'}/api/newsletter/confirm/${token}`;
const generateUnsubscribeLink = (token) => `${process.env.BACKEND_URL || 'https://puagmae-festival-backend.onrender.com'}/api/newsletter/unsubscribe/${token}`;

// Email templates
const emailTemplates = {
  welcome: (email) => ({
    subject: 'Welcome to PUAGMAE Festival Newsletter! 🎉',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); padding: 20px; text-align: center;">
          <h1 style="color: #1f2937; margin: 0;">PUAGMAE Festival</h1>
        </div>
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937;">Welcome to Our Community! 🎉</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            Thank you for subscribing to the PUAGMAE Festival newsletter! 
            You'll be the first to know about:
          </p>
          <ul style="color: #4b5563; line-height: 1.6;">
            <li>🎭 Festival updates and announcements</li>
            <li>📅 Event schedules and changes</li>
            <li>🎪 Special performances and activities</li>
            <li>🎨 Cultural highlights and stories</li>
            <li>🎵 Music and entertainment news</li>
          </ul>
          <p style="color: #4b5563; line-height: 1.6;">
            We're excited to share the magic of African culture and unity with you!
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
          <p>To unsubscribe, reply to this email with "UNSUBSCRIBE" in the subject.</p>
        </div>
      </div>
    `
  }),
  
  newsletter: (subject, content) => ({
    subject: subject || 'PUAGMAE Festival Newsletter',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); padding: 20px; text-align: center;">
          <h1 style="color: #1f2937; margin: 0;">PUAGMAE Festival</h1>
        </div>
        <div style="padding: 30px; background: #f9fafb;">
          ${content}
        </div>
        <div style="background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px;">
          <p>© 2025 PUAGMAE Festival. All rights reserved.</p>
          <p>To unsubscribe, reply to this email with "UNSUBSCRIBE" in the subject.</p>
        </div>
      </div>
    `
  }),
  
  adminNotification: (newSubscriber) => ({
    subject: 'New Newsletter Subscriber - PUAGMAE Festival',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #fbbf24, #f59e0b); padding: 20px; text-align: center;">
          <h1 style="color: #1f2937; margin: 0;">New Subscriber Alert</h1>
        </div>
        <div style="padding: 30px; background: #f9fafb;">
          <h2 style="color: #1f2937;">New Newsletter Subscriber</h2>
          <p style="color: #4b5563; line-height: 1.6;">
            A new person has subscribed to your newsletter!
          </p>
          <div style="background: #e5e7eb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Email:</strong> ${newSubscriber.email}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(newSubscriber.subscribedAt).toLocaleDateString()}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${new Date(newSubscriber.subscribedAt).toLocaleTimeString()}</p>
          </div>
          <p style="color: #4b5563; line-height: 1.6;">
            You can manage all subscribers from your admin dashboard.
          </p>
        </div>
        <div style="background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; font-size: 12px;">
          <p>© 2025 PUAGMAE Festival. All rights reserved.</p>
        </div>
      </div>
    `
  })
};

module.exports = {
  createTransporter,
  emailTemplates,
  generateConfirmLink,
  generateUnsubscribeLink
}; 