// services/EntrepreneurService.ts
import { EntrepreneurRepository } from '../repositories/EntrepreneurRepository';
import {
	CreateEntrepreneurInput,
	UpdateEntrepreneurInput,
} from '../interfaces/EntrepreneurInterface';

export class EntrepreneurService {
	private entrepreneurRepository = new EntrepreneurRepository();

	async createEntrepreneur(data: CreateEntrepreneurInput) {
		// Adicione validações ou lógica de negócio aqui, se necessário
		return await this.entrepreneurRepository.createEntrepreneur(data);
	}

	async getAllEntrepreneurs() {
		return await this.entrepreneurRepository.getAllEntrepreneurs();
	}

	async getEntrepreneurById(id: string) {
		const entrepreneur =
			await this.entrepreneurRepository.getEntrepreneurById(id);
		if (!entrepreneur) {
			throw new Error('Entrepreneur not found');
		}
		return entrepreneur;
	}

	async updateEntrepreneur(id: string, data: UpdateEntrepreneurInput) {
		const updatedEntrepreneur =
			await this.entrepreneurRepository.updateEntrepreneur(id, data);
		if (!updatedEntrepreneur) {
			throw new Error('Entrepreneur not found');
		}
		return updatedEntrepreneur;
	}

	async deleteEntrepreneur(id: string) {
		const deletedEntrepreneur =
			await this.entrepreneurRepository.deleteEntrepreneur(id);
		if (!deletedEntrepreneur) {
			throw new Error('Entrepreneur not found');
		}
		return deletedEntrepreneur;
	}
}
