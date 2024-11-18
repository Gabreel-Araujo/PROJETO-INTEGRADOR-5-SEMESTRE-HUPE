import {
	ProductCreateInput,
	ProductUpdateInput,
} from '../interfaces/ProductInterface';
import { productRepository } from '../repositories/ProductRepository';
import { Product } from '@prisma/client';

export const productService = {
	createProduct: async (data: ProductCreateInput): Promise<Product> => {
		return productRepository.create(data);
	},

	getProducts: async (entrepreneurId: string): Promise<Product[]> => {
		return productRepository.findMany(entrepreneurId);
	},

	updateProduct: async (
		id: string,
		data: ProductUpdateInput,
	): Promise<Product> => {
		return productRepository.update(id, data);
	},

	deleteProduct: async (id: string): Promise<void> => {
		await productRepository.delete(id);
	},

	getProductById: async (id: string): Promise<Product | null> => {
		return productRepository.findUnique(id);
	},
};
