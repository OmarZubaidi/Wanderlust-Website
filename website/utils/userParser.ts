import { User } from '../types/user.type';

export const parseUser = (user: any): User => {
  const { email, email_verified, nickname, picture, sub } = user;
  return {
    email,
    emailVerified: email_verified,
    username: nickname,
    pictureUrl: picture,
    sub,
  };
};
