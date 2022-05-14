import React from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import { TripProps } from '../../../types/tripProp';
import { Hotel } from '../../../types/hotel.type';
import styles from '../../../styles/forms/hotelForm.module.scss';

type HotelFormCardProps = TripProps & {
  isSearching: boolean;
  hotel: Hotel;
  handleSelect: (hotel: Hotel) => void;
  selected: boolean;
};

export const HotelFormCard: React.FC<HotelFormCardProps> = ({
  handleSelect,
  hotel,
  trip,
  selected,
}) => {
  const green = selected ? styles.selected : undefined;
  return (
    <li
      onClick={() => handleSelect(hotel)}
      className={styles.hotelCard + ' ' + green}
    >
      <div className={styles.hotelCardHeader}>
        <div className={styles.date}>
          <h2>{format(new Date(trip.start), 'dd')}</h2>
          <h3>{format(new Date(trip.start), 'MMM')}</h3>
        </div>
        <div className={styles.line}></div>
        <div className={styles.hotelCenter}>
          <div className={styles.nights}>{hotel.nights} nights</div>
          <Image src={'/assets/Hotel.svg'} width={40} height={40} />
          <div className={styles.hotelName}>{hotel.name}</div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.date}>
          <h2>{format(new Date(trip.end), 'dd')}</h2>
          <h3>{format(new Date(trip.end), 'MMM')}</h3>
        </div>
        <div className={styles.hotelPrice}>{hotel.priceTotal}</div>
      </div>
      <div className={styles.hotelInfo}>
        <div>
          <h2>
            <span className={styles.hotelDescriptionTitle}>Address:</span>{' '}
            <span className={styles.hotelDescription}>{hotel.location}</span>
          </h2>
          <h3>
            <span className={styles.hotelDescriptionTitle}>Description:</span>{' '}
            <span className={styles.hotelDescription}>{hotel.description}</span>
          </h3>
          <h4>
            <span className={styles.hotelDescriptionTitle}>Type:</span>{' '}
            <span className={styles.hotelDescription}>{hotel.type}</span>
          </h4>
        </div>
      </div>
    </li>
  );
};
