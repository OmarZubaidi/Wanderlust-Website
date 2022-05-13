import React from 'react';
import styles from '../../../styles/forms/addFriend.module.scss';

type AddFriendFormProps = {
  setEmailFriend: (value: string) => void;
  emailFriend: string;
  addFriend: (e: any) => void;
};

export const AddFriendForm: React.FC<AddFriendFormProps> = ({
  setEmailFriend,
  emailFriend,
  addFriend,
}) => {
  return (
    <form className={styles.addFriendForm}>
      <div className={styles.input}>
        <label htmlFor='friend'>
          Add your friend by email{' '}
          <span className={styles.maxPeople}> Max 10</span>
        </label>
        <input
          type='text'
          id='friend'
          placeholder='Email'
          onChange={(e) => setEmailFriend(e.target.value)}
          value={emailFriend}
          className={styles.input_field}
        />
      </div>
      <button
        onClick={(e: any) => {
          addFriend(e);
        }}
        type='submit'
        className={styles.addFriend}
      ></button>
    </form>
  );
};
