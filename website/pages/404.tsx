import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/notFound.module.scss';

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      // router.go(-1);
      router.push('/');
    }, 3000);
  }, []);

  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>Ooops....</h1>
      <h2 className={styles.text}>That page cannot be found</h2>
      <p className={styles.text}>
        Go back to the{' '}
        <Link href='/'>
          <a className={styles.homeLink}>Homepage</a>
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
