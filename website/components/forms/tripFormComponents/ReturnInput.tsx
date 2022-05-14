import React from 'react';
import styles from '../../../styles/forms/tripForm.module.scss';

type ReturnInputProps = {
  endDate: string;
  handleChange: (input: string, value: string) => void;
  min: string;
};

export const ReturnInput: React.FC<ReturnInputProps> = ({
  endDate,
  handleChange,
  min,
}) => {
  return (
    <div className={styles.input}>
      <label htmlFor='return'>Return</label>
      <input
        required
        className={styles.input_field}
        id='return'
        type='date'
        value={endDate}
        min={min}
        onChange={(e) => handleChange('endDate', e.target.value)}
      />
    </div>
  );
};
