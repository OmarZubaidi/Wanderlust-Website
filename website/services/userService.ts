import { User } from '../types/user.type';

const serverUrl = process.env.SERVER_URL || 'http://localhost:3333';

export const userServiceCreate = async (user: User) => {
  try {
    const res = await fetch(serverUrl + '/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const newUser = await res.json();
    if (newUser.status === 404) throw new Error(newUser.message);
    return newUser as User;
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
};

type ErrorResponse = {
  response: Response;
  status: number;
  message: string;
  name: string;
};

type Response = {
  message: string;
  statusCode: string;
};

export const userServiceGetByEmail = async (
  email: string
): Promise<User | string> => {
  try {
    const res = await fetch(serverUrl + `/users/email/${email}`);
    const user = await res.json();
    if (user.status === 404) throw new Error(user.message);
    return user as User;
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
};

export const userServiceGetById = async (
  id: number
): Promise<User | string> => {
  try {
    const res = await fetch(serverUrl + `/users/${id}`);
    const user = await res.json();
    if (user.status === 404) throw new Error(user.message);
    return user as User;
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
};
