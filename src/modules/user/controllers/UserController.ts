import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/UserService';
import { z } from 'zod';

export class UserController {
	private userService = new UserService();

	async register(request: FastifyRequest, reply: FastifyReply) {
		const createUserSchema = z.object({
			name: z.string(),
			email: z.string().email(),
			password: z.string(),
			role: z.enum(['ADMIN', 'ENTREPRENEUR', 'CUSTOMER']).default('CUSTOMER'),
			customerId: z.string().nullable().optional(),
		});

		const userData = createUserSchema.parse(request.body);
		try {
			const newUser = await this.userService.registerUser(userData);
			return reply.status(201).send(newUser);
		} catch (error) {
			if (error instanceof Error) {
				return reply.status(400).send({ error: error.message });
			}
			return reply.status(400).send({ error: 'An unknown error occurred' });
		}
	}

	async getAll(request: FastifyRequest, reply: FastifyReply) {
		try {
			const users = await this.userService.getAllUsers();
			return reply.status(200).send(users);
		} catch (error) {
			if (error instanceof Error) {
				return reply.status(500).send({ error: error.message });
			}
			return reply.status(500).send({ error: 'An unknown error occurred' });
		}
	}
}
