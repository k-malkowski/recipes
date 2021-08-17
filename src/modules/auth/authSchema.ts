export const registerOptions = {
  schema: {
    description: 'Add user',
    summary: 'add new user',
    tags: ['auth'],
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
        description: 'Conflict',
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

export const loginOptions = {
  schema: {
    description: 'Login user',
    summary: 'login',
    tags: ['auth'],
    body: {
      type: 'object',
      required: ['username', 'password'],
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
      },
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          accessToken: { type: 'string' },
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
      401: {
        description: 'Unauthorized: wrong username or password',
        type: 'object',
        properties: {
          message: { type: 'string' },
          error: { type: 'string' },
          statusCode: { type: 'number' },
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

export const activateOptions = {
  schema: {
    description: 'Activate user',
    summary: 'activate user',
    tags: ['auth'],
    params: {
      type: 'object',
      properties: {
        uuid: {
          type: 'string',
          description: 'activation uuid',
        },
      },
    },
    response: {
      200: {
        description: 'Successful response',
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
      410: {
        description: 'Activation link expired',
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
