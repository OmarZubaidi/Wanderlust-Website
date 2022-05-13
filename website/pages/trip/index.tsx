import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { TripFormComponent } from '../../components/forms/TripFormComponent';
import { Loading } from '../../components/Loading';

const TripForm: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) return <Loading />;
  return (
    <main className='tripbg'>
      <TripFormComponent />
    </main>
  );
};

export default TripForm;
