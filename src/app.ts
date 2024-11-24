import fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { PrismaClient } from '@prisma/client';
import { appRoutes } from './modules/user/routes/UserRoutes';
import { customerRoutes } from './modules/customer/routes/CustomerRoute';
import { entrepreneurRoutes } from './modules/entrepreneur/routes/EntrepreneurRoutes';
import { orderRoutes } from './modules/order/routes/OrderRoutes';
import { productRoutes } from './modules/product/routes/ProductRoutes';
import { menuRoutes } from './modules/menu/routes/MenuRoutes';

export const app = fastify({
  logger: true
});

// Register CORS
app.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
});

// Register JWT
app.register(jwt, {
  secret: process.env.JWT_SECRET || 'your-secret-key'
});

// Global error handler
app.setErrorHandler((error, request, reply) => {
  app.log.error(error);
  reply.status(error.statusCode || 500).send({
    error: {
      message: error.message || 'Internal Server Error',
      code: error.code || 'INTERNAL_ERROR'
    }
  });
});

// Add authentication hook
app.addHook('onRequest', async (request, reply) => {
  try {
    // Skip authentication for login, register, and OPTIONS requests
    const publicPaths = ['/api/users/login', '/api/users'];
    const isPublicPath = publicPaths.some(path => request.url === path);
    const isOptionsRequest = request.method === 'OPTIONS';

    if (isPublicPath || isOptionsRequest) {
      return;
    }

    await request.jwtVerify();
  } catch (err) {
    app.log.error('Authentication error:', err);
    reply.code(403).send({ error: 'Authentication required' });
  }
});

// Health check route
app.get('/health', async () => {
  return { status: 'ok' };
});

const prisma = new PrismaClient();

// Register routes with prefix
app.register(appRoutes, { prefix: '/api' });
app.register(customerRoutes, { prefix: '/api' });
app.register(entrepreneurRoutes, { prefix: '/api' });
app.register(orderRoutes, { prefix: '/api' });
app.register(productRoutes, { prefix: '/api' });
app.register(menuRoutes, { prefix: '/api' });

// Handle 404 errors
app.setNotFoundHandler((request, reply) => {
  app.log.error(`Route not found: ${request.method} ${request.url}`);
  reply.status(404).send({
    error: {
      message: 'Route not found',
      code: 'NOT_FOUND'
    }
  });
});
