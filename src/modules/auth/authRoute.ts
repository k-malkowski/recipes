import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { registerOptions } from './authSchema';
import { register } from './authService';

export const authRoute: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _,
  done
) => {
  fastify.post('/register', registerOptions, register);

  done();
};
