import React from 'react';
import { FriendsFormComponent } from '../../components/forms/FriendsFormComponent';
import { Loading } from '../../components/Loading';
import { useAuth0 } from '@auth0/auth0-react';

const FriendsForm: React.FC = () => {
  const { isLoading } = useAuth0();

  if (isLoading) return <Loading />;
  return (
    <main className='friendsbg'>
      <FriendsFormComponent />
    </main>
  );
};

export default FriendsForm;
