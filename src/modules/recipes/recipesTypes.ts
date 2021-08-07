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
}>;

export type GetRecipesRequest = FastifyRequest<{
  Querystring: {
    includeIngredients: boolean;
  };
}>;
