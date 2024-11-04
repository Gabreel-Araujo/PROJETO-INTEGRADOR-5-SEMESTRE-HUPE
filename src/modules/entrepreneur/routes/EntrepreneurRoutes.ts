import { FastifyInstance } from 'fastify';
import { EntrepreneurController } from '../controllers/EntrepreneurController';

const entrepreneurController = new EntrepreneurController();

export async function entrepreneurRoutes(fastify: FastifyInstance) {
	fastify.post(
		'/entrepreneurs',
		entrepreneurController.create.bind(entrepreneurController),
	);
	fastify.get(
		'/entrepreneurs',
		entrepreneurController.getAll.bind(entrepreneurController),
	);
	fastify.get(
		'/entrepreneurs/:id',
		entrepreneurController.getById.bind(entrepreneurController),
	);
	fastify.put(
		'/entrepreneurs/:id',
		entrepreneurController.update.bind(entrepreneurController),
	);
	fastify.delete(
		'/entrepreneurs/:id',
		entrepreneurController.delete.bind(entrepreneurController),
	);
}
