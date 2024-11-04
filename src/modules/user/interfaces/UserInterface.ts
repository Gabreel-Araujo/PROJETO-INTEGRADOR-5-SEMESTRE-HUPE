export interface User {
	id: string;
	name: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
	password: string;
	role: UserRole;
	customerId?: string | null;
}

export type UserRole = 'ADMIN' | 'ENTREPRENEUR' | 'CUSTOMER';
