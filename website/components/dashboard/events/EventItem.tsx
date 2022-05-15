import React, { useState } from 'react';
import { EventType } from '../../../types/event.type';
import styles from '../../../styles/dashboard/events.module.scss';
import { Trip } from '../../../types/trip.type';

type EventItemProps = {
  e: EventType;
  startDate: string;
  endDate: string;
  setStartDate: (value: string) => void;
  setEndDate: (value: string) => void;
  handleSubmit: (event: EventType) => Promise<boolean>;
  trip: Trip;
};

export const EventItem: React.FC<EventItemProps> = ({
  e,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  handleSubmit,
  trip,
}) => {
  const [formOpen, setFormOpen] = useState(false);

  const handleSingleSubmit = async (submitEvent: any) => {
    submitEvent.preventDefault();

    const eventToAdd: EventType = {
      ...e,
      start: new Date(startDate),
      end: new Date(endDate),
      tripId: trip.id,
    };

    if (await handleSubmit(eventToAdd)) {
      setFormOpen(false);
    } else {
      setFormOpen(true);
    }
  };

  return (
    <li className={styles.eventItem}>
      <div
        className={styles.eventHeader}
        style={{ backgroundImage: `url(${e.pictures})` }}
      ></div>
      <h3>{e.title}</h3>
      <p>{e.description}</p>
      <div className={styles.eventFooter}>
        <a
          target='_blank'
          href={`${e.bookingLink}`}
          className={'button ' + styles.book}
        >
          Book
        </a>
        <button
          className={styles.toggleDates}
          onClick={() => {
            setFormOpen((prev) => !prev);
          }}
        >
          Add dates
        </button>
        <h5>€{e.price}</h5>
      </div>
      {formOpen && (
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
      )}
    </li>
  );
};
