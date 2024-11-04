// controllers/EntrepreneurController.ts
import { FastifyRequest, FastifyReply } from 'fastify';
import { EntrepreneurService } from '../services/EntrepreneurServices';
import { z } from 'zod';
import {
	GetEntrepreneurByIdParams,
	CreateEntrepreneurInput,
	UpdateEntrepreneurInput,
} from '../interfaces/EntrepreneurInterface';

export class EntrepreneurController {
	private entrepreneurService = new EntrepreneurService();

	async create(request: FastifyRequest, reply: FastifyReply) {
		const createEntrepreneurSchema = z.object({
			userId: z.string().uuid(),
		});

		const entrepreneurData = createEntrepreneurSchema.parse(request.body);
		try {
			const newEntrepreneur =
				await this.entrepreneurService.createEntrepreneur(entrepreneurData);
			return reply.status(201).send(newEntrepreneur);
		} catch (error) {
			if (error instanceof Error) {
				return reply.status(400).send({ error: error.message });
			}
			return reply.status(400).send({ error: 'An unknown error occurred' });
		}
	}

	async getAll(request: FastifyRequest, reply: FastifyReply) {
		try {
			const entrepreneurs =
				await this.entrepreneurService.getAllEntrepreneurs();
			return reply.status(200).send(entrepreneurs);
		} catch (error) {
			if (error instanceof Error) {
				return reply.status(500).send({ error: error.message });
			}
			return reply.status(500).send({ error: 'An unknown error occurred' });
		}
	}

	async getById(
		request: FastifyRequest<{ Params: GetEntrepreneurByIdParams }>,
		reply: FastifyReply,
	) {
		const id = request.params.id;

		try {
			const entrepreneur =
				await this.entrepreneurService.getEntrepreneurById(id);
			if (!entrepreneur) {
				return reply
					.status(404)
					.send({ error: 'Entrepreneur not found with the provided ID' });
			}
			return reply.status(200).send(entrepreneur);
		} catch (error) {
			if (error instanceof Error) {
				return reply.status(500).send({ error: error.message });
			}
			return reply.status(500).send({ error: 'An unknown error occurred' });
		}
	}

	async update(
		request: FastifyRequest<{ Params: GetEntrepreneurByIdParams }>,
		reply: FastifyReply,
	) {
		const id = request.params.id;

		const updateEntrepreneurSchema = z.object({
			userId: z.string().uuid().optional(),
		});

		const entrepreneurData = updateEntrepreneurSchema.parse(request.body);

		try {
			const updatedEntrepreneur =
				await this.entrepreneurService.updateEntrepreneur(id, entrepreneurData);
			return reply.status(200).send(updatedEntrepreneur);
		} catch (error) {
			if (error instanceof Error) {
				return reply.status(400).send({ error: error.message });
			}
			return reply.status(400).send({ error: 'An unknown error occurred' });
		}
	}

	async delete(
		request: FastifyRequest<{ Params: GetEntrepreneurByIdParams }>,
		reply: FastifyReply,
	) {
		const id = request.params.id;

		try {
			const deletedEntrepreneur =
				await this.entrepreneurService.deleteEntrepreneur(id);
			return reply.status(200).send(deletedEntrepreneur);
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === 'Entrepreneur not found') {
					return reply.status(404).send({ error: error.message });
				}
				return reply.status(400).send({ error: error.message });
			}
			return reply.status(400).send({ error: 'An unknown error occurred' });
		}
	}
}
