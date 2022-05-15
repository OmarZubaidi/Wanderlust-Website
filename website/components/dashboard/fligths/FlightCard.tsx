import React, { useEffect } from 'react';
import { Flight, Itinerary } from '../../../types/flight.type';
import styles from '../../../styles/dashboard/flightOverview.module.scss';
import { format } from 'date-fns';
import Image from 'next/image';

type Props = {
  flight: Flight;
};

export const FlightCard: React.FC<Props> = ({ flight }) => {
  const userList = flight.Users?.map((user) => (
    <div
      key={user.id}
      style={{
        backgroundImage: `url(${user.pictureUrl})`,
        backgroundSize: 'contain',
      }}
      className={'avatar ' + styles.flightUser}
    ></div>
  ));
  const itineraries: Itinerary[] = JSON.parse(flight.itineraries);

  return (
    <li className={styles.flightCard}>
      <div className={styles.flightInfo}>
        <h2>Departure</h2>
        <h2>Arrival</h2>
      </div>
      <div className={styles.segments}>
        {itineraries.map((segment: Itinerary, i: number) => (
          <div className={styles.segment} key={i}>
            <div className={styles.infoSegment}>
              <h2>{format(new Date(segment.departure), 'HH:mm')}</h2>
              <h3>
                {flight.departureCity} ({segment.depAirport})
              </h3>
            </div>
            <div className={styles.line}></div>
            <div className={styles.plane}>
              <Image src={'/assets/Plane.svg'} width={30} height={30} />
            </div>
            <div className={styles.line}></div>
            <div className={styles.infoSegment}>
              <h2>{format(new Date(segment.arrival), 'HH:mm')}</h2>
              <h3>
                {flight.arrivalCity} ({segment.arrAirport})
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.userList}>{userList}</div>
    </li>
  );
};
