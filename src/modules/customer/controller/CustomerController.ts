// controllers/CustomerController.ts
import { FastifyReply, FastifyRequest } from 'fastify';
import { CustomerService } from '../services/CustomerService';
import {
	CreateCustomerInput,
	UpdateCustomerInput,
} from '../interface/CustomerInterface';

export class CustomerController {
	constructor(private customerService: CustomerService) {}

	async createCustomer(
		req: FastifyRequest<{ Body: CreateCustomerInput }>,
		reply: FastifyReply,
	) {
		const { userId, orders } = req.body;
		const newCustomer = await this.customerService.createCustomer(
			userId,
			orders,
		);
		return reply.status(201).send(newCustomer);
	}

	async getAllCustomers(req: FastifyRequest, reply: FastifyReply) {
		const customers = await this.customerService.getAllCustomers();
		return reply.send(customers);
	}

	async getCustomerById(
		req: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		const { id } = req.params;
		const customer = await this.customerService.getCustomerById(id);
		if (!customer) {
			return reply.status(404).send({ message: 'Customer not found' });
		}
		return reply.send(customer);
	}

	async updateCustomer(
		req: FastifyRequest<{ Params: { id: string }; Body: UpdateCustomerInput }>,
		reply: FastifyReply,
	) {
		const { id } = req.params;
		const updatedCustomer = await this.customerService.updateCustomer(
			id,
			req.body,
		);
		return reply.send(updatedCustomer);
	}

	async deleteCustomer(
		req: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		const { id } = req.params;
		await this.customerService.deleteCustomer(id);
		return reply.status(204).send(); // 204 No Content
	}
}
