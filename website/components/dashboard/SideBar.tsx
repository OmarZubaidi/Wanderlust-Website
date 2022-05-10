import { useRouter } from 'next/router';
import React from 'react';
import styles from '../../styles/dashboard/SideBar.module.scss';
import {
  deleteCachedAddedFriends,
  deleteCachedTrip,
} from '../../utils/localStorage';

export const SideBar: React.FC = () => {
  const router = useRouter();

  const navigateToTripForm = () => {
    deleteCachedTrip();
    deleteCachedAddedFriends();
    router.push('/trip');
  };

  return (
    <div className={styles.container}>
      <div className={styles.trips_header}>
        <h3 className='titleH3'>Trips</h3>
        <button
          onClick={navigateToTripForm}
          className={styles.add_trip}
        ></button>
      </div>
      <input type='text' className={styles.trip_search} />
      <ul className={styles.trips}>
        {/* <li>
          <Link href={'/'}>
            <a className={styles.trip}>Fake trip</a>
          </Link>
        </li>
        <li>
          <Link href={'/'}>
            <a className={styles.trip}>Fake trip</a>
          </Link>
        </li>
        <li>
          <Link href={'/'}>
            <a className={styles.trip}>Fake trip</a>
          </Link>
        </li>
        <li>
          <Link href={'/'}>
            <a className={styles.trip}>Fake trip</a>
          </Link>
        </li>
        <li>
          <Link href={'/'}>
            <a className={styles.trip}>Fake trip</a>
          </Link>
        </li> */}
      </ul>
    </div>
  );
};
