import React from 'react';
import { Hotel } from '../../../types/hotel.type';
import Image from 'next/image';
import styles from '../../../styles/dashboard/hotelOverview.module.scss';
import { hotelParser } from '../../../utils/hotelParser';
import { format } from 'date-fns';

type HotelCardProps = {
  hotel: Hotel;
};

export const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
  const userList = hotel.Users?.map((user) => (
    <div
      key={user.id}
      style={{
        backgroundImage: `url(${user.pictureUrl})`,
        backgroundSize: 'contain',
      }}
      className={'avatar ' + styles.hotelUser}
    ></div>
  ));
  return (
    <li className={styles.hotelCard}>
      <div className={styles.hotelInfo}>
        <h2>{hotel.name}</h2>
        <div className={styles.ratingContainer}>
          <h4 className={styles.rating}>{hotel.rating}</h4>
          <Image
            className={styles.star}
            src={'/assets/star.svg'}
            width={20}
            height={20}
          />
        </div>
      </div>
      <h3 className={styles.address}>{hotel.location.toLowerCase()}</h3>
      <div className={styles.hotelDates}>
        <div className={styles.infoSegment}>
          <h2>{format(new Date(hotel.arrival), 'dd')}</h2>
          <h3>{format(new Date(hotel.arrival), 'LLL')}</h3>
        </div>
        <div className={styles.line}></div>
        <div className={styles.nights}>
          <h4>{hotel.nights} nights</h4>
          <Image src={'/assets/Hotel.svg'} width={30} height={30} />
        </div>
        <div className={styles.line}></div>
        <div className={styles.infoSegment}>
          <h2>{format(new Date(hotel.departure), 'dd')}</h2>
          <h3>{format(new Date(hotel.departure), 'LLL')}</h3>
        </div>
      </div>
      <div className={styles.hotelPrice}>
        <h3>{hotel.type}</h3>
        <div className={styles.userList}>{userList}</div>
        <h4>{hotel.priceTotal}€</h4>
      </div>
    </li>
  );
};

{
  /* <li className={styles.flightCard}>
  <div className={styles.flightInfo}>
    <h2>{flight.departureCity}</h2>
    <div className={styles.line}></div>
    <h2>{flight.arrivalCity}</h2>
  </div>
  <div className={styles.segments}>
    {itineraries.map((segment: Itinerary, i: number) => (
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
  <div className={styles.userList}>{userList}</div>
</li>; */
}
