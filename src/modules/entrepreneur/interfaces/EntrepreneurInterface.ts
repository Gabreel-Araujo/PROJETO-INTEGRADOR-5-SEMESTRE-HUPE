// interfaces/EntrepreneurInterface.ts
export interface GetEntrepreneurByIdParams {
	id: string;
}

export interface CreateEntrepreneurInput {
	userId: string; // ID do usuário associado ao empreendedor
}

export interface UpdateEntrepreneurInput {
	userId?: string; // ID do usuário, opcional para atualização
}
