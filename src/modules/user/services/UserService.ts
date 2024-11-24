import { UserRepository } from '../repositories/UserRepository';
import { User } from '../interfaces/UserInterface';
import { compare } from 'bcrypt';
import { app } from '../../../app';

export class UserService {
	private userRepository = new UserRepository();

	async login(email: string, password: string) {
		const user = await this.userRepository.findUserByEmail(email);
		if (!user) {
			throw new Error('Invalid credentials');
		}

		const passwordMatch = await compare(password, user.password);
		if (!passwordMatch) {
			throw new Error('Invalid credentials');
		}

		// Generate JWT token
		const token = app.jwt.sign(
			{ 
				id: user.id,
				email: user.email,
				role: user.role
			},
			{ expiresIn: '1d' }
		);

		// Remove password from user object
		const { password: _, ...userWithoutPassword } = user;

		return {
			user: userWithoutPassword,
			token
		};
	}

	async registerUser(
		data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
	): Promise<{ user: Omit<User, 'password'>, token: string }> {
		const existingUser = await this.userRepository.findUserByEmail(data.email);
		if (existingUser) {
			throw new Error('Email already in use');
		}

		const newUser = await this.userRepository.createUser(data);

		// Generate JWT token
		const token = app.jwt.sign(
			{ 
				id: newUser.id,
				email: newUser.email,
				role: newUser.role
			},
			{ expiresIn: '1d' }
		);

		// Remove password from user object
		const { password: _, ...userWithoutPassword } = newUser;

		return {
			user: userWithoutPassword,
			token
		};
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

	async deleteUser(id: string): Promise<User> {
		const existingUser = await this.userRepository.getUserById(id);
		if (!existingUser) {
			throw new Error('User not found');
		}

		return await this.userRepository.deleteUser(id);
	}
}
