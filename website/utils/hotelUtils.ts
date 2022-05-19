import {
  createEvent,
  createHotel,
  createUsersTripHotelConnection,
  getHotelByAPiId,
} from '../services/dbService';
import { EventType } from '../types/event.type';
import { Hotel } from '../types/hotel.type';
import { Trip } from '../types/trip.type';

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
    return newHotel;
  }
  return false;
};

export const createHotelEvent = async (
  hotel: Hotel,
  trip: Trip,
  desc: string
) => {
  let start = trip.start;
  let end = trip.start;
  let eventApiId = Date.now();
  if (desc === 'check-out') {
    start = trip.end;
    end = trip.end;
  }
  const event: EventType = {
    title: desc + ':' + hotel.name,
    start,
    end,
    allDay: true,
    description: desc,
    location: hotel.location,
    latitude: hotel.latitude,
    longitude: hotel.longitude,
    price: hotel.priceTotal,
    eventApiId,
    bookingLink: '',
    type: 'HOTEL',
    pictures: '',
    rating: +hotel.rating,
    tripId: trip.id,
  };
  const res = await createEvent(event);
  return res;
};
