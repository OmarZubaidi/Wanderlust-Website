import { getTrip } from '../services/dbService';

export const getServerSideTrip = async ({ params }: any) => {
  const id = params.tripId;
  const trip = await getTrip(+id);

  return {
    props: {
      trip,
    },
  };
};
