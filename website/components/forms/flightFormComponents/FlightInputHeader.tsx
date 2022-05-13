import React from 'react';
import styles from '../../../styles/forms/departureFlightForm.module.scss';

type Props = {
  originCity: string;
  handleSearch: () => void;
  setOriginCity: (value: string) => void;
  budget: string;
  setBudget: (value: string) => void;
  placeholder: string;
};

export const FlightInputHeader: React.FC<Props> = ({
  originCity,
  handleSearch,
  setOriginCity,
  budget,
  setBudget,
  placeholder,
}) => {
  return (
    <div className={styles.inputHeader}>
      <div className={styles.departure}>
        <input
          className={styles.input_field}
          type='text'
          id='origin'
          placeholder={placeholder}
          value={originCity}
          onChange={(e) => setOriginCity(e.target.value)}
        />
        <button onClick={handleSearch} className={'button ' + styles.button}>
          Search
        </button>
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
  );
};
