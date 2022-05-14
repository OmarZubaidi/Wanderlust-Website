import React from 'react';
import { LittleLoading } from '../../LittleLoading';
import styles from '../../../styles/forms/hotelForm.module.scss';
import { TripProps } from '../../../types/tripProp';
import { Hotel } from '../../../types/hotel.type';
import { HotelFormCard } from './HotelFormCard';

type HotelFormList = TripProps & {
  isSearching: boolean;
  hotels: Hotel[];
  handleSelect: (hotel: Hotel) => void;
  selectedHotel: Hotel | undefined;
};

export const HotelFormList: React.FC<HotelFormList> = ({
  isSearching,
  hotels,
  handleSelect,
  trip,
  selectedHotel,
}) => {
  return (
    <ul className={styles.hotelList}>
      {isSearching && <LittleLoading />}

      {hotels.map((hotel) => (
        <HotelFormCard
          selected={selectedHotel?.hotelApiId === hotel.hotelApiId}
          key={hotel.hotelApiId}
          hotel={hotel}
          handleSelect={handleSelect}
          trip={trip}
          isSearching={isSearching}
        />
      ))}
    </ul>
  );
};
