import React, { useEffect, useState } from 'react';
import { TripProps } from '../../types/tripProp';
import styles from '../../styles/forms/hotelForm.module.scss';
import { Hotel } from '../../types/hotel.type';
import { hotelSearch } from '../../utils/amadeus';
import { hotelParser } from '../../utils/hotelParser';
import { format } from 'date-fns';
import Image from 'next/image';
import { LittleLoading } from '../LittleLoading';
import { citycode } from '../../utils/citycodes';
import {
  bookGroupHotels,
  createHotelAndConnection,
} from '../../utils/hotelUtils';
import { useUserContext } from '../../context/userContext';
import { useRouter } from 'next/router';
import { HotelFromHeader } from './hotelFromComponents/HotelFormHeader';
import { HotelFormList } from './hotelFromComponents/HotelFormList';

export const HotelFormComponent: React.FC<TripProps> = ({ trip }) => {
  const router = useRouter();
  const { userDb, isFetching } = useUserContext();
  const [budget, setBudget] = useState('500');
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [research, setResearch] = useState(false);
  const [isSearching, setIsSearching] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState<Hotel>();

  useEffect(() => {
    setIsSearching(true);
    hotelSearch(citycode[trip.destination.toLowerCase()], budget).then(
      (res) => {
        setHotels(hotelParser(res, trip));
        setIsSearching(false);
      }
    );
  }, [research]);

  const finalizeBooking = async () => {
    if (
      !(await bookGroupHotels(
        selectedHotel!.hotelApiId!,
        selectedHotel!,
        trip.id!,
        userDb!.id!
      ))
    ) {
      await createHotelAndConnection(selectedHotel!, userDb!.id!, trip.id!);
      router.push(`/dashboard/hotel/${trip.id}`);
    }
  };

  const handleSelect = (hotel: Hotel) => {
    setSelectedHotel(hotel);
  };

  return (
    <section className={styles.container}>
      <HotelFromHeader
        budget={budget}
        setBudget={setBudget}
        setResearch={() => setResearch((prev) => !prev)}
      />

      <HotelFormList
        selectedHotel={selectedHotel}
        hotels={hotels}
        handleSelect={handleSelect}
        trip={trip}
        isSearching={isSearching}
      />

      {selectedHotel && (
        <button
          type='button'
          className={'button ' + styles.button}
          onClick={finalizeBooking}
        >
          Book Hotel
        </button>
      )}
    </section>
  );
};
