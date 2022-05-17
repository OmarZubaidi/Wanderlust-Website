import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { AppWrapper } from '../components/AppWrapper';
import { UserProvider } from '../context/userContext';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AppWrapper
      domain_env={process.env.DOMAIN!}
      clientId_env={process.env.CLIENT_ID!}
    >
      <UserProvider>
        <Component key={router.asPath} {...pageProps} />
      </UserProvider>
    </AppWrapper>
  );
}

export default MyApp;
