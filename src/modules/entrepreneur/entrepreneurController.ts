import { PrismaClient } from '@prisma/client';
import { FastifyRequest, FastifyReply } from 'fastify';

const prisma = new PrismaClient();

export const createEntrepreneur = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { userId } = request.body as { userId: string };

	try {
		const entrepreneur = await prisma.entrepreneur.create({
			data: { userId },
		});
		reply.status(201).send(entrepreneur);
	} catch (error) {
		reply.status(500).send({ error: 'Entrepreneur creation failed' });
	}
};
