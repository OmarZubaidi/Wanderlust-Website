import { EventType } from './event.type';
import { Flight } from './flight.type';
import { Hotel } from './hotel.type';
import { User } from './user.type';

export interface Trip {
  id?: number;
  start: Date;
  end: Date;
  destination: string;
  Hotels?: Hotel[];
  Flights?: Flight[];
  Events?: EventType[]; // ts didn't like Event as a name
  Users?: User[];
  createdAt?: Date;
}
