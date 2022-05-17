import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import {
  createTrip,
  createUsersOnTrips,
  getUserByEmail,
} from '../../services/dbService';
import { User } from '../../types/user.type';
import styles from '../../styles/forms/friendsForm.module.scss';
import {
  cacheAddedFriends,
  CacheTrip,
  cacheTrip,
  deleteCachedAddedFriends,
  deleteCachedTrip,
  getCachedAddedFriends,
  getCachedTrip,
} from '../../utils/localStorage';
import { AddFriendForm } from './friendsFormComponents/AddFriendForm';
import { FinalizeTrip } from './friendsFormComponents/FinalizeTrip';
import { AddedFriendsList } from './friendsFormComponents/AddedFriendsList';
import { useUserContext } from '../../context/userContext';

export const FriendsFormComponent: React.FC = () => {
  const { userDb, addTripToUser } = useUserContext();
  const router = useRouter();
  const tripQuery = {
    startDate: router.query.startDate as string,
    endDate: router.query.endDate as string,
    destination: router.query.destination as string,
    latitude: +router.query.latitude! as number,
    longitude: +router.query.longitude! as number,
  };
  const [trip, setTrip] = useState<CacheTrip>(tripQuery);
  const [emailFriend, setEmailFriend] = useState<string>('');
  const [addedFriends, setAddedFriends] = useState<User[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    cacheTrip(tripQuery);
    setTrip(getCachedTrip());
    const friendsFromLocalStorage = getCachedAddedFriends();
    if (friendsFromLocalStorage && friendsFromLocalStorage.length > 0) {
      setAddedFriends(friendsFromLocalStorage);
    }
  }, []);

  useEffect(() => {
    cacheAddedFriends(addedFriends);
  }, [addedFriends]);

  const addFriend = async (e: Event) => {
    e.preventDefault();
    if (emailFriend.length === 0) {
      setError('Please add an email');
      return;
    }
    const user = await getUserByEmail(emailFriend);
    if (typeof user === 'string') {
      setError('No user with this email, please try again');
    } else {
      if (addedFriends.length >= 10) {
        setError('You already reached the maximum');
        setEmailFriend('');
        return;
      }
      setAddedFriends((prev) => {
        if (!prev.map((u) => u.email).includes(emailFriend)) {
          return [...prev, user];
        } else {
          return prev;
        }
      });
      setEmailFriend('');
      setError('');
    }
  };

  const finalizeTrip = async () => {
    const newTrip = await createTrip(trip!);
    return newTrip.id ? newTrip : false;
  };

  const finalizeGroup = async (tripId: number) => {
    const userIds = [userDb!.id, ...addedFriends.map((u) => u.id!)];
    await createUsersOnTrips(tripId, userIds as number[]);
  };

  const finalize = async () => {
    const newTrip = await finalizeTrip();
    if (newTrip && newTrip.id) {
      const usersOnTrips = await finalizeGroup(newTrip.id);
      if (typeof usersOnTrips !== 'string') {
        deleteCachedAddedFriends();
        deleteCachedTrip();
        return newTrip;
      }
    }
    setError('Something went wrong...');
    return false;
  };

  const finalizeAndGoToDashboard = async () => {
    const newTrip = await finalize();

    if (newTrip) {
      addTripToUser(newTrip);
      router.replace(`/dashboard/map/${newTrip.id}`);
    }
  };

  const finalizeAndGoToFlight = async () => {
    const newTrip = await finalize();

    if (newTrip) {
      addTripToUser(newTrip);
      router.replace(`/trip/flight/${newTrip.id}`);
    }
  };

  return (
    <section className={styles.friendsForm}>
      <Link href='/trip'>
        <a>
          <img className={styles.goBack} src='/assets/arrow.svg' alt='' />
        </a>
      </Link>
      <div className={styles.left}>
        <h2 className={'titleH2 ' + styles.title}>Add your friends</h2>

        <AddFriendForm
          setEmailFriend={setEmailFriend}
          emailFriend={emailFriend}
          addFriend={addFriend}
        />

        <p className='error'>{error}</p>
        <FinalizeTrip
          finalizeAndGoToDashboard={finalizeAndGoToDashboard}
          finalizeAndGoToFlight={finalizeAndGoToFlight}
        />
      </div>
      <AddedFriendsList addedFriends={addedFriends} />
    </section>
  );
};
