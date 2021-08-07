import fp from 'fastify-plugin';
import fastifyJWT from 'fastify-jwt';
import { FastifyReply, FastifyRequest } from 'fastify';

export const authPlugin = fp(async (fastify) => {
  fastify.register(fastifyJWT, {
    secret: 'supersecret',
  });

  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await request.jwtVerify();
      } catch (err) {
        reply.send(err);
      }
    }
  );
});
