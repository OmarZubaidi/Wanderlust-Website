import { useAuth0 } from '@auth0/auth0-react';
import React, { createContext, useEffect, useState } from 'react';
import { getUserByEmail, getUserById } from '../services/dbService';
import { User } from '../types/user.type';

type UserContextType = {
  userDb: User | undefined;
  isFetching: boolean;
};

const UserContext = createContext<UserContextType>({
  userDb: {
    emailVerified: false,
    username: '',
    sub: '',
    email: '',
    pictureUrl: '',
  },
  isFetching: false,
});
type Props = {
  children?: React.ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [userDb, setUserDb] = useState<User>();
  const [isFetching, setIsFetching] = useState(false);

  const { user } = useAuth0();

  const findUserDb = async () => {
    if (user && user.email) {
      const data = await getUserByEmail(user.email);

      if (typeof data !== 'string') {
        const userById = await getUserById(data.id!);

        if (typeof userById !== 'string') {
          setUserDb(userById);
          setIsFetching(false);
        }
      }
    }
  };

  useEffect(() => {
    setIsFetching(true);
    findUserDb();
  }, [user]);

  return (
    <UserContext.Provider value={{ userDb, isFetching }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
