import dynamic from 'next/dynamic';
import React from 'react';
import CalendarOverView from '../../../components/dashboard/CalendarOverView';
import { DashboardComponent } from '../../../components/dashboard/DashboardComponent';
import { TripNavigation } from '../../../components/dashboard/TripNavigation';
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

const DashboardCalendar: React.FC<CalendarProps> = ({ trip, events }) => {
  const { userDb } = useUserContext();

  return (
    <DashboardComponent trips={userDb?.Trips!}>
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
