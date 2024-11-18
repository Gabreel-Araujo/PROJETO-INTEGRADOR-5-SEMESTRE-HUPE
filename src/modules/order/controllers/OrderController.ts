import { FastifyRequest, FastifyReply } from 'fastify';
import { OrderService } from '../services/OrderService';
import { CreateOrderBody } from '../interfaces/OrderInterface';

export class OrderController {
	private orderService = new OrderService();

	async createOrder(
		request: FastifyRequest<{ Body: CreateOrderBody }>,
		reply: FastifyReply,
	): Promise<void> {
		const { customerId, entrepreneurId, items } = request.body;

		try {
			const order = await this.orderService.createOrder(
				customerId,
				entrepreneurId,
				items,
			);
			reply.status(201).send(order);
		} catch (error) {
			reply.status(400).send({ error });
		}
	}
}
