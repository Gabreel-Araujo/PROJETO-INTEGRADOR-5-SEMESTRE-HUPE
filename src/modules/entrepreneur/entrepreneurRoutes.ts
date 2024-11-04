import { FastifyPluginAsync } from 'fastify';
import { createEntrepreneur } from './entrepreneurController';

const entrepreneurRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.post('/', createEntrepreneur);
};

export default entrepreneurRoutes;
