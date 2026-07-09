import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import logger from '../utils/logger.js';

let memoryServer;

async function disconnectDB() {
  await mongoose.disconnect();

  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }

  logger.info('MongoDB disconnected');
}

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
      logger.info('Using in-memory MongoDB (development mode)');
    }

    await mongoose.connect(connectionUri);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error('MongoDB connection error', { error: error.message });
    process.exit(1);
  }
};

export { connectDB, disconnectDB };
