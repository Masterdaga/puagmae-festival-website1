const mongoose = require('mongoose');

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email',
      ],
    },
    // Subscription lifecycle
    status: {
      type: String,
      enum: ['pending', 'active', 'unsubscribed'],
      default: 'pending',
    },
    isActive: {
      // kept for backward compatibility with existing code
      type: Boolean,
      default: false,
    },
    subscribedAt: {
      type: Date,
      default: null,
    },
    lastEmailSent: {
      type: Date,
      default: null,
    },
    source: {
      type: String,
      default: 'website',
    },
    // Double opt-in and unsubscribe tokens
    confirmToken: {
      type: String,
      default: null,
    },
    confirmTokenExpires: {
      type: Date,
      default: null,
    },
    unsubscribeToken: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
subscriberSchema.index({ email: 1 });
subscriberSchema.index({ subscribedAt: -1 });
subscriberSchema.index({ status: 1 });
subscriberSchema.index({ confirmToken: 1 }, { sparse: true });
subscriberSchema.index({ unsubscribeToken: 1 }, { sparse: true });

module.exports = mongoose.model('Subscriber', subscriberSchema);
