import { FastifyReply } from 'fastify';
import { RegisterRequest } from './authTypes';
import { emailExists, usernameExists, addUser } from '../users/usersService';

export const register = async (req: RegisterRequest, reply: FastifyReply) => {
  const { username, 2email } = req.body;
  if ((await usernameExists(username)) || (await emailExists(email))) {
    reply.status(409).send({
      statusCode: 409,
      message: 'Username or e-mail already exists.',
    });
  }
  const createdUser = await addUser(req.body);
  if (createdUser) {
    reply.status(201).send({
      message: 'User successfully created.',
    });
  }
};
