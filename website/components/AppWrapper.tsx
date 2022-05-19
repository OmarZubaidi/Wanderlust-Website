import React from 'react';
import { Layout } from '../components/Layout';
import { Auth0Provider } from '@auth0/auth0-react';
import App from 'next/app';
import { NextPage } from 'next';

type Props = {
  children?: React.ReactNode;
  domain_env: string;
  clientId_env: string;
};

export const AppWrapper: NextPage<Props> = ({
  children,
  domain_env,
  clientId_env,
}) => {
  return (
    <Auth0Provider
      domain={domain_env}
      clientId={clientId_env}
      redirectUri={'http://localhost:3000'}
    >
      <Layout>{children}</Layout>
    </Auth0Provider>
  );
};
