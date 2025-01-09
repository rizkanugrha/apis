import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUri = process.env.MONGO_URI;

export const openDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
      maxPoolSize: 10,
    });

    console.log('Connected to MongoDB');

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB error:', err);
    });

    setInterval(async () => {
      try {
        await mongoose.connection.db.admin().ping();
        console.log('Database connection is active');
      } catch (err) {
        console.error('Error in database heartbeat:', err);
      }
    }, 60000);
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
  }
};

export const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error.message);
  }
};
