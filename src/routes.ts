import { FastifyPluginCallback } from 'fastify';
import { authRoute } from './modules/auth/authRoute';
import { recipesRoute } from './modules/recipes/recipesRoute';

export const routes: FastifyPluginCallback = (fastify, _, done) => {
  fastify.register(authRoute, { prefix: '/v1/auth' });
  fastify.register(recipesRoute, { prefix: '/v1/recipes' });
  done();
};
