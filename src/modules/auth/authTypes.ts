import { FastifyRequest } from 'fastify';

export type RegisterRequest = FastifyRequest<{
  Body: {
    username: string;
    email: string;
    password: string;
  };
}>;

export type LoginRequest = FastifyRequest<{
  Body: {
    username: string;
    password: string;
  };
}>;
