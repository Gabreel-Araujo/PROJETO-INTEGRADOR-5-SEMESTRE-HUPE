// src/modules/menu/repositories/MenuRepository.ts
import prisma from '../../../../prisma/client';
import { Menu } from '@prisma/client';

class MenuRepository {
	// Criar um menu
	async createMenu(
		menuData: Omit<Menu, 'id' | 'createdAt' | 'updatedAt'>,
	): Promise<Menu> {
		return await prisma.menu.create({
			data: menuData,
		});
	}

	// Obter todos os menus
	async getAllMenus(): Promise<Menu[]> {
		return await prisma.menu.findMany();
	}

	// Obter um menu por ID
	async getMenuById(id: string): Promise<Menu | null> {
		return await prisma.menu.findUnique({
			where: { id },
		});
	}

	// Atualizar um menu
	async updateMenu(id: string, data: Partial<Menu>): Promise<Menu> {
		return await prisma.menu.update({
			where: { id },
			data,
		});
	}

	// Deletar um menu
	async deleteMenu(id: string): Promise<Menu> {
		return await prisma.menu.delete({
			where: { id },
		});
	}
}

export default new MenuRepository();
