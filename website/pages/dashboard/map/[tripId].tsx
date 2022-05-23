import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { DashboardComponent } from '../../../components/dashboard/DashboardComponent';
import { Loading } from '../../../components/Loading';
import { getTrip } from '../../../services/dbService';
import dynamic from 'next/dynamic';
import { useUserContext } from '../../../context/userContext';
import { useRouter } from 'next/router';
import { TripNavigation } from '../../../components/dashboard/TripNavigation';
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
  const router = useRouter();

  if (isLoading || isFetching) return <Loading />;

  return (
    <>
      <DashboardComponent trips={userDb?.Trips || []}>
        <div>
          <TripNavigation trip={trip} />
          <DynamicMap events={events} trip={trip} />
        </div>
      </DashboardComponent>
    </>
  );
};

export const getServerSideProps = async ({ params }: any) => {
  const id = params.tripId;
  const trip = await getTrip(+id);
  return {
    props: {
      trip,
      events: trip.Events,
    },
  };
};
export default DashboardMap;
