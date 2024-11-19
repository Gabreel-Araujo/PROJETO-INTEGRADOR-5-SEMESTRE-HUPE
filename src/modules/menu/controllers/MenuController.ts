import { FastifyReply, FastifyRequest } from 'fastify';
import MenuService from '../services/MenuService';

// Definindo as interfaces para as requisições
interface CreateMenuRequest {
	name: string;
	entrepreneurId: string;
}

interface UpdateMenuRequest {
	name: string;
}

class MenuController {
	// Criar um menu
	async createMenu(
		request: FastifyRequest<{ Body: CreateMenuRequest }>,
		reply: FastifyReply,
	) {
		const { name, entrepreneurId } = request.body;
		const menu = await MenuService.createMenu({ name, entrepreneurId });
		reply.status(201).send(menu);
	}

	// Obter todos os menus
	async getAllMenus(request: FastifyRequest, reply: FastifyReply) {
		const menus = await MenuService.getAllMenus();
		reply.send(menus);
	}

	// Obter um menu por ID
	async getMenuById(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		const { id } = request.params;
		const menu = await MenuService.getMenuById(id);
		if (!menu) {
			return reply.status(404).send({ message: 'Menu não encontrado' });
		}
		reply.send(menu);
	}

	// Atualizar um menu
	async updateMenu(
		request: FastifyRequest<{
			Params: { id: string };
			Body: UpdateMenuRequest;
		}>,
		reply: FastifyReply,
	) {
		const { id } = request.params;
		const { name } = request.body;
		const updatedMenu = await MenuService.updateMenu(id, { name });
		reply.send(updatedMenu);
	}

	// Deletar um menu
	async deleteMenu(
		request: FastifyRequest<{ Params: { id: string } }>,
		reply: FastifyReply,
	) {
		const { id } = request.params;
		await MenuService.deleteMenu(id);
		reply.status(204).send();
	}
}

export default new MenuController();
