import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { DashboardComponent } from '../../../components/dashboard/DashboardComponent';
import { Loading } from '../../../components/Loading';
import { getEvents, getTrip } from '../../../services/dbService';
import dynamic from 'next/dynamic';
import { useUserContext } from '../../../context/userContext';
import { TripNavigation } from '../../../components/dashboard/TripNavigation';
import { getStaticTripPaths } from '../../../utils/getStatic';
import { TripProps } from '../../../types/tripProp';
import { EventType } from '../../../types/event.type';

const DynamicMap = dynamic(() => import('../../../components/dashboard/Map'), {
  ssr: false,
});

type Props = TripProps & {
  events: EventType[];
};

const DashboardMap: React.FC<Props> = ({ trip, events }) => {
  const { isLoading } = useAuth0();
  const { userDb, isFetching } = useUserContext();

  if (isLoading || isFetching) return <Loading />;
  return (
    <>
      <DashboardComponent trips={userDb?.Trips!}>
        <div>
          <TripNavigation trip={trip} />
          <DynamicMap events={events} />
        </div>
      </DashboardComponent>
    </>
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

export default DashboardMap;
