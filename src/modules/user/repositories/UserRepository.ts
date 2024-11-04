import { prisma } from '../../../lib/prisma';
import { User } from '../interfaces/UserInterface';

export class UserRepository {
	async findUserByEmail(email: string): Promise<User | null> {
		return await prisma.user.findUnique({
			where: { email },
		});
	}

	async createUser(
		data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
	): Promise<User> {
		return await prisma.user.create({
			data,
		});
	}

	async getAllUsers(): Promise<User[]> {
		return await prisma.user.findMany();
	}

	async getUserById(id: string): Promise<User | null> {
		return await prisma.user.findUnique({
			where: { id },
		});
	}

	async updateUser(
		id: string,
		data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>,
	): Promise<User> {
		return await prisma.user.update({
			where: { id },
			data,
		});
	}
}
