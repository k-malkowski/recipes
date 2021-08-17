import { FastifyInstance, FastifyReply } from 'fastify';
import * as bcrypt from 'bcrypt';
import { ActivateRequest, LoginRequest, RegisterRequest } from './authTypes';
import {
  emailExists,
  usernameExists,
  addUser,
  findUser,
} from '../users/usersService';
import {
  activateUser,
  findActivation,
  isActivationExpired,
  isUserAlreadyActivated,
} from '../activation/activationService';
import { ACTIVATION_STATUS } from '../activation/activationTypes';

export const register = (fastify: FastifyInstance) => {
  return async (req: RegisterRequest, reply: FastifyReply) => {
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
      const { mailer } = fastify;
      mailer.sendMail(
        {
          to: createdUser.email,
          subject: 'Activation link',
          text: `Hi! Here is your activation link: http://localhost:3000/v1/auth/activate/${createdUser.activation?.uuid}`,
        },
        (errors) => {
          if (errors) {
            reply.status(500).send({
              message: errors,
            });
          }
        }
      );
      reply.status(201).send({
        message: 'User successfully created.',
      });
    }
  };
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
    if (foundUser.status === ACTIVATION_STATUS.PENDING) {
      reply.status(410).send({
        message: 'Account has not been activated.',
      });
    }
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
  if (await isUserAlreadyActivated(req.params.uuid)) {
    reply.status(409).send({
      message: 'The account has already been activated.',
    });
  }
  const activatedUser = await activateUser(req.params.uuid);
  if (activatedUser) {
    reply.status(200).send({
      message: 'The account has been successfully activated.',
    });
  }
};
