import React from 'react';
import styles from '../../../styles/forms/tripForm.module.scss';

type DestinationInputProps = {
  destination: string;
  handleChange: (input: string, value: string) => void;
};

export const DestinationInput: React.FC<DestinationInputProps> = ({
  destination,
  handleChange,
}) => {
  return (
    <div className={styles.input}>
      <label htmlFor='destination'>Travel destination</label>
      <input
        required
        className={styles.input_field}
        id='destination'
        type='text'
        value={destination}
        onChange={(e) => handleChange('destination', e.target.value)}
      />
    </div>
  );
};
