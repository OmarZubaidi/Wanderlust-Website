import React from 'react';
import styles from '../../../styles/forms/hotelForm.module.scss';

type HotelFromProps = {
  budget: string;
  setResearch: () => void;
  setBudget: (value: string) => void;
};

export const HotelFromHeader: React.FC<HotelFromProps> = ({
  budget,
  setResearch,
  setBudget,
}) => {
  return (
    <div className={styles.hotelHeader}>
      <h2 className='titleH2'>Find your Hotel</h2>
      <div>
        <p>Price x night {budget}€</p>
        <input
          // onBlur={() => setResearch()}
          onPointerUp={() => setResearch()}
          step={20}
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
