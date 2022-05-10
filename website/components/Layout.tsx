import React from 'react';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { useAuth0 } from '@auth0/auth0-react';

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  const { user } = useAuth0();

  return (
    <>
      <Navbar logged={!!user} />
      {children}
      <Footer logged={!!user} />
    </>
  );
};
