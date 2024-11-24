import { PrismaClient } from '@prisma/client';
import { User } from '../interfaces/UserInterface';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

export class UserRepository {
	async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
		const hashedPassword = await hash(data.password, 10);
		
		return await prisma.user.create({
			data: {
				...data,
				password: hashedPassword
			},
		});
	}

	async getAllUsers(): Promise<User[]> {
		return await prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				role: true,
				customerId: true,
				createdAt: true,
				updatedAt: true,
				password: false
			}
		});
	}

	async getUserById(id: string): Promise<User | null> {
		return await prisma.user.findUnique({
			where: { id },
		});
	}

	async findUserByEmail(email: string): Promise<User | null> {
		return await prisma.user.findUnique({
			where: { email },
		});
	}

	async updateUser(
		id: string,
		data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>,
	): Promise<User> {
		// If password is being updated, hash it
		if (data.password) {
			data.password = await hash(data.password, 10);
		}

		return await prisma.user.update({
			where: { id },
			data,
		});
	}

	async deleteUser(id: string): Promise<User> {
		return await prisma.user.delete({
			where: { id },
		});
	}
}
