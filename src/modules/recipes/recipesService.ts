import { FastifyReply } from 'fastify';
import { AddRecipeRequest, GetRecipesRequest } from './recipesTypes';
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

export const findRecipes = async (
  req: GetRecipesRequest,
  reply: FastifyReply
) => {
  const { user } = req;
  if (user) {
    if (req.query.includeIngredients) {
      reply.status(200).send({
        // @ts-ignore
        results: await recipesRepository.findManyWithIngredients(user.uuid),
      });
    } else {
      reply
        .status(200)
        // @ts-ignore
        .send({ results: await recipesRepository.findMany(user.uuid) });
    }
  }
};
