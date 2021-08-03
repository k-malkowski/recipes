import fastify from 'fastify';
import { usersRoute } from './modules/users/usersRoute';

export const build = (opts = {}) => {
  const app = fastify(opts);
  app.register(usersRoute, { prefix: '/api/v1/users' })
  return app;
};
