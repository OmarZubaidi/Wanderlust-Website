import React from 'react';
import styles from '../../styles/landingPageStyle/sections.module.scss';
import Image from 'next/image';
import { useAuth0 } from '@auth0/auth0-react';

export const LandingPageSections: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <section className={styles.sections}>
      <section className={styles.section}>
        <article className={styles.section_text}>
          <h2 className='titleH2'>Discover your Wanderlust</h2>
          <p>
            A trip-planning application that will accompany you through your
            many travels. You pick your dates and location and the trip is ready
            to be planned. Add your friends to the group so you can all see and
            book flights and hotels. Wanderlust then gives you the points of
            interest and restaurants to visit, which you can rearrange to your
            heart's content.
          </p>
          <div className={styles.sign_buttons}>
            <button
              onClick={() => loginWithRedirect()}
              className='button login_button'
            >
              Login
            </button>
            <button
              onClick={() =>
                loginWithRedirect({
                  screen_hint: 'signup',
                })
              }
              className='button signup_button'
            >
              Register
            </button>
          </div>
        </article>
        <article className={styles.pin_img}></article>
      </section>
      <section className={styles.section}>
        <article className={styles.phone_img}></article>
        <article className={styles.section_text}>
          <h2 className='titleH2'>Download the companion app</h2>
          <p>
            When it's time to travel, the companion app is your best friend.
            You'll have access to the calendar of the itinerary as well as a map
            showing all the locations. You'll also be able to see all flights
            and hotels you've booked. If you select something coming up in the
            calendar, it will give you directions to it.
          </p>
          <div className={styles.store_buttons}>
            <div className={styles.store_button}>
              <Image
                width={70}
                height={70}
                src='/assets/AppStore.svg'
                alt='app store'
                style={{
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                }}
              />
            </div>
            <div className={styles.store_button}>
              <Image
                width={70}
                height={70}
                src='/assets/GooglePlayStore.svg'
                alt='app store'
                style={{
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>
        </article>
      </section>
    </section>
  );
};
