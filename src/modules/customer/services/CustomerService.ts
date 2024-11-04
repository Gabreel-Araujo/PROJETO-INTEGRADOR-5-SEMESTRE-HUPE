// services/CustomerService.ts
import { CustomerRepository } from '../repositories/CustomerRepository';

export class CustomerService {
	constructor(private customerRepository: CustomerRepository) {}

	async createCustomer(userId: string, orderIds?: string[]) {
		return await this.customerRepository.create({ userId, orders: orderIds });
	}

	async getAllCustomers() {
		return await this.customerRepository.findAll();
	}

	async getCustomerById(id: string) {
		return await this.customerRepository.findById(id);
	}

	async updateCustomer(
		id: string,
		data: { userId?: string; orders?: string[] },
	) {
		return await this.customerRepository.update(id, data);
	}

	async deleteCustomer(id: string) {
		return await this.customerRepository.delete(id);
	}
}
