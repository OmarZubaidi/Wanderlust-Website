import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from '../../styles/dashboard/SideBar.module.scss';
import { Trip } from '../../types/trip.type';
import {
  deleteCachedAddedFriends,
  deleteCachedTrip,
} from '../../utils/localStorage';

type Props = {
  trips: Trip[];
};

export const SideBar: React.FC<Props> = ({ trips }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [tripsFilterd, setTripsFiltered] = useState<Trip[]>(trips);

  const navigateToTripForm = () => {
    deleteCachedTrip();
    deleteCachedAddedFriends();
    router.push('/trip');
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      const newFilteredTrips = trips.filter((trip) => {
        return trip.destination
          .toLowerCase()
          .startsWith(searchTerm.toLowerCase());
      });
      setTripsFiltered(newFilteredTrips);
    } else {
      setTripsFiltered(trips);
    }
  }, [searchTerm]);

  return (
    <div className={styles.container}>
      <div className={styles.trips_header}>
        <h3 className='titleH3'>Trips</h3>
        <button
          onClick={navigateToTripForm}
          className={styles.add_trip}
        ></button>
      </div>
      <input
        type='text'
        placeholder='Search'
        className={styles.trip_search}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className={styles.trips}>
        {trips &&
          tripsFilterd.map((trip) => {
            const today = new Date().toISOString();
            const over = new Date(trip.end) < new Date(today);

            return (
              <li key={trip.id} className={over ? styles.trip_over : ''}>
                <Link href={`/dashboard/map/${trip.id}`}>
                  <a className={styles.trip}>{trip.destination}</a>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
