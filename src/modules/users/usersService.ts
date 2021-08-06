import * as bcrypt from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import usersRepository from './usersRepository';

export const addUser = async (
  userData: Prisma.UserCreateInput
): Promise<User> => {
  const { username, password, email } = userData;

  return usersRepository.add({
    username,
    email,
    password: await bcrypt.hash(password, 10),
  });
};

export const usernameExists = async (username: string) =>
  !!(await usersRepository.findByUsername(username));

export const emailExists = async (email: string) =>
  !!(await usersRepository.findByEmail(email));

export const findUser = async (username: string) =>
  usersRepository.findByUsername(username);
