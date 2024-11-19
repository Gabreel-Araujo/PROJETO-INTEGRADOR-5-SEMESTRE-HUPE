import prisma from '../../../../prisma/client'; // Certifique-se de que a importação está correta

class MenuService {
	// Criar um menu
	async createMenu(menuData: { name: string; entrepreneurId: string }) {
		const { name, entrepreneurId } = menuData;

		// Cria o menu
		const menu = await prisma.menu.create({
			data: {
				name,
				entrepreneurId,
			},
		});

		// Buscar produtos associados ao 'entrepreneurId'
		const products = await prisma.product.findMany({
			where: {
				entrepreneurId: entrepreneurId,
			},
		});

		// Se houverem produtos, associe-os ao menu
		if (products.length > 0) {
			// Conectar os produtos ao menu recém-criado
			await prisma.menu.update({
				where: { id: menu.id },
				data: {
					products: {
						connect: products.map((product) => ({ id: product.id })),
					},
				},
			});
		}

		// Retorna o menu com os produtos associados
		return prisma.menu.findUnique({
			where: { id: menu.id },
			include: { products: true }, // Incluir produtos agora
		});
	}

	// Obter todos os menus
	async getAllMenus() {
		return await prisma.menu.findMany({
			include: {
				products: true, // Incluir produtos associados aos menus
			},
		});
	}

	// Obter um menu por ID
	async getMenuById(id: string) {
		return await prisma.menu.findUnique({
			where: { id },
			include: { products: true }, // Incluir produtos ao buscar o menu
		});
	}

	// Atualizar um menu
	async updateMenu(id: string, data: { name: string }) {
		return await prisma.menu.update({
			where: { id },
			data,
			include: {
				products: true, // Incluir produtos ao atualizar
			},
		});
	}

	// Deletar um menu
	async deleteMenu(id: string) {
		await prisma.menu.delete({
			where: { id },
		});
	}
}

export default new MenuService();
