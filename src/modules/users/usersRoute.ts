import { DoneFuncWithErrOrRes, FastifyInstance } from 'fastify';
import { addUser } from './usersService';
import { addUserOptions } from './usersSchema';

export const usersRoute = (fastify: FastifyInstance, _: unknown, done: DoneFuncWithErrOrRes) => {
  fastify.post('/', addUserOptions, addUser);

  done();
};
