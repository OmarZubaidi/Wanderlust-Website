import React from 'react';
import { getAllTrips, getTrip } from '../../../services/dbService';
import { Trip } from '../../../types/trip.type';

type Props = {
  trip: Trip;
};

const FligthsForm: React.FC<Props> = ({ trip }) => {
  return <main className='flightbg'>Departure</main>;
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

export default FligthsForm;
