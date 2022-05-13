import React, { useEffect } from 'react';
import { LandingPage } from '../components/landingPage/LandingPage';
import { useAuth0 } from '@auth0/auth0-react';
import Dashboard from './dashboard';
import { createUser, getUserByEmail } from '../services/dbService';
import { parseUser } from '../utils/userParser';
import { Loading } from '../components/Loading';
import { useUserContext } from '../context/userContext';

const HomePage = () => {
  const { user, isLoading } = useAuth0();
  const { isFetching } = useUserContext();

  useEffect(() => {
    const signup = async () => {
      if (user && user.email) {
        const isUserSigned = await getUserByEmail(user.email);
        if (isUserSigned === 'Not Found') {
          const parsedUser = parseUser(user);
          const newUser = await createUser(parsedUser);
        }
      }
    };
    signup();
  }, [user]);

  if (isLoading) return <Loading />;
  if (user) return <Dashboard />;
  return <LandingPage />;
};

export default HomePage;
