const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
    if (!uri) {
      console.warn(
        '⚠️ No MongoDB URI provided (MONGO_URI/MONGODB_URI). Newsletter features may not work.'
      );
      return;
    }
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    throw new Error('MongoDB connection failed');
  }
};

module.exports = connectDB;
