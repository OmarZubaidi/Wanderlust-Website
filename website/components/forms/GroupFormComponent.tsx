import error from 'next/error';
import Link from 'next/link';
import React, { useState } from 'react';
import { TripProps } from '../../types/tripProp';
import { AddedFriendsList } from './friendsFormComponents/AddedFriendsList';
import { AddFriendForm } from './friendsFormComponents/AddFriendForm';
import { FinalizeTrip } from './friendsFormComponents/FinalizeTrip';
import styles from '../../styles/forms/friendsForm.module.scss';
import { User } from '../../types/user.type';
import { useRouter } from 'next/router';
import {
  createUserOnTrip,
  createUsersOnTrips,
  getUserByEmail,
} from '../../services/dbService';

export const GroupFormComponent: React.FC<TripProps> = ({ trip }) => {
  const [emailFriend, setEmailFriend] = useState<string>('');
  const [addedFriends, setAddedFriends] = useState<User[]>(trip.Users!);
  const [error, setError] = useState('');
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

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
      await createUserOnTrip(trip.id!, user.id!);
      setEmailFriend('');
      setError('');
    }
  };

  return (
    <section className={styles.friendsForm}>
      <a onClick={goBack}>
        <img className={styles.goBack} src='/assets/arrow.svg' alt='' />
      </a>
      <div className={styles.left}>
        <h2 className={'titleH2 ' + styles.title}>Add your friends</h2>

        <AddFriendForm
          setEmailFriend={setEmailFriend}
          emailFriend={emailFriend}
          addFriend={addFriend}
        />

        <p className='error'>{error}</p>
      </div>
      <AddedFriendsList addedFriends={addedFriends} />
    </section>
  );
};
