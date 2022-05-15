import { useAuth0 } from '@auth0/auth0-react';
import dynamic from 'next/dynamic';
import React from 'react';
import { DashboardComponent } from '../../../components/dashboard/DashboardComponent';
import { TripNavigation } from '../../../components/dashboard/TripNavigation';
import { Loading } from '../../../components/Loading';
import { useUserContext } from '../../../context/userContext';
import { getEvents, getTrip } from '../../../services/dbService';
import { EventType } from '../../../types/event.type';
import { TripProps } from '../../../types/tripProp';
import { getStaticTripPaths } from '../../../utils/getStatic';

const DynamicCalendar = dynamic(
  //@ts-ignore
  () => import('../../../components/dashboard/CalendarOverView'),
  {
    ssr: false,
  }
);

type CalendarProps = TripProps & {
  events: EventType[];
};

const DashboardCalendar: React.FC<CalendarProps> = ({ trip, events }) => {
  const { userDb, isFetching } = useUserContext();
  const { isLoading } = useAuth0();
  if (isLoading || isFetching) return <Loading />;

  const trips = userDb?.Trips?.map((t) => t.id).includes(trip.id)
    ? userDb?.Trips!
    : [...userDb?.Trips!, trip];

  return (
    <DashboardComponent trips={trips}>
      <div>
        <TripNavigation trip={trip} />
        <DynamicCalendar trip={trip} events={events} />
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

export default DashboardCalendar;
