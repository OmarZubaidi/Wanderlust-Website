import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect, useState } from 'react';
import { DashboardComponent } from '../../../components/dashboard/DashboardComponent';
import { Loading } from '../../../components/Loading';
import { getAllTrips, getTrip } from '../../../services/dbService';
import { Trip } from '../../../types/trip.type';
import dynamic from 'next/dynamic';
import { useUserContext } from '../../../context/userContext';
import { TripNavigation } from '../../../components/dashboard/TripNavigation';

const DynamicMap = dynamic(() => import('../../../components/dashboard/Map'), {
  ssr: false,
});

type Props = {
  trip: Trip;
};
const DashboardMap: React.FC<Props> = ({ trip }) => {
  const { isLoading } = useAuth0();
  const { userDb } = useUserContext();

  if (isLoading) return <Loading />;
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

export const getStaticPaths = async () => {
  const trips = await getAllTrips();
  const paths = trips.map((trip) => ({
    params: { tripId: trip.id?.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const id = params.tripId;
  const trip = await getTrip(+id);

  return {
    props: {
      trip,
    },
  };
};

export default DashboardMap;
