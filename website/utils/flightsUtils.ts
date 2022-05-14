import trip from '../pages/trip';
import {
  createFlight,
  createUsersFlightTripsConnection,
  getFlightByApiId,
} from '../services/dbService';
import { Flight, Itinerary } from '../types/flight.type';

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
  if (typeof newflight !== 'string') {
    const connection = await createUsersFlightTripsConnection(
      userId,
      newflight.id,
      tripId
    );
    return typeof connection !== 'string';
  }
  return false;
};
