import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import usersRepository from './usersRepository';

export const addUser = async (userData: Prisma.UserCreateInput) => {
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
