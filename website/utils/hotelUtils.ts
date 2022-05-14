import {
  createHotel,
  createUsersTripHotelConnection,
  getHotelByAPiId,
} from '../services/dbService';
import { Hotel } from '../types/hotel.type';

export const checkHotelInTrip = (hotel: Hotel, tripId: number) => {
  for (let entry of hotel.UsersOnHotels!) {
    if (entry.tripId === tripId) {
      return true;
    }
  }
  return false;
};

export const bookGroupHotels = async (
  apiId: string,
  hotelToBook: Hotel,
  tripId: number,
  userId: number
) => {
  const hotels = await getHotelByAPiId(apiId);
  if (Array.isArray(hotels)) {
    for (let hotel of hotels) {
      if (checkHotelInTrip(hotel, tripId)) {
        const response = await createUsersTripHotelConnection(
          userId,
          tripId,
          hotelToBook.id!
        );
        console.log('RESPONSE', response);
        return typeof response !== 'string';
      }
    }
  }
  return false;
};

export const createHotelAndConnection = async (
  hotel: Hotel,
  userId: number,
  tripId: number
) => {
  const newHotel = await createHotel(hotel);
  if (typeof newHotel !== 'string') {
    const connection = await createUsersTripHotelConnection(
      userId,
      tripId,
      newHotel.id!
    );
    return typeof connection !== 'string';
  }
  return false;
};
