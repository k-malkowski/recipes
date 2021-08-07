import { Prisma, PrismaClient, Recipe, Ingredient } from '@prisma/client';

const prisma = new PrismaClient();

type RecipeWithIngredients = {
  id: number;
  title: string;
  description: string;
  ingredients: {
    id: number;
    amount: string;
    name: string;
  }[];
};

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
  async findManyWithIngredients(
    userUuid: string
  ): Promise<RecipeWithIngredients[]> {
    return prisma.recipe.findMany({
      where: {
        userUuid,
      },
      select: {
        id: true,
        title: true,
        description: true,
        ingredients: {
          select: {
            id: true,
            amount: true,
            name: true,
          },
        },
      },
    });
  },
  async findMany(
    userUuid: string
  ): Promise<{ id: number; title: string; description: string }[]> {
    return prisma.recipe.findMany({
      where: {
        userUuid,
      },
      select: {
        id: true,
        title: true,
        description: true,
      },
    });
  },
};
