import React, { useState } from 'react';
import { EventType } from '../../../types/event.type';
import styles from '../../../styles/dashboard/events.module.scss';
import { Trip } from '../../../types/trip.type';
import Image from 'next/image';

type RestaurantItemProps = {
  e: EventType;
  handleSubmit: (event: EventType) => Promise<boolean>;
  trip: Trip;
};

export const RestaurantItem: React.FC<RestaurantItemProps> = ({
  e,
  handleSubmit,
  trip,
}) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [added, setAdded] = useState(false);

  const handleSingleSubmit = async (submitEvent: any) => {
    submitEvent.preventDefault();

    const eventToAdd: EventType = {
      ...e,
      start: new Date(startDate),
      end: new Date(endDate),
      tripId: trip.id,
    };

    if (await handleSubmit(eventToAdd)) {
      setAdded(true);
      setTimeout(() => {
        setAdded(false);
      }, 2000);
    } else {
      setAdded(false);
    }
  };

  return (
    <li className={styles.eventItem}>
      <div className={styles.restaurantTitle}>
        <h3>{e.title} </h3>
        {added && (
          <Image src={'/assets/icon_checkmark.svg'} width={20} height={20} />
        )}
        <div>#{e.rating}</div>
      </div>

      <form
        onSubmit={(e) => handleSingleSubmit(e)}
        className={styles.datesForm}
      >
        <input
          type='datetime-local'
          className={styles.inputDate}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          min={new Date(trip.start).toISOString().slice(0, 16)}
        />
        <input
          type='datetime-local'
          className={styles.inputDate}
          value={endDate}
          min={startDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input className={'button ' + styles.submitDates} type='submit' />
      </form>
    </li>
  );
};
