import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { format } from 'date-fns';
import styles from '../../styles/forms/departureFlightForm.module.scss';
import { Flight } from '../../types/flight.type';
import { TripProps } from '../../types/tripProp';
import { flightOffersSearch } from '../../utils/amadeus';
import { citycode } from '../../utils/citycodes';
import { parseFlights } from '../../utils/flightParser';
import { getCachedFlight } from '../../utils/localStorage';
import { FlightBookingList } from './flightFormComponents/FlightBookingList';
import { FlightFormHeader } from './flightFormComponents/FlightFormHeader';
import { FlightInputHeader } from './flightFormComponents/FlightInputHeader';
import { useUserContext } from '../../context/userContext';
import {
  bookGroupFlights,
  createFlightAndConnection,
} from '../../utils/flightsUtils';

export const ReturnFlightFormComponent: React.FC<TripProps> = ({ trip }) => {
  const router = useRouter();
  const { userDb } = useUserContext();
  const [originCity, setOriginCity] = useState(userDb?.origin || '');
  const [departure, setDeparture] = useState('');
  const [budget, setBudget] = useState('500');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight>();
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    const originLocationCode = citycode[trip.destination.toLowerCase()];
    if (
      !originLocationCode ||
      originCity.toLowerCase() === trip.destination.toLowerCase()
    ) {
      return; // TODO set Error and loading
    }
    const destinationLocationCode = citycode[originCity.toLowerCase()];
    const departureDate = format(new Date(trip.end), 'yyyy-MM-dd');
    setIsSearching(true);
    flightOffersSearch(
      originLocationCode,
      destinationLocationCode,
      departureDate,
      budget
    ).then((res) => {
      setFlights(parseFlights(res, trip.destination, originCity));
      setIsSearching(false);
    });

    setDeparture(originCity);
    setOriginCity('');
  };

  const bookFlight = (flight: Flight) => {
    setSelectedFlight(flight);
  };

  const finalizeBookings = async () => {
    const startFlight: Flight = getCachedFlight();
    if (
      !(await bookGroupFlights(
        startFlight.flightApiId,
        startFlight,
        trip.id!,
        userDb!.id!
      ))
    ) {
      await createFlightAndConnection(startFlight, userDb!.id!, trip.id!);
    }

    if (
      !(await bookGroupFlights(
        selectedFlight!.flightApiId,
        selectedFlight!,
        trip.id!,
        userDb!.id!
      ))
    ) {
      await createFlightAndConnection(selectedFlight!, userDb!.id!, trip.id!);
    }
    router.push(`/dashboard/flight/${trip.id}`);
  };

  return (
    <section className={styles.container}>
      <FlightFormHeader
        title={'Return'}
        departure={trip.destination}
        destination={departure}
      />

      <FlightInputHeader
        originCity={originCity}
        handleSearch={handleSearch}
        setOriginCity={setOriginCity}
        setBudget={setBudget}
        budget={budget}
        placeholder={'To...'}
      />

      <FlightBookingList
        isSearching={isSearching}
        flights={flights}
        selectedFlight={selectedFlight}
        bookFlight={bookFlight}
        trip={trip}
      />
      {selectedFlight && (
        <button
          onClick={finalizeBookings}
          type='button'
          className={'button ' + styles.button}
        >
          Book Flights
        </button>
      )}
    </section>
  );
};
