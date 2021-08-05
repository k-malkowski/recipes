import fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import fastifyCors from 'fastify-cors';
import { authRoute } from './modules/auth/authRoute';

export const build = (opts = {}) => {
  const app = fastify(opts);
  app.register(fastifySwagger, {
    routePrefix: '/swagger',
    swagger: {
      info: {
        title: 'Recipes',
        description: 'Documentation of recipes API',
        version: '0.1.0',
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    exposeRoute: true,
  });
  app.register(fastifyCors, { origin: false });
  app.register(authRoute, { prefix: '/api/v1/auth' });
  return app;
};
