import { FastifyReply } from 'fastify';
import * as bcrypt from 'bcrypt';
import { ActivateRequest, LoginRequest, RegisterRequest } from './authTypes';
import {
  emailExists,
  usernameExists,
  addUser,
  findUser,
} from '../users/usersService';
import { activateUser, findActivation, isActivationExpired } from '../activation/activationService';

export const register = async (req: RegisterRequest, reply: FastifyReply) => {
  const { username, email, password } = req.body;
  if ((await usernameExists(username)) || (await emailExists(email))) {
    reply.status(409).send({
      statusCode: 409,
      message: 'Username or e-mail already exists.',
    });
  }
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1);
  const createdUser = await addUser(
    {
      username,
      email,
      password: await bcrypt.hash(password, 10),
    },
    expiresAt
  );
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
    const accessToken = await reply.jwtSign({
      uuid: foundUser.uuid,
    });
    reply.status(200).send({
      accessToken,
    });
  }
};

export const activate = async (req: ActivateRequest, reply: FastifyReply) => {
  if (!(await findActivation(req.params.uuid))) {
    reply.status(404).send({
      message: 'Activation link not found.',
    });
  }
  if (await isActivationExpired(req.params.uuid)) {
    reply.status(410).send({
      message: 'Activation link has expired.',
    });
  }
  const activatedUser = await activateUser(req.params.uuid);
  if (activatedUser) {
    reply.status(200).send({
      message: 'The account has been successfully activated.',
    });
  }
};
