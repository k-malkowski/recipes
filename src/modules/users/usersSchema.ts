export const addUserOptions = {
  schema: {
    body: {
      type: 'object',
      required: ['username', 'password', 'email'],
      properties: {
        username: { type: 'string', minLength: 3, maxLength: 30 },
        password: { type: 'string', minLength: 8, maxLength: 32 },
        email: { type: 'string', format: 'email' },
      },
    },
  },
};
