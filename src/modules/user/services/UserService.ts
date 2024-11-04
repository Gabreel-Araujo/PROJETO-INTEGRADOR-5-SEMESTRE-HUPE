// src/modules/user/services/UserService.ts
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../interfaces/UserInterface';

export class UserService {
	private userRepository = new UserRepository();

	async registerUser(
		data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
	): Promise<User> {
		const existingUser = await this.userRepository.findUserByEmail(data.email);
		if (existingUser) {
			throw new Error('Email already in use');
		}
		const newUser = await this.userRepository.createUser(data);
		return newUser;
	}

	async getAllUsers(): Promise<User[]> {
		return await this.userRepository.getAllUsers();
	}

	async getUserById(id: string): Promise<User | null> {
		const user = await this.userRepository.getUserById(id);
		if (!user) {
			throw new Error('User ID Not found ');
		}
		return user;
	}

	async updateUser(
		id: string,
		data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>,
	): Promise<User> {
		const existingUser = await this.userRepository.getUserById(id);
		if (!existingUser) {
			throw new Error('User not found');
		}

		return await this.userRepository.updateUser(id, data);
	}
}
