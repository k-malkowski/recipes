import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { addUser } from './usersService';
import { addUserOptions } from './usersSchema';

export const usersRoute: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _,
  done
) => {
  fastify.post('/', addUserOptions, addUser);

  done();
};
