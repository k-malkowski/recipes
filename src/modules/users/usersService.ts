import { Prisma, User } from '@prisma/client';
import usersRepository from './usersRepository';

export const addUser = async (
  userData: Prisma.UserCreateInput
): Promise<User> => usersRepository.add(userData);

export const usernameExists = async (username: string) =>
  !!(await usersRepository.findByUsername(username));

export const emailExists = async (email: string) =>
  !!(await usersRepository.findByEmail(email));

export const findUser = async (username: string) =>
  usersRepository.findByUsername(username);
