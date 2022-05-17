import {
  createEvent,
  createFlight,
  createUsersFlightTripsConnection,
  getFlightByApiId,
} from '../services/dbService';
import { EventType } from '../types/event.type';
import { Flight, Itinerary } from '../types/flight.type';
const AIRPORTS = require('../airports.json');

export const checkIfFlightIsOnTrip = (
  flight: Flight,
  tripId: number,
  flightToBook: Flight
) => {
  for (let entry of flight.UsersOnFlights!) {
    const itineraries: Itinerary[] = JSON.parse(flight.itineraries as string);
    const toBookItineraries: Itinerary[] = JSON.parse(
      flightToBook.itineraries as string
    );
    if (
      entry.tripId === tripId &&
      flight.departureCity === flightToBook.departureCity &&
      flight.arrivalCity === flightToBook.arrivalCity &&
      flight.lengthOfFlight === flightToBook.lengthOfFlight &&
      flight.price === flightToBook.price &&
      itineraries[0].arrival === toBookItineraries[0].arrival
    ) {
      return true;
    }
  }
  return false;
};

export const bookGroupFlights = async (
  apiId: number,
  flightToBook: Flight,
  tripId: number,
  userId: number
) => {
  const flights = await getFlightByApiId(apiId);
  for (let flight of flights) {
    if (checkIfFlightIsOnTrip(flight, tripId, flightToBook)) {
      const response = await createUsersFlightTripsConnection(
        userId,
        flight.id!,
        tripId
      );
      return typeof response !== 'string';
    }
  }
  return false;
};

export const createFlightAndConnection = async (
  flight: Flight,
  userId: number,
  tripId: number
) => {
  const newflight = await createFlight({
    ...flight,
    flightApiId: +flight.flightApiId,
  });
  if (newflight.id) {
    const connection = await createUsersFlightTripsConnection(
      userId,
      newflight.id,
      tripId
    );
    return newflight;
  }
  return false;
};

export const createFlightEvent = async (
  flight: Flight,
  desc: string,
  tripId: number
) => {
  const itineraries = JSON.parse(flight.itineraries);

  let latitude = 0;
  let longitude = 0;

  for (let airport of AIRPORTS) {
    if (airport.iata_code === itineraries[0].depAirport) {
      latitude = +airport.latitude_deg;
      longitude = +airport.longitude_deg;
      console.log(latitude, longitude);
      break;
    }
  }

  const flightEvent: EventType = {
    title: flight.departureCity + ' - ' + flight.arrivalCity,
    description: desc,
    allDay: false,
    location: '',
    latitude,
    longitude,
    price: flight.price,
    eventApiId: Date.now(),
    type: 'FLIGHT',
    tripId: tripId,
    start: new Date(itineraries[0].departure),
    end: new Date(itineraries[itineraries.length - 1].arrival),
    rating: 0,
    pictures: '',
    bookingLink: '',
  };

  return await createEvent(flightEvent);
};
