import React from 'react';
import styles from '../../../styles/forms/addedFriend.module.scss';
import { User } from '../../../types/user.type';

type AddedFriendProps = {
  user: User;
};

export const AddedFriend: React.FC<AddedFriendProps> = ({ user }) => {
  return (
    <li key={user.id} className={styles.user}>
      <div
        className={styles.avatar}
        style={{
          backgroundImage: `url(${user.pictureUrl})`,
          backgroundSize: 'contain',
        }}
      ></div>
      {user.username}
    </li>
  );
};
