import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { appRoutes } from './modules/user/routes/UserRoutes';
import { customerRoutes } from './modules/customer/routes/CustomerRoute';
import { entrepreneurRoutes } from './modules/entrepreneur/routes/EntrepreneurRoutes';

export const app = fastify();

const prisma = new PrismaClient();
app.register(appRoutes);
app.register(customerRoutes);
app.register(entrepreneurRoutes);
