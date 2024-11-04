import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { UserController } from '../controllers/UserController';

export async function appRoutes(app: FastifyInstance) {
	const userController = new UserController();
	app.post('/users', userController.register.bind(userController));
	app.get('/users', userController.getAll.bind(userController));
}
