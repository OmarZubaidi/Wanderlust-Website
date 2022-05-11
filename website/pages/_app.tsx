import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { AppWrapper } from '../components/AppWrapper';
import { UserProvider } from '../context/userContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper
      domain_env={process.env.DOMAIN!}
      clientId_env={process.env.CLIENT_ID!}
    >
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </AppWrapper>
  );
}

export default MyApp;
