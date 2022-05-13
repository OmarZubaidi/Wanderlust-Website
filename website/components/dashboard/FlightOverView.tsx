import React from 'react';
import { useUserContext } from '../../context/userContext';
import { FlightCard } from './fligths/FlightCard';
import styles from '../../styles/dashboard/flightOverview.module.scss';
import Link from 'next/link';
import { TripProps } from '../../types/tripProp';

export const FlightOverView: React.FC<TripProps> = ({ trip }) => {
  const { userDb, isFetching } = useUserContext();

  const needFlight = trip.Flights!.some((flight) => {
    if (!isFetching) {
      return flight.Users?.some((user) => user.id === userDb!.id);
    }
  });

  const bookFlight = !needFlight ? (
    <div className={styles.bookContainer}>
      <h2 className={styles.bookTitle}>You didn't book a flight yet</h2>
      <p>To see flight recommendations, click here</p>
      <button className={'button ' + styles.flightButton}>
        <Link href={`/trip/flight/${trip.id}`}>Flights</Link>
      </button>
    </div>
  ) : undefined;

  return (
    <section className={styles.container}>
      {bookFlight}
      <div>
        <h2>Group flights</h2>
        <p>Here you can see all the flights of the group:</p>
        <ul className={styles.flightList}>
          {trip.Flights?.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </ul>
      </div>
    </section>
  );
};
