import React, { useState } from 'react';
import styles from '../../styles/forms/departureFlightForm.module.scss';
import InputRange from 'react-input-range';

export const DepartureFlightFormComponent = () => {
  const [budget, setBudget] = useState('0');
  return (
    <section className={styles.container}>
      <h2 className={'titleH2 ' + styles.title}>Departure</h2>
      <div className={styles.inputHeader}>
        <div className={styles.departure}>
          <input
            className={styles.input_field}
            type='text'
            id='origin'
            placeholder='From...'
          />
          <button className={'button ' + styles.button}>Search</button>
        </div>
        <div>
          <p>Price {budget}€</p>
          <input
            type='range'
            className={styles.range}
            value={budget}
            max={1000}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>
      </div>

      <ul></ul>
      {/* SHOW THE BUTTON WHEN THE USER CHOOSE THE FLIGHT */}
      <button type='button' className={styles.continue}>
        Book the return
        <div className={styles.arrow}></div>
      </button>
    </section>
  );
};
