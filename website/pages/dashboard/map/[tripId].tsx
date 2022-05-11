import { useAuth0 } from '@auth0/auth0-react';
import { AppContext } from 'next/app';
import React from 'react';
import { DashboardComponent } from '../../../components/dashboard/DashboardComponent';
import { Loading } from '../../../components/Loading';
import { useUserContext } from '../../../context/userContext';
import { getAllTrips, getTrip } from '../../../services/dbService';
import { Trip } from '../../../types/trip.type';
import Head from 'next/head';
import { TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import Map from '../../../components/dashboard/Map';

type Props = {
  trip: Trip;
};
const DashboardMap: React.FC<Props> = ({ trip }) => {
  const { isLoading } = useAuth0();
  const position = [51.505, -0.09];

  if (isLoading) return <Loading />;
  return (
    <>
      <Head>
        {/* <link
          rel='stylesheet'
          href='https://unpkg.com/leaflet@1.8.0/dist/leaflet.css'
          integrity='sha512-hoalWLoI8r4UszCkZ5kL8vayOGVae1oxXe/2A4AO6J9+580uKHDO3JdHb7NzwwzK5xr/Fs0W40kiNHxM9vyTtQ=='
          crossOrigin=''
        /> */}
      </Head>
      <DashboardComponent trips={[]}>
        <Map />
      </DashboardComponent>
    </>
  );
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

export default DashboardMap;
