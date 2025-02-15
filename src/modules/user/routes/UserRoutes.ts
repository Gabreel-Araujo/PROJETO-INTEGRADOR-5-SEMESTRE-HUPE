import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/UserController';

export async function appRoutes(app: FastifyInstance) {
	const userController = new UserController();
	app.post('/users/login', userController.login.bind(userController));
	app.post('/users', userController.register.bind(userController));
	app.get('/users', userController.getAll.bind(userController));
	app.get('/users/:id', userController.getById.bind(userController));
	app.put('/users/:id', userController.update.bind(userController));
	app.delete('/users/:id', userController.delete.bind(userController));
}
