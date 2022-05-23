import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { ReturnFlightFormComponent } from '../../../../components/forms/ReturnFlightFormComponent';
import { Loading } from '../../../../components/Loading';
import { TripProps } from '../../../../types/tripProp';
import { getServerSideTrip } from '../../../../utils/serverSide';

const ReturnFlightForm: React.FC<TripProps> = ({ trip }) => {
  const { isLoading } = useAuth0();

  if (isLoading) return <Loading />;
  return (
    <main className='flightbg'>
      <ReturnFlightFormComponent trip={trip} />
    </main>
  );
};

export const getServerSideProps = getServerSideTrip;

export default ReturnFlightForm;
