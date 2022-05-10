import React from 'react';
import styles from '../../../styles/forms/finalizeTrip.module.scss';

type FinalizeTripProps = {
  finalizeAndGoToDashboard: () => void;
  finalizeAndGoToFlight: () => void;
};

export const FinalizeTrip: React.FC<FinalizeTripProps> = ({
  finalizeAndGoToDashboard,
  finalizeAndGoToFlight,
}) => {
  return (
    <div>
      <p className={styles.submit_description}>
        Create the trip with the current status or continue expanding the trip
        details with flights.
      </p>
      <div className={styles.submit}>
        <input
          type='submit'
          value='Finalize'
          className={'button ' + styles.finalize}
          onClick={finalizeAndGoToDashboard}
        />
        <button
          onClick={finalizeAndGoToFlight}
          type='submit'
          className={styles.continue}
        >
          Continue to Flights
          <div className={styles.arrow}></div>
        </button>
      </div>
    </div>
  );
};
