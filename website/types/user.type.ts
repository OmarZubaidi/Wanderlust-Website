import { Flight } from './flight.type';
import { Hotel } from './hotel.type';
import { Trip } from './trip.type';
import { UsersOnTrips } from './usersOnTrips.type';

export interface User {
  id?: number;
  email: string;
  username: string;
  sub: string;
  emailVerified: boolean;
  pictureUrl: string;
  origin?: string;
  createdAt?: Date;
  Hotels?: Hotel[];
  Flights?: Flight[];
  Trips?: Trip[];
  mobilePassword?: string;
}
