import fp from 'fastify-plugin';
import fastifySwagger from 'fastify-swagger';
import fastifyCors from 'fastify-cors';
import { authPlugin } from './plugins/auth/authPlugin';

export const plugins = fp(async (fastify) => {
  fastify.register(fastifySwagger, {
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
  fastify.register(fastifyCors, { origin: false });
  fastify.register(authPlugin);
});
