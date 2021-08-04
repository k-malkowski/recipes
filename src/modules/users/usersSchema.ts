export const addUserOptions = {
  schema: {
    description: 'Add user',
    summary: 'add new user',
    tags: ['users'],
    body: {
      type: 'object',
      required: ['username', 'password', 'email'],
      properties: {
        username: {
          type: 'string',
          minLength: 3,
          maxLength: 30,
          example: 'johndoe',
        },
        password: {
          type: 'string',
          minLength: 8,
          maxLength: 32,
          example: 'qwerqwer',
        },
        email: { type: 'string', format: 'email', example: 'john@doe.com' },
      },
    },
    response: {
      201: {
        description: 'Successful response',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      400: {
        description: 'Bad request: validation error',
        type: 'object',
        properties: {
          statusCode: { type: 'number' },
          message: { type: 'string' },
        },
      },
      409: {
        description: 'Bad request: validation error',
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
