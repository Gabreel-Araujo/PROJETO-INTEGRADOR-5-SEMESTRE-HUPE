import { FastifyInstance } from 'fastify';
import { CustomerController } from '../controller/CustomerController'; // Certifique-se de que o caminho está correto
import { CustomerService } from '../services/CustomerService'; // Certifique-se de que o caminho está correto
import { CustomerRepository } from '../repositories/CustomerRepository'; // Certifique-se de que o caminho está correto

export async function customerRoutes(app: FastifyInstance) {
	const customerRepository = new CustomerRepository(); // Cria uma instância do CustomerRepository
	const customerService = new CustomerService(customerRepository); // Passa o CustomerRepository para o CustomerService
	const customerController = new CustomerController(customerService); // Passa o CustomerService para o CustomerController

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
