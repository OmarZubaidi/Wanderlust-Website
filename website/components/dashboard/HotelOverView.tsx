import React from 'react';
import { useUserContext } from '../../context/userContext';
import { TripProps } from '../../types/tripProp';
import styles from '../../styles/dashboard/hotelOverview.module.scss';
import Link from 'next/link';
import { Hotel } from '../../types/hotel.type';
import { HotelCard } from './hotels/HotelCard';

export const HotelOverView: React.FC<TripProps> = ({ trip }) => {
  const { userDb, isFetching } = useUserContext();

  const needHotel = trip.Hotels!.some((hotel) => {
    if (!isFetching) {
      return hotel.Users?.some((user) => user.id === userDb!.id);
    }
  });

  const bookHotel = !needHotel ? (
    <div className={styles.bookContainer}>
      <h2 className={styles.bookTitle}>You didn't book an hotel yet</h2>
      <p>To see hotel recommendations, click here</p>
      <button className={'button ' + styles.hotelsButton}>
        <Link href={`/trip/hotel/${trip.id}`}>Hotels</Link>
      </button>
    </div>
  ) : undefined;

  return (
    <section className={styles.container}>
      {bookHotel}
      <div>
        <h2 className={styles.groupTitle}>Group hotels</h2>
        <p>Here you can see all the hotels of the group:</p>
        <ul className={styles.hotelList}>
          {trip.Hotels?.map((hotel: Hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </ul>
      </div>
    </section>
  );
};
