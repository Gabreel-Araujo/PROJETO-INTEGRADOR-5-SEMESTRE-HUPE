import { FastifyInstance } from 'fastify';
import { productController } from '../controllers/ProductController';

export const productRoutes = async (fastify: FastifyInstance) => {
	fastify.post('/products', productController.create);
	fastify.get('/products', productController.getAll);
	fastify.put('/products/:id', productController.update);
	fastify.delete('/products/:id', productController.delete);
};
