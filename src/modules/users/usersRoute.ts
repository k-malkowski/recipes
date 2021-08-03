import { addUser } from './usersService';
import { addUserSchema } from './usersSchema';

export const usersRoute = (fastify, _, done) => {
  fastify.post('/', addUserSchema, addUser);

  done();
};
