import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { DashboardComponent } from '../../../components/dashboard/DashboardComponent';
import { HotelOverView } from '../../../components/dashboard/HotelOverView';
import { TripNavigation } from '../../../components/dashboard/TripNavigation';
import { Loading } from '../../../components/Loading';
import { useUserContext } from '../../../context/userContext';
import { TripProps } from '../../../types/tripProp';
import { getServerSideTrip } from '../../../utils/serverSide';

const DashboardHotel: React.FC<TripProps> = ({ trip }) => {
  const { isLoading } = useAuth0();
  const { userDb, isFetching } = useUserContext();

  if (isLoading || isFetching) return <Loading />;

  return (
    <DashboardComponent trips={userDb?.Trips || []}>
      <div>
        <TripNavigation trip={trip} />
        <HotelOverView trip={trip} />
      </div>
    </DashboardComponent>
  );
};

export const getServerSideProps = getServerSideTrip;

export default DashboardHotel;
