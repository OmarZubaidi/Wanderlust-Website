import { useAuth0 } from '@auth0/auth0-react';
import React, { createContext, useEffect, useState } from 'react';
import { getUserByEmail } from '../services/dbService';
import { User } from '../types/user.type';

type UserContextType = {
  userDb: User | undefined;
};

const UserContext = createContext<UserContextType>({
  userDb: {
    emailVerified: false,
    username: '',
    sub: '',
    email: '',
    pictureUrl: '',
  },
});
type Props = {
  children?: React.ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [userDb, setUserDb] = useState<User>();

  const { user } = useAuth0();
  useEffect(() => {
    const findUserDb = async () => {
      if (user && user.email) {
        const data = await getUserByEmail(user.email);
        if (typeof data !== 'string') setUserDb(data);
      }
    };
    findUserDb();
  }, [user]);

  return (
    <UserContext.Provider value={{ userDb }}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
