import { FastifyRequest } from 'fastify';

export type AddRecipeRequest = FastifyRequest<{
  Body: {
    title: string;
    description: string;
    ingredients: {
      name: string;
      amount: string;
    }[];
  };
  user: {
    uuid: string;
  };
}>;
