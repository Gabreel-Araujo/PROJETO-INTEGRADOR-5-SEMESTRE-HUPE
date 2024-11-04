// repositories/CustomerRepository.ts
import { PrismaClient, Customer } from '@prisma/client';

const prisma = new PrismaClient();

export class CustomerRepository {
	async create(data: { userId: string; orders?: string[] }): Promise<Customer> {
		return await prisma.customer.create({
			data: {
				user: { connect: { id: data.userId } },
				orders: {
					connect: data.orders?.map((id) => ({ id })) || [], // Conecta pedidos existentes
				},
			},
			include: {
				user: true,
				orders: true,
			},
		});
	}

	async findAll(): Promise<Customer[]> {
		return await prisma.customer.findMany({
			include: {
				user: true,
				orders: true,
			},
		});
	}

	async findById(id: string): Promise<Customer | null> {
		return await prisma.customer.findUnique({
			where: { id },
			include: {
				user: true,
				orders: true,
			},
		});
	}

	async update(
		id: string,
		data: { userId?: string; orders?: string[] },
	): Promise<Customer> {
		return await prisma.customer.update({
			where: { id },
			data: {
				user: data.userId ? { connect: { id: data.userId } } : undefined,
				orders: {
					connect: data.orders?.map((id) => ({ id })) || [],
				},
			},
			include: {
				user: true,
				orders: true,
			},
		});
	}

	async delete(id: string): Promise<Customer> {
		return await prisma.customer.delete({
			where: { id },
			include: {
				user: true,
				orders: true,
			},
		});
	}
}
