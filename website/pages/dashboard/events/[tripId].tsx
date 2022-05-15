import { useAuth0 } from '@auth0/auth0-react';
import dynamic from 'next/dynamic';
import React from 'react';
import { DashboardComponent } from '../../../components/dashboard/DashboardComponent';
import { EventsComponent } from '../../../components/dashboard/EventsComponent';
import { TripNavigation } from '../../../components/dashboard/TripNavigation';
import { Loading } from '../../../components/Loading';
import { useUserContext } from '../../../context/userContext';
import { getEvents, getTrip } from '../../../services/dbService';
import { EventType } from '../../../types/event.type';
import { TripProps } from '../../../types/tripProp';
import {
  getStaticTripPaths,
  getStaticTripProps,
} from '../../../utils/getStatic';

type EventsProps = TripProps & {
  events: EventType[];
};

const DashboardEvents: React.FC<EventsProps> = ({ trip, events }) => {
  const { userDb, isFetching } = useUserContext();
  const { isLoading } = useAuth0();

  if (isLoading || isFetching) return <Loading />;

  return (
    <DashboardComponent trips={userDb?.Trips!}>
      <div>
        <TripNavigation trip={trip} />
        <EventsComponent />
      </div>
    </DashboardComponent>
  );
};

export const getStaticPaths = getStaticTripPaths;
export const getStaticProps = async ({ params }: any) => {
  const id = params.tripId;
  const trip = await getTrip(+id);
  const events = await getEvents();

  return {
    props: {
      trip,
      events,
    },
  };
};

export default DashboardEvents;
