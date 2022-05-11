import { useRouter } from 'next/router';
import React from 'react';
import { DashboardComponent } from '../../components/dashboard/DashboardComponent';
import { NoTrip } from '../../components/dashboard/NoTrip';
import { Loading } from '../../components/Loading';
import { useUserContext } from '../../context/userContext';

const Dashboard = () => {
  const { userDb, isFetching } = useUserContext();
  const router = useRouter();
  console.log(userDb);

  if (isFetching) return <Loading />;

  if (userDb?.Trips?.length) {
    const tripId = userDb?.Trips[0].id;
    router.push(`/dashboard/map/${tripId}`);
    return <Loading />;
  } else {
    return (
      <DashboardComponent trips={[]}>
        <NoTrip />
      </DashboardComponent>
    );
  }
};

export default Dashboard;
