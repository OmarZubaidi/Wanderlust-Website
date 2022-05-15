import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react';
import { getCoordinates } from '../../services/locationsService';
import styles from '../../styles/forms/tripForm.module.scss';
import { Trip } from '../../types/trip.type';
import { cityCoordinates } from '../../utils/cityCoordinates';
import { CacheTrip } from '../../utils/localStorage';
import { ContinueButton } from './tripFormComponents/ContinueButton';
import { DepartureInput } from './tripFormComponents/DepartureInput';
import { DestinationInput } from './tripFormComponents/DestinationInput';
import { ReturnInput } from './tripFormComponents/ReturnInput';

export const TripFormComponent: React.FC = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [destination, setDestination] = useState<string>('');

  const goToFriendsForm = async (event: FormEvent) => {
    event.preventDefault();
    const coordinates = await getCoordinates(destination);
    const trip: CacheTrip = {
      startDate,
      endDate,
      destination,
      latitude:
        coordinates.latitude ||
        cityCoordinates[destination.toLowerCase()].latitude,
      longitude:
        coordinates.longitude ||
        cityCoordinates[destination.toLowerCase()].longitude,
    };
    if (!startDate || !endDate || !destination) return;
    router.push({ pathname: '/trip/friends', query: trip });
  };

  const handleChange = (input: string, value: string) => {
    switch (input) {
      case 'startDate':
        setStartDate(value);
        break;
      case 'endDate':
        setEndDate(value);
        break;
      case 'destination':
        setDestination(value);
        break;
      default:
        return;
    }
  };

  return (
    <section className={styles.tripForm}>
      <h2 className={'titleH2 ' + styles.title}>Plan your trip</h2>
      <form onSubmit={goToFriendsForm}>
        <div className={styles.input_row}>
          <DepartureInput startDate={startDate} handleChange={handleChange} />
          <ReturnInput
            min={startDate}
            endDate={endDate}
            handleChange={handleChange}
          />
        </div>
        <div className={styles.input_row}>
          <DestinationInput
            destination={destination}
            handleChange={handleChange}
          />
          <ContinueButton />
        </div>
      </form>
    </section>
  );
};
