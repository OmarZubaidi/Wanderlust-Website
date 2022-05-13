import { Hotel } from '../types/hotel.type';
import { Trip } from '../types/trip.type';

export const hotelParser = (hotels: any[], trip: Trip): Hotel[] => {
  const nights = new Date(trip.end).getDate() - new Date(trip.start).getDate();
  return hotels.map((hotel) => {
    const price = hotel.offers[0].price;

    const total: number = +price.total;
    return {
      name: hotel.hotel.name,
      location: hotel.hotel.address.lines.join(', '),
      longitude: hotel.hotel.longitude,
      latitude: hotel.hotel.latitude,
      nights,
      departure: trip.end,
      arrival: trip.start,
      description: hotel.hotel.description?.text || '',
      priceTotal: Math.round(total) * nights + price.currency,
      hotelApiId: hotel.hotel.hotelId,
      rating: hotel.hotel.rating,
      type: hotel.hotel.type,
    };
  });
};
