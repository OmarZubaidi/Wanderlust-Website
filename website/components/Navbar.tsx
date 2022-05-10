import React, { useState } from 'react';
import styles from '../styles/Navbar.module.scss';
import Link from 'next/link';
import { useAuth0 } from '@auth0/auth0-react';

type NavbarProos = {
  logged: boolean;
};

export const Navbar: React.FC<NavbarProos> = ({ logged }) => {
  const [open, setOpen] = useState(false);
  const { loginWithRedirect, logout, user } = useAuth0();
  const show = open ? 'show' : undefined;

  return (
    <div className={styles.navbar_container}>
      <nav className={styles.navbar}>
        <h1 className={styles.logo}>
          <Link href={'/'}>
            <a>Wanderlust</a>
          </Link>
        </h1>
        {logged ? (
          <div className='buttons'>
            <div className={`avatar_dropdown ${show}`}>
              <Link href={'/'}>
                <a>Account</a>
              </Link>
              <a
                id='logout_button'
                className={styles.logout}
                onClick={() => logout({ returnTo: 'http://localhost:3000' })}
              >
                Logout
              </a>
            </div>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className='avatar'
              style={{
                background: `url(${user?.picture})`,
                backgroundSize: 'contain',
              }}
            ></button>
          </div>
        ) : (
          <div className='buttons'>
            <button
              className={'login_button button'}
              onClick={() => loginWithRedirect()}
            >
              Login
            </button>
            <button
              onClick={() =>
                loginWithRedirect({
                  screen_hint: 'signup',
                })
              }
              className={'button signup_button'}
            >
              Register
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};
