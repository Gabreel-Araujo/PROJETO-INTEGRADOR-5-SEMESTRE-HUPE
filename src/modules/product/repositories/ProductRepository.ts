import { PrismaClient } from '@prisma/client';
import {
	ProductCreateInput,
	ProductUpdateInput,
} from '../interfaces/ProductInterface';

const prisma = new PrismaClient();

export const productRepository = {
	create: async (data: ProductCreateInput) => {
		return prisma.product.create({
			data,
		});
	},

	findMany: async (entrepreneurId: string) => {
		return prisma.product.findMany({
			where: {
				entrepreneurId,
			},
		});
	},

	update: async (id: string, data: ProductUpdateInput) => {
		return prisma.product.update({
			where: { id },
			data,
		});
	},

	delete: async (id: string) => {
		return prisma.product.delete({
			where: { id },
		});
	},

	findUnique: async (id: string) => {
		return prisma.product.findUnique({
			where: { id },
		});
	},
};
