import { FastifyReply } from 'fastify';
import * as bcrypt from 'bcrypt';
import usersDAL from './usersDAL';
import { AddUserRequest } from './usersTypes';

export const addUser = async (req: AddUserRequest, reply: FastifyReply) => {
  const { username, password, email } = req.body;
  if (
    (await usersDAL.findOne({ username })) ||
    (await usersDAL.findOne({ email }))
  ) {
    reply.status(409).send({
      statusCode: 409,
      message: 'Username or e-mail already exists.',
    });
  }
  const createdUser = await usersDAL.addUser({
    username,
    email,
    password: await bcrypt.hash(password, 10),
  });
  if (createdUser) {
    reply.status(201).send({
      message: 'User successfully created.',
    });
  }
};
