import React, { useEffect, useState } from 'react';
import styles from '../../styles/forms/departureFlightForm.module.scss';
import { TripProps } from '../../types/tripProp';
import { flightOffersSearch } from '../../utils/amadeus';
import { citycode } from '../../utils/citycodes';
import { format } from 'date-fns';
import { Flight } from '../../types/flight.type';
import { parseFlights } from '../../utils/flightParser';
import { cacheFlight } from '../../utils/localStorage';
import { useRouter } from 'next/router';
import { FlightFormHeader } from './flightFormComponents/FlightFormHeader';
import { FlightInputHeader } from './flightFormComponents/FlightInputHeader';
import { FlightBookingList } from './flightFormComponents/FlightBookingList';
import { useUserContext } from '../../context/userContext';

export const DepartureFlightFormComponent: React.FC<TripProps> = ({ trip }) => {
  const router = useRouter();
  const { userDb } = useUserContext();
  const [originCity, setOriginCity] = useState(userDb?.origin || '');
  const [departure, setDeparture] = useState('');
  const [budget, setBudget] = useState('500');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight>();
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    const originLocationCode = citycode[originCity.toLowerCase()];
    if (
      !originLocationCode ||
      originCity.toLowerCase() === trip.destination.toLowerCase()
    ) {
      return; // TODO set Error and loading
    }
    const destinationLocationCode = citycode[trip.destination.toLowerCase()];
    const departureDate = format(new Date(trip.start), 'yyyy-MM-dd');
    setIsSearching(true);
    flightOffersSearch(
      originLocationCode,
      destinationLocationCode,
      departureDate,
      budget
    ).then((res) => {
      setFlights(parseFlights(res, originCity, trip.destination));
      setIsSearching(false);
    });

    setDeparture(originCity);
    setOriginCity('');
  };

  const bookFlight = (flight: Flight) => {
    setSelectedFlight(flight);
  };

  const goToReturnFlight = () => {
    cacheFlight(selectedFlight!);
    router.push(`/trip/flight/return/${trip.id}`);
  };

  return (
    <section className={styles.container}>
      <FlightFormHeader
        departure={departure}
        destination={trip.destination}
        title={'Departure'}
      />

      <FlightInputHeader
        originCity={originCity}
        handleSearch={handleSearch}
        setOriginCity={setOriginCity}
        setBudget={setBudget}
        budget={budget}
        placeholder={'From...'}
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
          onClick={goToReturnFlight}
          type='button'
          className={styles.continue}
        >
          Book the return
          <div className={styles.arrow}></div>
        </button>
      )}
    </section>
  );
};
