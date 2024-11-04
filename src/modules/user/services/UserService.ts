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
}
