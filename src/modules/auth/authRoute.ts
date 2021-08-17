import { FastifyPluginCallback } from 'fastify';
import { activateOptions, loginOptions, registerOptions } from './authSchema';
import { login, register, activate } from './authService';

export const authRoute: FastifyPluginCallback = (fastify, _, done) => {
  fastify.post('/register', registerOptions, register(fastify));
  fastify.post('/login', loginOptions, login);
  fastify.get('/activate/:uuid', activateOptions, activate);
  done();
};
