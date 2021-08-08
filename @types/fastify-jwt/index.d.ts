import fastifyJWT from 'fastify-jwt';

declare module 'fastify-jwt' {
  export interface FastifyJWT {
    payload: { uuid: string };
    user: { uuid: string };
  }
}
