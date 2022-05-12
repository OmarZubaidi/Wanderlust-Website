import { User } from './user.type';
import { UsersOnFlights } from './userOnFlights.type';

export interface Flight {
  id?: number;
  // departure: Date;
  // arrival: Date;
  // gate: string;
  // depAirport: string;
  // arrAirport: string;
  departureCity: string;
  arrivalCity: string;
  lengthOfFlight: string;
  price: string;
  flightApiId: number;
  UsersOnFlights?: UsersOnFlights[];
  Users?: User[];
  createdAt?: Date;
  itineraries: string;
}

export type Itinerary = {
  depAirport: string;
  arrAirport: string;
  depTerminal?: string;
  arrTerminal?: string;
  departure: Date;
  arrival: Date;
};
