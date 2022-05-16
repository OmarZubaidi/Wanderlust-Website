import { format } from 'date-fns';
import React, { useState } from 'react';
import { createEvent } from '../../services/dbService';
import styles from '../../styles/dashboard/events.module.scss';
import { EventType } from '../../types/event.type';
import { TripProps } from '../../types/tripProp';
import { EventItem } from './events/EventItem';
import { RestaurantItem } from './events/RestaurantItem';

type EventProps = TripProps & {
  events: EventType[];
  restaurants: EventType[];
};

export const EventsComponent: React.FC<EventProps> = ({
  trip,
  events,
  restaurants,
}) => {
  const [toggleEvents, setToggleEvents] = useState(true);

  const handleSubmit = async (event: EventType) => {
    const newEvent = await createEvent(event);
    return !!newEvent && !!newEvent.id;
  };

  return (
    <section className={styles.container}>
      <button
        className={'button ' + styles.toggleButton}
        onClick={() => setToggleEvents((prev) => !prev)}
      >
        {toggleEvents ? 'Restaurants' : 'Events'}
      </button>
      {toggleEvents ? (
        <ul className={styles.eventList}>
          {events.map((e) => (
            <EventItem
              trip={trip}
              key={e.eventApiId}
              handleSubmit={handleSubmit}
              e={e}
            />
          ))}
        </ul>
      ) : (
        <ul className={styles.eventList}>
          {restaurants.map((r) => (
            <RestaurantItem
              trip={trip}
              key={r.eventApiId}
              handleSubmit={handleSubmit}
              e={r}
            />
          ))}
        </ul>
      )}
    </section>
  );
};
