import React from 'react';
import { User } from '../../../types/user.type';
import { AddedFriend } from './addedFriend';
import styles from '../../../styles/forms/addedFriendsList.module.scss';

type AddedFriendsListProps = {
  addedFriends: User[];
};

export const AddedFriendsList: React.FC<AddedFriendsListProps> = ({
  addedFriends,
}) => {
  return (
    <div className={styles.right}>
      <h4 className={styles.friends_title}>Added friends</h4>
      <ul className={styles.userList}>
        {addedFriends
          .filter((u) => u.id)
          .map((user) => (
            <AddedFriend user={user} key={user.id} />
          ))}
      </ul>
    </div>
  );
};
