import { PrismaClient, OrderStatus } from '@prisma/client';
import { OrderItem } from '../interfaces/OrderInterface';

export class OrderRepository {
	private prisma = new PrismaClient();

	// Método para criar o pedido com os itens
	async createOrder(
		customerId: string,
		entrepreneurId: string,
		items: OrderItem[],
	) {
		const totalPrice = await this.calculateTotalPrice(items);

		// Criando o pedido
		const order = await this.prisma.order.create({
			data: {
				customerId,
				entrepreneurId,
				totalPrice,
				status: OrderStatus.PENDING, // Definindo o status como PENDING
				orderItems: {
					create: items.map((item) => ({
						productId: item.productId,
						quantity: item.quantity,
						price: item.price,
					})),
				},
			},
			include: {
				orderItems: true, // Incluindo os itens no retorno
			},
		});

		return order;
	}

	// Método para calcular o preço total do pedido com base nos itens
	private async calculateTotalPrice(items: OrderItem[]) {
		let total = 0;
		for (const item of items) {
			const product = await this.prisma.product.findUnique({
				where: { id: item.productId },
			});
			if (product) {
				total += product.price * item.quantity;
			}
		}
		return total;
	}
}
