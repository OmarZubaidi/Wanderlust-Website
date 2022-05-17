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
import {
  getStaticTripPaths,
  getStaticTripProps,
} from '../../../utils/getStatic';

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

const DashboardCalendar: React.FC<TripProps> = ({ trip }) => {
  const { userDb, isFetching } = useUserContext();
  const { isLoading } = useAuth0();
  if (isLoading || isFetching) return <Loading />;

  return (
    <DashboardComponent trips={userDb?.Trips || []}>
      <div>
        <TripNavigation trip={trip} />
        <DynamicCalendar trip={trip} />
      </div>
    </DashboardComponent>
  );
};

export const getStaticPaths = getStaticTripPaths;
export const getStaticProps = getStaticTripProps;

export default DashboardCalendar;
