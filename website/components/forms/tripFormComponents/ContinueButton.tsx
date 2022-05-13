import React from 'react';
import styles from '../../../styles/forms/tripForm.module.scss';

export const ContinueButton = () => {
  return (
    <div className={styles.button}>
      <input
        type='submit'
        className={'button ' + styles.continue}
        value='Continue'
      />
    </div>
  );
};
