import { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { loginOptions, registerOptions } from './authSchema';
import { login, register } from './authService';

export const authRoute: FastifyPluginCallback = (
  fastify: FastifyInstance,
  _,
  done
) => {
  fastify.post('/register', registerOptions, register);
  fastify.post('/login', loginOptions, login);

  done();
};
