import React from 'react';
import styles from '../../../styles/forms/tripForm.module.scss';

type DepartureInputProps = {
  startDate: string;
  handleChange: (input: string, value: string) => void;
};

export const DepartureInput: React.FC<DepartureInputProps> = ({
  startDate,
  handleChange,
}) => {
  return (
    <div className={styles.input}>
      <label htmlFor='departure'>Departure</label>
      <input
        required
        className={styles.input_field}
        id='departure'
        type='date'
        value={startDate}
        onChange={(e) => handleChange('startDate', e.target.value)}
      />
    </div>
  );
};
