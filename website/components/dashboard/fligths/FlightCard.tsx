import React from 'react';
import { Flight } from '../../../types/flight.type';

type Props = {
  flight: Flight;
};

export const FlightCard: React.FC<Props> = ({ flight }) => {
  return (
    <li>
      {flight.departureCity} - {flight.arrivalCity} -{' '}
      {JSON.stringify(flight.Users?.map((u) => u.username))}
    </li>
  );
};
