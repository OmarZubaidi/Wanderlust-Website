import React from 'react';
import { Loading } from '../../components/Loading';
import { useAuth0 } from '@auth0/auth0-react';
import { GroupFormComponent } from '../../components/forms/GroupFormComponent';
import { TripProps } from '../../types/tripProp';
import { getServerSideTrip } from '../../utils/serverSide';

const GroupForm: React.FC<TripProps> = ({ trip }) => {
  const { isLoading } = useAuth0();

  if (isLoading) return <Loading />;

  return (
    <main className='friendsbg'>
      <GroupFormComponent trip={trip} />
    </main>
  );
};

export const getServerSideProps = getServerSideTrip;

export default GroupForm;
