import { User } from './user.type';
import { UsersOnHotels } from './usersOnHotels.type';

export interface Hotel {
  id?: number;
  name: string;
  location: string;
  latitude: number;
  longitude: number;
  arrival: Date;
  departure: Date;
  nights: number;
  priceTotal: string;
  hotelApiId: number;
  createdAt?: Date;
  UsersOnHotels?: UsersOnHotels[];
  Users?: User[];
  description: string;
  rating: string;
  type: string;
}
