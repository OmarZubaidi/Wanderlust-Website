import React from 'react';
import styles from '../../../styles/forms/departureFlightForm.module.scss';
import { Flight } from '../../../types/flight.type';
import { TripProps } from '../../../types/tripProp';
import { LittleLoading } from '../../LittleLoading';
import { FlightBookingCard } from './FlightBookingCard';

type Props = TripProps & {
  flights: Flight[];
  selectedFlight: Flight | undefined;
  bookFlight: (flight: Flight) => void;
  isSearching: boolean;
};

export const FlightBookingList: React.FC<Props> = ({
  flights,
  selectedFlight,
  bookFlight,
  isSearching,
}) => {
  return (
    <ul className={styles.flightList}>
      {isSearching && <LittleLoading />}
      {flights.map((flight) => (
        <FlightBookingCard
          selected={selectedFlight?.flightApiId === flight.flightApiId}
          bookFlight={bookFlight}
          flight={flight}
          key={flight.flightApiId}
        />
      ))}
    </ul>
  );
};
