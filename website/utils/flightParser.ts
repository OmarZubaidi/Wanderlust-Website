import { Flight } from '../types/flight.type';

export const parseFlights = (
  flights: any[],
  departureCity: string,
  arrivalCity: string
): Flight[] => {
  return flights.map((flight) => {
    const itineraries = flight.itineraries[0].segments.map((segment: any) => ({
      depAirport: segment.departure.iataCode,
      arrAirport: segment.arrival.iataCode,
      depTerminal: segment.departure.terminal,
      arrTerminal: segment.arrival.terminal,
      departure: segment.departure.at,
      arrival: segment.arrival.at,
    }));

    return {
      flightApiId: flight.id,
      price: flight.price.total + flight.price.currency,
      lengthOfFlight: flight.itineraries[0].duration,
      itineraries,
      departureCity,
      arrivalCity,
    };
  });
};
