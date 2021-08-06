import { FastifyReply } from 'fastify';
import * as bcrypt from 'bcrypt';
import { LoginRequest, RegisterRequest } from './authTypes';
import {
  emailExists,
  usernameExists,
  addUser,
  findUser,
} from '../users/usersService';

export const register = async (req: RegisterRequest, reply: FastifyReply) => {
  const { username, email } = req.body;
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

export const login = async (req: LoginRequest, reply: FastifyReply) => {
  const { username, password } = req.body;
  const foundUser = await findUser(username);
  if (!foundUser) {
    reply.status(401).send({
      statusCode: 401,
      message: 'Wrong username or password.',
    });
  }
  if (foundUser && bcrypt.compareSync(password, foundUser.password)) {
    const accessToken = await reply.jwtSign({ uuid: foundUser.uuid });
    reply.status(200).send({
      accessToken,
    });
  }
};
