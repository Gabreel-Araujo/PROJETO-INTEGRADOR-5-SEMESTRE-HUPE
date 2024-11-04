import { FastifyInstance } from 'fastify';
import { CustomerController } from '../controller/CustomerController';
import { CustomerService } from '../services/CustomerService';
import { CustomerRepository } from '../repositories/CustomerRepository';

export async function customerRoutes(app: FastifyInstance) {
	const customerRepository = new CustomerRepository();
	const customerService = new CustomerService(customerRepository);
	const customerController = new CustomerController(customerService);

	app.post(
		'/customers',
		customerController.createCustomer.bind(customerController),
	);
	app.get(
		'/customers',
		customerController.getAllCustomers.bind(customerController),
	);
	app.get(
		'/customers/:id',
		customerController.getCustomerById.bind(customerController),
	);
	app.put(
		'/customers/:id',
		customerController.updateCustomer.bind(customerController),
	);
	app.delete(
		'/customers/:id',
		customerController.deleteCustomer.bind(customerController),
	);
}
