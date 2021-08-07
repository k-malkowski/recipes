import { Prisma, PrismaClient, Recipe, Ingredient } from '@prisma/client';

const prisma = new PrismaClient();

export default {
  async add(
    recipeData: Prisma.RecipeCreateInput,
    ingredients: { name: string; amount: string }[]
  ): Promise<Recipe & { ingredients: Ingredient[] }> {
    return prisma.recipe.create({
      data: {
        ...recipeData,
        ingredients: {
          createMany: {
            data: ingredients,
          },
        },
      },
      include: {
        ingredients: true,
      },
    });
  },
};
