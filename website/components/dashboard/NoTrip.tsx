import { useRouter } from 'next/router';
import React from 'react';
import styles from '../../styles/dashboard/noTrip.module.scss';
import {
  deleteCachedAddedFriends,
  deleteCachedTrip,
} from '../../utils/localStorage';

export const NoTrip: React.FC = () => {
  const router = useRouter();

  const navigateToTripForm = () => {
    deleteCachedTrip();
    deleteCachedAddedFriends();
    router.push('/trip');
  };

  return (
    <div className={styles.container}>
      <h2 className='titleH2'>No trips yet</h2>
      <div>Click this button to create your first trip</div>
      <button onClick={navigateToTripForm} className={styles.add_trip}></button>
    </div>
  );
};
