import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { connectDB, disconnectDB } from './config/db.js';
import { isOriginAllowed } from './config/cors.js';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';
import logger from './utils/logger.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const isProduction = process.env.NODE_ENV === 'production';
const JSON_LIMIT = '100kb';

async function startServer() {
  await connectDB();

  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: !isProduction,
  });

  await server.start();

  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use(
    cors({
      origin(origin, callback) {
        if (isOriginAllowed(origin)) {
          callback(null, true);
          return;
        }

        logger.warn('Blocked CORS request', { origin });
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      },
    })
  );

  app.use('/graphql', express.json({ limit: JSON_LIMIT }), expressMiddleware(server));

  const httpServer = app.listen(PORT, () => {
    logger.info('Server ready', { url: `http://localhost:${PORT}/graphql` });
  });

  const shutdown = async (signal) => {
    logger.info('Shutting down server', { signal });
    httpServer.close(async () => {
      await server.stop();
      await disconnectDB();
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

startServer().catch((error) => {
  logger.error('Failed to start server', { error: error.message });
  process.exit(1);
});
