// src/modules/menu/routes/menuRoutes.ts
import { FastifyInstance } from 'fastify';
import MenuController from '../controllers/MenuController';

export async function menuRoutes(fastify: FastifyInstance) {
	fastify.post('/menu', MenuController.createMenu);
	fastify.get('/menu', MenuController.getAllMenus);
	fastify.get('/:id', MenuController.getMenuById);
	fastify.put('/:id', MenuController.updateMenu);
	fastify.delete('/:id', MenuController.deleteMenu);
}
