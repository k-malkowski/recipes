import fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import fastifyCors from 'fastify-cors';
import { authRoute } from './modules/auth/authRoute';
import { recipesRoute } from './modules/recipes/recipesRoute';
import { authPlugin } from './plugins/auth/authPlugin';

export const build = (opts = {}) => {
  const app = fastify(opts);
  app.register(fastifySwagger, {
    routePrefix: '/swagger',
    exposeRoute: true,
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
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
        },
      },
    },
    uiConfig: {
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });
  app.register(fastifyCors, { origin: false });
  app.register(authPlugin);
  app.register(authRoute, { prefix: '/api/v1/auth' });
  app.register(recipesRoute, { prefix: '/api/v1/recipes' });
  return app;
};
