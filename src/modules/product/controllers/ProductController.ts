import { FastifyReply, FastifyRequest } from 'fastify';
import { productService } from '../services/ProductService';
import {
	ProductCreateInput,
	ProductUpdateInput,
} from '../interfaces/ProductInterface';

export const productController = {
	create: async (request: FastifyRequest, reply: FastifyReply) => {
		const { name, description, price, available, entrepreneurId } =
			request.body as ProductCreateInput;
		try {
			const newProduct = await productService.createProduct({
				name,
				description,
				price,
				available,
				entrepreneurId,
			});
			return reply.status(201).send(newProduct);
		} catch (error) {
			return reply
				.status(500)
				.send({ message: 'Error creating product', error });
		}
	},

	getAll: async (request: FastifyRequest, reply: FastifyReply) => {
		const { entrepreneurId } = request.query as { entrepreneurId: string };
		try {
			const products = await productService.getProducts(entrepreneurId);
			return reply.status(200).send(products);
		} catch (error) {
			return reply
				.status(500)
				.send({ message: 'Error retrieving products', error });
		}
	},

	update: async (request: FastifyRequest, reply: FastifyReply) => {
		const { id } = request.params as { id: string };
		const { name, description, price, available } =
			request.body as ProductUpdateInput;
		try {
			const updatedProduct = await productService.updateProduct(id, {
				name,
				description,
				price,
				available,
			});
			return reply.status(200).send(updatedProduct);
		} catch (error) {
			return reply
				.status(500)
				.send({ message: 'Error updating product', error });
		}
	},

	delete: async (request: FastifyRequest, reply: FastifyReply) => {
		const { id } = request.params as { id: string };
		try {
			await productService.deleteProduct(id);
			return reply.status(204).send();
		} catch (error) {
			return reply
				.status(500)
				.send({ message: 'Error deleting product', error });
		}
	},
};
