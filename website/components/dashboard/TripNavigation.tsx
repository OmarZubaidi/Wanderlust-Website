import Link from 'next/link';
import React from 'react';
import { Trip } from '../../types/trip.type';
import styles from '../../styles/dashboard/TripNavigation.module.scss';
import Image from 'next/image';

type Props = {
  trip: Trip;
};

export const TripNavigation: React.FC<Props> = ({ trip }) => {
  return (
    <div className={styles.container}>
      <div className={styles.navigationHeader + ' titleH2'}>
        <h2>{trip.destination}</h2>
        <div className={styles.usersAvatar}>
          {trip.Users &&
            trip.Users.map((user) => (
              <div
                className='avatar'
                key={user.id}
                style={{
                  backgroundImage: `url(${user.pictureUrl})`,
                  backgroundSize: 'contain',
                }}
              ></div>
            ))}
        </div>
      </div>
      <nav>
        <ul className={styles.tripLinks}>
          <li className={styles.linkItem}>
            <Link href={`/dashboard/map/${trip.id}`}>
              <a>
                <Image
                  src='/assets/Map.svg'
                  alt='Map Icon'
                  width={35}
                  height={35}
                />
              </a>
            </Link>
          </li>
          <li className={styles.linkItem}>
            <Link href={'/'}>
              <a>
                <Image
                  src='/assets/Calendar.svg'
                  alt='Calendar Icon'
                  width={35}
                  height={35}
                />
              </a>
            </Link>
          </li>
          <li className={styles.linkItem}>
            <Link href={`/dashboard/flight/${trip.id}`}>
              <a>
                <Image
                  src='/assets/Plane.svg'
                  alt='Flight Icon'
                  width={40}
                  height={40}
                />
              </a>
            </Link>
          </li>
          <li className={styles.linkItem}>
            <Link href={'/'}>
              <a>
                <Image
                  src='/assets/Hotel.svg'
                  alt='Hotel Icon'
                  width={35}
                  height={35}
                />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
