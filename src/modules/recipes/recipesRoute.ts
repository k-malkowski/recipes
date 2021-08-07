import { FastifyPluginCallback } from 'fastify';
import { addRecipe, findRecipes } from './recipesService';
import { addRecipeOptions, getRecipesOptions } from './recipesSchema';

export const recipesRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.post(
    '/',
    { ...addRecipeOptions, preValidation: [fastify.authenticate] },
    addRecipe
  );
  fastify.get('/', { ...getRecipesOptions, preValidation: [fastify.authenticate] }, findRecipes);
  done();
};
