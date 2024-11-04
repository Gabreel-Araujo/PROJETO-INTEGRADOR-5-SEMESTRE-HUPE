// interface/CustomerInterface.ts
export interface CreateCustomerInput {
	userId: string;
	orders?: string[]; // IDs dos pedidos se você desejar conectar pedidos existentes
}

export interface UpdateCustomerInput {
	userId?: string;
	orders?: string[];
}
