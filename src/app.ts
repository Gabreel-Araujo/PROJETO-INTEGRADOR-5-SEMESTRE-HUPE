import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';

export const app = fastify();

const prisma = new PrismaClient();

prisma.customer.create({
	data: {
		name: 'Gabriel alves',
		email: 'gabriel@gabriel.com',
		password: '123456',
	},
});
