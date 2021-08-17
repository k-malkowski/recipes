import { isPast } from 'date-fns';
import activationRepository from './activationRepository';
import { ACTIVATION_STATUS } from './activationTypes';

export const activateUser = async (uuid: string) =>
  activationRepository.activate(uuid);

export const isActivationExpired = async (uuid: string) => {
  const activation = await activationRepository.findOne(uuid);
  if (activation) {
    return isPast(activation.expiresAt);
  }
  return true;
};

export const findActivation = async (uuid: string) =>
  activationRepository.findOne(uuid);

export const isUserAlreadyActivated = async (uuid: string) => {
  const activation = await activationRepository.findOne(uuid);
  if (activation) {
    return activation.status === ACTIVATION_STATUS.ACTIVATED;
  }
  return null;
};
