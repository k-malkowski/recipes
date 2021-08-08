import fastify from 'fastify';
import { plugins } from './plugins';
import { routes } from './routes';

export const build = (opts = {}) => {
  const app = fastify(opts);
  app.register(plugins);
  app.register(routes);
  return app;
};
