import { useAuth0 } from '@auth0/auth0-react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { DashboardComponent } from '../../../components/dashboard/DashboardComponent';
import { TripNavigation } from '../../../components/dashboard/TripNavigation';
import { Loading } from '../../../components/Loading';
import { useUserContext } from '../../../context/userContext';
import { getTrip } from '../../../services/dbService';
import { EventType } from '../../../types/event.type';
import { TripProps } from '../../../types/tripProp';
import { getAmadeusEvents } from '../../../utils/amadeus';
import { eventParser } from '../../../utils/eventParser';
import { getStaticTripPaths } from '../../../utils/getStatic';

const DynamicCalendar = dynamic(
  //@ts-ignore
  () => import('../../../components/dashboard/CalendarOverView'),
  {
    ssr: false,
  }
);

type CalendarProps = TripProps & {
  allEvents: EventType[];
};

const DashboardCalendar: React.FC<CalendarProps> = ({ trip, allEvents }) => {
  const { userDb, isFetching } = useUserContext();
  const { isLoading } = useAuth0();
  const router = useRouter();

  if (isLoading || isFetching) return <Loading />;
  return (
    <DashboardComponent trips={userDb?.Trips || []}>
      <div>
        <TripNavigation trip={trip} />
        <DynamicCalendar trip={trip} allEvents={allEvents} router={router} />
      </div>
    </DashboardComponent>
  );
};

// export const getStaticPaths = getStaticTripPaths;
export const getServerSideProps = async ({ params }: any) => {
  const id = params.tripId;
  const trip = await getTrip(+id);
  const amadeusEvents = await getAmadeusEvents(trip.latitude, trip.longitude);
  const allEvents = eventParser(amadeusEvents);
  return {
    props: {
      trip,
      allEvents,
    },
  };
};

export default DashboardCalendar;
