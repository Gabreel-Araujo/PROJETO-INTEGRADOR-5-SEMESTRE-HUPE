// repositories/EntrepreneurRepository.ts
import { PrismaClient } from '@prisma/client';
import {
	CreateEntrepreneurInput,
	UpdateEntrepreneurInput,
} from '../interfaces/EntrepreneurInterface';

const prisma = new PrismaClient();

export class EntrepreneurRepository {
	async createEntrepreneur(data: CreateEntrepreneurInput) {
		return await prisma.entrepreneur.create({
			data,
		});
	}

	async getAllEntrepreneurs() {
		return await prisma.entrepreneur.findMany({
			include: {
				user: true, // Inclui os dados do usuário relacionado
			},
		});
	}

	async getEntrepreneurById(id: string) {
		return await prisma.entrepreneur.findUnique({
			where: { id },
			include: {
				user: true, // Inclui os dados do usuário relacionado
			},
		});
	}

	async updateEntrepreneur(id: string, data: UpdateEntrepreneurInput) {
		return await prisma.entrepreneur.update({
			where: { id },
			data,
		});
	}

	async deleteEntrepreneur(id: string) {
		return await prisma.entrepreneur.delete({
			where: { id },
		});
	}
}
