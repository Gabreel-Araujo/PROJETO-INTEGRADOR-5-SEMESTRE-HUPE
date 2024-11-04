import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { appRoutes } from './modules/user/routes/UserRoutes';

export const app = fastify();

const prisma = new PrismaClient();
app.register(appRoutes);
