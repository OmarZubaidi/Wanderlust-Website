import Link from 'next/link';
import React from 'react';
import { Trip } from '../../types/trip.type';
import styles from '../../styles/dashboard/tripNavigation.module.scss';
import Image from 'next/image';
import { deleteCachedFlight } from '../../utils/localStorage';
import { useRouter } from 'next/router';

type Props = {
  trip: Trip;
};

export const TripNavigation: React.FC<Props> = ({ trip }) => {
  const router = useRouter();

  const goToAddFriends = () => {
    router.push(`/group/${trip.id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigationHeader}>
        <h2 className='titleH2'>{trip.destination}</h2>
        <div>
          <div className={styles.usersAvatar}>
            {trip.Users &&
              trip.Users.map((user) => (
                <div
                  className='avatar'
                  key={user.id}
                  style={{
                    backgroundImage: `url(${user.pictureUrl})`,
                    backgroundSize: 'contain',
                    cursor: 'auto',
                  }}
                ></div>
              ))}
            <div>
              <button onClick={goToAddFriends} className={styles.addUserButton}>
                <Image src={'/assets/userIcon.svg'} width={30} height={30} />
              </button>
            </div>
          </div>
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
            <Link href={`/dashboard/calendar/${trip.id}`}>
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
              <a onClick={() => deleteCachedFlight()}>
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
            <Link href={`/dashboard/hotel/${trip.id}`}>
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
          <li className={styles.linkItem}>
            <Link href={`/dashboard/events/${trip.id}`}>
              <a>
                <Image
                  src='/assets/event.svg'
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
