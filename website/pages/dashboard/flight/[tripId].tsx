import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { DashboardComponent } from '../../../components/dashboard/DashboardComponent';
import { Loading } from '../../../components/Loading';
import { useUserContext } from '../../../context/userContext';
import { TripNavigation } from '../../../components/dashboard/TripNavigation';
import { FlightOverView } from '../../../components/dashboard/FlightOverView';
import {
  getStaticTripPaths,
  getStaticTripProps,
} from '../../../utils/getStatic';
import { TripProps } from '../../../types/tripProp';

const DashboardMap: React.FC<TripProps> = ({ trip }) => {
  const { isLoading } = useAuth0();
  const { userDb, isFetching } = useUserContext();

  if (isLoading || isFetching) return <Loading />;

  return (
    <>
      <DashboardComponent trips={userDb?.Trips || []}>
        <div>
          <TripNavigation trip={trip} />
          <FlightOverView trip={trip} />
        </div>
      </DashboardComponent>
    </>
  );
};

export const getStaticPaths = getStaticTripPaths;
export const getStaticProps = getStaticTripProps;

export default DashboardMap;
