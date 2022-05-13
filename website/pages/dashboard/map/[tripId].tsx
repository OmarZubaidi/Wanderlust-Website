import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { DashboardComponent } from '../../../components/dashboard/DashboardComponent';
import { Loading } from '../../../components/Loading';
import { getAllTrips, getTrip } from '../../../services/dbService';
import { Trip } from '../../../types/trip.type';
import dynamic from 'next/dynamic';
import { useUserContext } from '../../../context/userContext';
import { TripNavigation } from '../../../components/dashboard/TripNavigation';
import {
  getStaticTripPaths,
  getStaticTripProps,
} from '../../../utils/getStatic';

const DynamicMap = dynamic(() => import('../../../components/dashboard/Map'), {
  ssr: false,
});

type Props = {
  trip: Trip;
};
const DashboardMap: React.FC<Props> = ({ trip }) => {
  const { isLoading } = useAuth0();
  const { userDb, isFetching } = useUserContext();

  if (isLoading || isFetching) return <Loading />;
  return (
    <>
      <DashboardComponent trips={userDb?.Trips!}>
        <div>
          <TripNavigation trip={trip} />
          <DynamicMap />
        </div>
      </DashboardComponent>
    </>
  );
};

export const getStaticPaths = getStaticTripPaths;
export const getStaticProps = getStaticTripProps;

export default DashboardMap;
