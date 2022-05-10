import React from 'react';
import { DashboardComponent } from '../../components/dashboard/DashboardComponent';
import { NoTrip } from '../../components/dashboard/NoTrip';

const Dashboard = () => {
  return (
    <DashboardComponent>
      <NoTrip />
    </DashboardComponent>
  );
};

export default Dashboard;
