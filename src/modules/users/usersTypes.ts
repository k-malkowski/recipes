import { FastifyRequest } from 'fastify';

export type AddUserRequest = FastifyRequest<{
  Body: {
    username: string;
    email: string;
    password: string;
  };
}>;
