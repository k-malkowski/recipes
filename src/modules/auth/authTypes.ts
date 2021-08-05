import { FastifyRequest } from 'fastify';

export type RegisterRequest = FastifyRequest<{
  Body: {
    username: string;
    email: string;
    password: string;
  };
}>;
