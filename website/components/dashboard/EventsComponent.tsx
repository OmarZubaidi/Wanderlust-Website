import { format } from 'date-fns';
import React, { useState } from 'react';
import { createEvent } from '../../services/dbService';
import styles from '../../styles/dashboard/events.module.scss';
import { EventType } from '../../types/event.type';
import { TripProps } from '../../types/tripProp';
import { EventItem } from './events/EventItem';

type EventProps = TripProps & {
  events: EventType[];
};

export const EventsComponent: React.FC<EventProps> = ({ trip, events }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (event: EventType) => {
    const newEvent = await createEvent(event);
    return !!newEvent && !!newEvent.id;
  };

  return (
    <section className={styles.container}>
      <ul className={styles.eventList}>
        {events.map((e) => (
          <EventItem
            trip={trip}
            key={e.eventApiId}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            handleSubmit={handleSubmit}
            e={e}
          />
        ))}
      </ul>
    </section>
  );
};
