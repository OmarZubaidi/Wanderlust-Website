import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { HotelFormComponent } from '../../../components/forms/HotelFormComponents';
import { Loading } from '../../../components/Loading';
import { TripProps } from '../../../types/tripProp';
import {
  getStaticTripPaths,
  getStaticTripProps,
} from '../../../utils/getStatic';

const HotelsForm: React.FC<TripProps> = ({ trip }) => {
  const { isLoading } = useAuth0();

  if (isLoading) return <Loading />;
  return (
    <main className='hotelbg'>
      <HotelFormComponent trip={trip} />
    </main>
  );
};
export const getStaticPaths = getStaticTripPaths;
export const getStaticProps = getStaticTripProps;

export default HotelsForm;
