import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let memoryServer;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  try {
    let connectionUri = uri;

    if (uri === 'memory') {
      memoryServer = await MongoMemoryServer.create();
      connectionUri = memoryServer.getUri('blog-app');
      console.log('Using in-memory MongoDB (development mode)');
    }

    await mongoose.connect(connectionUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
