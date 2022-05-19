import { Hotel } from '../types/hotel.type';
import { Trip } from '../types/trip.type';

export const hotelParser = (hotels: any[], trip: Trip): Hotel[] => {
  const endDate = new Date(trip.end);
  const startDate = new Date(trip.start);
  const nights = Math.floor((+endDate - +startDate) / (24 * 60 * 60 * 1000));
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
      priceTotal: Math.round(total) * nights,
      hotelApiId: hotel.hotel.hotelId,
      rating: hotel.hotel.rating || '0',
      type: hotel.hotel.type,
    };
  });
};
