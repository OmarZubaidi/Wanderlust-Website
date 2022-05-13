import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { DepartureFlightFormComponent } from '../../../components/forms/departureFlightFormComponent';
import { Loading } from '../../../components/Loading';
import { TripProps } from '../../../types/tripProp';
import {
  getStaticTripPaths,
  getStaticTripProps,
} from '../../../utils/getStatic';

const FligthsForm: React.FC<TripProps> = ({ trip }) => {
  const { isLoading } = useAuth0();

  if (isLoading) return <Loading />;
  return (
    <main className='flightbg'>
      <DepartureFlightFormComponent trip={trip} />
    </main>
  );
};

export const getStaticPaths = getStaticTripPaths;
export const getStaticProps = getStaticTripProps;

export default FligthsForm;
