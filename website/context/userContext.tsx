import { useAuth0 } from '@auth0/auth0-react';
import React, { createContext, useEffect, useState } from 'react';
import { getUserByEmail, getUserById } from '../services/dbService';
import { Trip } from '../types/trip.type';
import { User } from '../types/user.type';

type UserContextType = {
  userDb: User | undefined;
  isFetching: boolean;
  addTripToUser: (trip: Trip) => void;
  deleteTripToUser: (tripId: number) => void;
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
  addTripToUser: () => {},
  deleteTripToUser: () => {},
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
          const newTrips: Trip[] = userById.Trips!.filter((t) => {
            return new Date(t.end) >= new Date();
          });
          const oldTrips: Trip[] = userById.Trips!.filter((t) => {
            return new Date(t.end) < new Date();
          });

          setUserDb({ ...userById, Trips: [...newTrips, ...oldTrips] });
          setIsFetching(false);
        }
      }
    }
  };

  const addTripToUser = (trip: Trip) => {
    setUserDb({
      ...userDb!,
      Trips: [trip, ...userDb?.Trips!],
    });
  };

  const deleteTripToUser = (tripId: number) => {
    const filteredTrips = userDb?.Trips!.filter(
      (trip: Trip) => trip.id !== tripId
    );
    setUserDb({
      ...userDb!,
      Trips: filteredTrips,
    });
  };

  useEffect(() => {
    setIsFetching(true);
    findUserDb();
  }, [user]);

  return (
    <UserContext.Provider
      value={{ userDb, isFetching, addTripToUser, deleteTripToUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => React.useContext(UserContext);
