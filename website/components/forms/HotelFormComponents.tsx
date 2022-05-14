import React, { useEffect, useState } from 'react';
import { TripProps } from '../../types/tripProp';
import styles from '../../styles/forms/hotelForm.module.scss';
import { Hotel } from '../../types/hotel.type';
import {
  altHotelSearch,
  hotelSearch,
  HotelSearchById,
} from '../../utils/amadeus';
import { hotelParser } from '../../utils/hotelParser';
import { format } from 'date-fns';
import Image from 'next/image';
import { LittleLoading } from '../LittleLoading';
import { citycode } from '../../utils/citycodes';

export const HotelFormComponent: React.FC<TripProps> = ({ trip }) => {
  const [budget, setBudget] = useState('500');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [research, setResearch] = useState(false);
  const [isSearching, setIsSearching] = useState(true);

  useEffect(() => {
    // console.log('searching');
    // hotelSearch('BER', budget).then((res) => {
    //   setHotels(hotelParser(res, trip));
    //   setIsSearching(false);
    // });

    const searchHotels = async () => {
      const hotelsApi = await altHotelSearch(
        citycode[trip.destination.toLowerCase()]
      );
      const hotelsToSave: Hotel[] = [];
      hotelsApi.forEach(async (hotelApi: any) => {
        const completeHotel = await HotelSearchById(hotelApi.hotelId, budget);
        hotelsToSave.push(completeHotel);
      });
      setHotels(hotelParser(hotelsToSave, trip));
      setIsSearching(false);
    };
    searchHotels();
  }, [research]);

  return (
    <section className={styles.container}>
      <div className={styles.hotelHeader}>
        <h2 className='titleH2'>Find your Hotel</h2>
        <div>
          <p>Price x night {budget}€</p>
          <input
            onBlur={() => setResearch((prev) => !prev)}
            step={20}
            type='range'
            className={styles.range}
            value={budget}
            max={1000}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
      </div>

      <ul className={styles.hotelList}>
        {isSearching && <LittleLoading />}
        {hotels.map((hotel) => (
          <div className={styles.hotelCard} key={hotel.hotelApiId}>
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
                  <span className={styles.hotelDescription}>
                    {hotel.location}
                  </span>
                </h2>
                <h3>
                  <span className={styles.hotelDescriptionTitle}>
                    Description:
                  </span>{' '}
                  <span className={styles.hotelDescription}>
                    {hotel.description}
                  </span>
                </h3>
                <h4>
                  <span className={styles.hotelDescriptionTitle}>Type:</span>{' '}
                  <span className={styles.hotelDescription}>{hotel.type}</span>
                </h4>
              </div>
            </div>
          </div>
        ))}
      </ul>
    </section>
  );
};
