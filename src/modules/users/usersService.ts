import { Prisma } from '@prisma/client';
import usersRepository from './usersRepository';

export const addUser = async (
  userData: Prisma.UserCreateInput,
  expiresAt: Date
) => usersRepository.add(userData, expiresAt);

export const usernameExists = async (username: string) =>
  !!(await usersRepository.findByUsername(username));

export const emailExists = async (email: string) =>
  !!(await usersRepository.findByEmail(email));

export const findUser = async (username: string) =>
  usersRepository.findByUsername(username);

export const deleteUser = async (userUuid: string) =>
  usersRepository.delete(userUuid);

