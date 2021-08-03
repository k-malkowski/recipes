import { FastifyReply, FastifyRequest } from 'fastify';

export const addUser = async (req: FastifyRequest, reply: FastifyReply) => {
  reply.send({ hello: 'world' });
};
