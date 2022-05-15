import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { DashboardComponent } from '../../../components/dashboard/DashboardComponent';
import { HotelOverView } from '../../../components/dashboard/HotelOverView';
import { TripNavigation } from '../../../components/dashboard/TripNavigation';
import { Loading } from '../../../components/Loading';
import { useUserContext } from '../../../context/userContext';
import { TripProps } from '../../../types/tripProp';
import {
  getStaticTripPaths,
  getStaticTripProps,
} from '../../../utils/getStatic';

const DashboardHotel: React.FC<TripProps> = ({ trip }) => {
  const { isLoading } = useAuth0();
  const { userDb, isFetching } = useUserContext();

  if (isLoading || isFetching) return <Loading />;

  const trips = userDb?.Trips?.map((t) => t.id).includes(trip.id)
    ? userDb?.Trips!
    : [...userDb?.Trips!, trip];

  return (
    <DashboardComponent trips={trips}>
      <div>
        <TripNavigation trip={trip} />
        <HotelOverView trip={trip} />
      </div>
    </DashboardComponent>
  );
};

export const getStaticPaths = getStaticTripPaths;
export const getStaticProps = getStaticTripProps;

export default DashboardHotel;
