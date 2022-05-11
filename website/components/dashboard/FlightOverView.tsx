import React from 'react';
import { useUserContext } from '../../context/userContext';
import { Trip } from '../../types/trip.type';
import { FlightCard } from './fligths/flightCard';
import styles from '../../styles/dashboard/flightOverview.module.scss';
import Link from 'next/link';

type Props = {
  trip: Trip;
};

export const FlightOverView: React.FC<Props> = ({ trip }) => {
  const { userDb } = useUserContext();

  const bookFlight =
    userDb?.Flights?.length === 0 ? (
      <div className={styles.bookContainer}>
        <h2 className={styles.bookTitle}>You didn't book a flight yet</h2>
        <p>To see flight recommendations, click here</p>
        <button className={'button ' + styles.flightButton}>
          <Link href={`/trip/flight/${trip.id}`}>Flights</Link>
        </button>
      </div>
    ) : undefined;

  return (
    <div className={styles.container}>
      {bookFlight}
      <div>
        <h2>Group flights</h2>
        <p>Here you can see all the flights of the group:</p>
        <ul>
          <FlightCard />
          {trip.Flights?.map((flight) => (
            <FlightCard />
          ))}
        </ul>
      </div>
    </div>
  );
};
