import React from 'react';
import styles from '../../../styles/forms/departureFlightForm.module.scss';

type Props = {
  departure: string;
  destination: string;
  title: string;
};

export const FlightFormHeader: React.FC<Props> = ({
  departure,
  destination,
  title,
}) => {
  return (
    <div className={styles.flightFormHeader}>
      <h2 className={'titleH2 ' + styles.title}>{title}</h2>
      {departure && destination && (
        <h2 className={styles.itinerary}>
          {departure} to {destination}
        </h2>
      )}
    </div>
  );
};
