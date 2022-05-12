import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { format } from 'date-fns';
import styles from '../../styles/forms/departureFlightForm.module.scss';
import { Flight } from '../../types/flight.type';
import { TripProps } from '../../types/tripProp';
import { flightOffersSearch } from '../../utils/amadeus';
import { citycode } from '../../utils/citycodes';
import { parseFlights } from '../../utils/flightParser';
import { cacheFlight } from '../../utils/localStorage';
import { FlightBookingList } from './flightFormComponents/FlightBookingList';
import { FlightFormHeader } from './flightFormComponents/FlightFormHeader';
import { FlightInputHeader } from './flightFormComponents/FlightInputHeader';

export const ReturnFlightFormComponent: React.FC<TripProps> = ({ trip }) => {
  const router = useRouter();
  const [originCity, setOriginCity] = useState('');
  const [departure, setDeparture] = useState('');
  const [budget, setBudget] = useState('500');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Flight>();

  const handleSearch = async () => {
    const originLocationCode = citycode[originCity.toLowerCase()];
    if (
      !originLocationCode ||
      originCity.toLowerCase() === trip.destination.toLowerCase()
    ) {
      return; // TODO set Error
    }
    const destinationLocationCode = citycode[trip.destination.toLowerCase()];
    const departureDate = format(new Date(trip.start), 'yyyy-MM-dd');
    flightOffersSearch(
      originLocationCode,
      destinationLocationCode,
      departureDate,
      budget
    ).then((res) => {
      console.log(res);
      setFlights(parseFlights(res, originCity, trip.destination));
    });

    setDeparture(originCity);
    setOriginCity('');
  };

  const bookFlight = (flight: Flight) => {
    setSelectedFlight(flight);
  };

  const goToReturnFlight = () => {
    cacheFlight(selectedFlight!);
    router.push(`/trip/return/${trip.id}`);
  };

  return (
    <section className={styles.container}>
      <FlightFormHeader
        title={'Return'}
        departure={departure}
        destination={trip.destination}
      />

      <FlightInputHeader
        originCity={originCity}
        handleSearch={handleSearch}
        setOriginCity={setOriginCity}
        setBudget={setBudget}
        budget={budget}
      />

      <FlightBookingList
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
