import React from 'react';
import trip from '../../../pages/trip';
import styles from '../../../styles/forms/departureFlightForm.module.scss';
import { Flight } from '../../../types/flight.type';
import { TripProps } from '../../../types/tripProp';
import { format } from 'date-fns';
import Image from 'next/image';

type BookingCard = TripProps & {
  flight: Flight;
  bookFlight: (flight: Flight) => void;
  selected: boolean;
};

export const FlightBookingCard: React.FC<BookingCard> = ({
  trip,
  flight,
  bookFlight,
  selected,
}) => {
  const green = selected ? styles.selected : undefined;
  return (
    <li
      onClick={() => {
        bookFlight(flight);
      }}
      className={styles.flight + ' ' + green}
    >
      <div className={styles.date}>
        <h2>{format(new Date(trip.start), 'dd')}</h2>
        <h3>{format(new Date(trip.start), 'MMM')}</h3>
      </div>
      <div className={styles.segments}>
        {flight.itineraries.map((segment, i) => (
          <div className={styles.segment} key={i}>
            <div className={styles.infoSegment}>
              <h2>{format(new Date(segment.departure), 'HH:mm')}</h2>
              <h3>{segment.depAirport}</h3>
            </div>
            <div className={styles.line}></div>
            <Image src={'/assets/Plane.svg'} width={100} height={100} />
            <div className={styles.line}></div>
            <div className={styles.infoSegment}>
              <h2>{format(new Date(segment.arrival), 'HH:mm')}</h2>
              <h3>{segment.arrAirport}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.flightPrice}>{flight.price}</div>
    </li>
  );
};
