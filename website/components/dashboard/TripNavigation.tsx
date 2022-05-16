import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../../styles/dashboard/tripNavigation.module.scss';
import Image from 'next/image';
import { deleteCachedFlight } from '../../utils/localStorage';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { TripProps } from '../../types/tripProp';

export const TripNavigation: React.FC<TripProps> = ({ trip }) => {
  const router = useRouter();
  const mapBlue = router.pathname.includes('map') ? 'Blue' : '';
  const calendarBlue = router.pathname.includes('calendar') ? 'Blue' : '';
  const flightsBlue = router.pathname.includes('flight') ? 'Blue' : '';
  const hotelsBlue = router.pathname.includes('hotel') ? 'Blue' : '';
  const eventsBlue = router.pathname.includes('events') ? 'Blue' : '';
  const [menuOpen, setMenuOpen] = useState(false);

  const goToAddFriends = () => {
    router.push(`/group/${trip.id}`);
  };

  const exitGroup = () => {
    // TODO exit the group
    router.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigationHeader}>
        <h2 className='titleH2'>
          {trip.destination}{' '}
          <span className={styles.dates}>
            {format(new Date(trip.start), 'dd MMM yy')} -{' '}
            {format(new Date(trip.end), 'dd MMM yy')}
          </span>
        </h2>
        <div>
          <div className={styles.usersAvatar}>
            {trip.Users &&
              trip.Users.map((user) => (
                <div
                  className={'avatar ' + styles.smallAvatar}
                  key={user.id}
                  style={{
                    backgroundImage: `url(${user.pictureUrl})`,
                    backgroundSize: 'contain',
                    cursor: 'auto',
                  }}
                ></div>
              ))}
            <div className={styles.menu}>
              <button
                className={styles.menuButton}
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                <Image src={'/assets/menu.svg'} width={35} height={35} />
              </button>
              {menuOpen && (
                <div className={styles.dropdown}>
                  <button
                    onClick={goToAddFriends}
                    className={styles.menuButtonItem}
                  >
                    <span className={styles.textMenu}>Add a friend</span>
                    <Image
                      src={'/assets/userIcon.svg'}
                      width={22}
                      height={22}
                    />
                  </button>
                  <button
                    onClick={goToAddFriends}
                    className={styles.menuButtonItem}
                  >
                    <span className={styles.textMenu}>Exit group</span>
                    <Image src={'/assets/exit.svg'} width={22} height={22} />
                  </button>
                </div>
              )}
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
                  src={`/assets/Map${mapBlue}.svg`}
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
                  src={`/assets/Calendar${calendarBlue}.svg`}
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
                  src={`/assets/Plane${flightsBlue}.svg`}
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
                  src={`/assets/Hotel${hotelsBlue}.svg`}
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
                  src={`/assets/event${eventsBlue}.svg`}
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
