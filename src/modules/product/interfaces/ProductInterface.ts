export interface ProductCreateInput {
	name: string;
	description?: string;
	price: number;
	available: boolean;
	entrepreneurId: string;
}

export interface ProductUpdateInput {
	name?: string;
	description?: string;
	price?: number;
	available?: boolean;
}

export interface Product extends ProductCreateInput {
	id: string;
	createdAt: Date;
	updatedAt: Date;
}
