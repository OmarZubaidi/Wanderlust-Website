import React from 'react';
import styles from '../../styles/dashboard/events.module.scss';
import { EventType } from '../../types/event.type';

type EventProps = {
  events: EventType[];
};

export const EventsComponent: React.FC<EventProps> = ({ events }) => {
  return (
    <section className={styles.container}>
      {events.map((e) => e.title).join(', ')}
      <ul className={styles.eventList}>
        <li className={styles.eventItem}>
          <div className={styles.eventHeader}></div>
          <h3>Title</h3>
          <p>Description</p>
          <div className={styles.eventFooter}>
            <a className={'button ' + styles.book}>Book</a>
            <h5>€price</h5>
          </div>
        </li>
      </ul>
    </section>
  );
};
