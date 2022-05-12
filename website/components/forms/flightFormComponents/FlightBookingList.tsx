import React from 'react';
import styles from '../../../styles/forms/departureFlightForm.module.scss';
import { Flight } from '../../../types/flight.type';
import { TripProps } from '../../../types/tripProp';
import { FlightBookingCard } from './FlightBookingCard';

type Props = TripProps & {
  flights: Flight[];
  selectedFlight: Flight | undefined;
  bookFlight: (flight: Flight) => void;
};

export const FlightBookingList: React.FC<Props> = ({
  flights,
  selectedFlight,
  bookFlight,
  trip,
}) => {
  return (
    <ul className={styles.flightList}>
      {flights.map((flight) => (
        <FlightBookingCard
          selected={selectedFlight?.flightApiId === flight.flightApiId}
          bookFlight={bookFlight}
          flight={flight}
          trip={trip}
          key={flight.flightApiId}
        />
      ))}
    </ul>
  );
};
