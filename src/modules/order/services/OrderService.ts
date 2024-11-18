import { OrderRepository } from '../repositories/OrderRepository';
import { OrderItem } from '../interfaces/OrderInterface';

export class OrderService {
	private orderRepository = new OrderRepository();

	async createOrder(
		customerId: string,
		entrepreneurId: string,
		items: OrderItem[],
	) {
		return this.orderRepository.createOrder(customerId, entrepreneurId, items);
	}
}
