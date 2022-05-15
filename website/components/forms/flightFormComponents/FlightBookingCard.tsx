import React from 'react';
import styles from '../../../styles/forms/departureFlightForm.module.scss';
import { Flight, Itinerary } from '../../../types/flight.type';
import { format } from 'date-fns';
import Image from 'next/image';

type BookingCard = {
  flight: Flight;
  bookFlight: (flight: Flight) => void;
  selected: boolean;
};

export const FlightBookingCard: React.FC<BookingCard> = ({
  flight,
  bookFlight,
  selected,
}) => {
  const green = selected ? styles.selected : undefined;
  const itineraries: Itinerary[] = JSON.parse(flight.itineraries);
  return (
    <li
      onClick={() => {
        bookFlight(flight);
      }}
      className={styles.flight + ' ' + green}
    >
      <div className={styles.date}>
        <h2>{format(new Date(itineraries[0].departure), 'dd')}</h2>
        <h3>{format(new Date(itineraries[0].departure), 'MMM')}</h3>
      </div>
      <div className={styles.segments}>
        {itineraries.map((segment, i) => (
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
      <div className={styles.flightPrice}>{flight.price}€</div>
    </li>
  );
};
