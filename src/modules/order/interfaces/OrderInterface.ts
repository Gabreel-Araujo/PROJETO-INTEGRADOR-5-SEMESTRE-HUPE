export interface OrderItem {
	productId: string;
	quantity: number;
	price: number;
}

export interface CreateOrderBody {
	customerId: string;
	entrepreneurId: string;
	items: OrderItem[];
}
