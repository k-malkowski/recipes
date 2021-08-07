export const addRecipeOptions = {
  schema: {
    description: 'add recipe',
    summary: 'add recipe',
    tags: ['recipes'],
    body: {
      type: 'object',
      required: ['title', 'description'],
      properties: {
        title: {
          type: 'string',
          minLength: 2,
          maxLength: 50,
          example: 'piekna jajuwa',
        },
        description: {
          type: 'string',
          minLength: 2,
          maxLength: 300,
          example: 'piekna jajuwa na maselku, cos pieknego',
        },
        ingredients: {
          type: 'array',
          items: {
            minItems: 1,
            type: 'object',
            properties: {
              name: {
                type: 'string',
                minLength: 1,
                maxLength: 50,
                example: 'jajko',
              },
              amount: {
                type: 'string',
                minLength: 1,
                maxLength: 30,
                example: '5',
              },
            },
          },
        },
      },
    },
    security: [{ apiKey: [] }],
    response: {
      201: {
        description: 'Successful response',
        type: 'object',
        properties: {
          id: { type: 'number' },
          createdAt: { type: 'string' },
        },
      },
      400: {
        description: 'Bad request: validation error',
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          message: { type: 'string' },
          error: { type: 'string' },
        },
      },
      403: {
        description: 'Forbidden',
        type: 'object',
        properties: {
          message: { type: 'string' },
          error: { type: 'string' },
          statusCode: { type: 'number' },
        },
      },
    },
  },
};

export const getRecipesOptions = {
  schema: {
    description: 'get recipes',
    summary: 'get recipes',
    tags: ['recipes'],
    security: [{ apiKey: [] }],
    querystring: {
      type: 'object',
      required: ['includeIngredients'],
      properties: {
        includeIngredients: {
          type: 'boolean',
        },
      },
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          results: { type: 'array' },
        },
      },
      403: {
        description: 'Forbidden',
        type: 'object',
        properties: {
          message: { type: 'string' },
          error: { type: 'string' },
          statusCode: { type: 'number' },
        },
      },
    },
  },
};
