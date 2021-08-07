import { FastifyPluginCallback } from 'fastify';
import { addRecipe } from './recipesService';
import { addRecipeOptions } from './recipesSchema';

export const recipesRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.post(
    '/',
    { ...addRecipeOptions, preValidation: [fastify.authenticate] },
    addRecipe
  );
  done();
};
