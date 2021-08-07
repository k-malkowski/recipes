import { FastifyReply } from 'fastify';
import { AddRecipeRequest } from './recipesTypes';
import recipesRepository from './recipesRepository';

export const addRecipe = async (req: AddRecipeRequest, reply: FastifyReply) => {
  const { user } = req;
  const { title, description, ingredients } = req.body;
  const recipeData = {
    user: {
      connect: {
        // @ts-ignore
        uuid: user.uuid,
      },
    },
    title,
    description,
  };
  const createdRecipe = await recipesRepository.add(recipeData, ingredients);
  if (createdRecipe) {
    reply.status(201).send({
      id: createdRecipe.id,
      createdAt: createdRecipe.createdAt,
    });
  }
};
