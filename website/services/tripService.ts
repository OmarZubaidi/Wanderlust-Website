import { Trip } from '../types/trip.type';
import { CacheTrip } from '../utils/localStorage';

const serverUrl = process.env.SERVER_URL || 'http://localhost:3333';

export const tripServiceCreateTrip = async (trip: CacheTrip): Promise<Trip> => {
  try {
    const tripToAdd: Trip = {
      start: new Date(trip.startDate),
      end: new Date(trip.endDate),
      destination: trip.destination,
      latitude: +trip.latitude,
      longitude: +trip.longitude,
    };
    console.log(JSON.stringify(tripToAdd));
    const response = await fetch(serverUrl + '/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripToAdd),
    });

    const newTrip = await response.json();
    if (newTrip.status === 404) throw new Error(newTrip.message);
    return newTrip as Trip;
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
};

export const tripServiceGetTrip = async (tripId: number): Promise<Trip> => {
  try {
    const response = await fetch(serverUrl + `/trips/${tripId}`);
    const data = await response.json();
    if (data.status === 404) throw new Error(data.message);
    return data as Trip;
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
};

export const tripServicegetAllTrips = async (): Promise<Trip[]> => {
  try {
    const response = await fetch(serverUrl + '/trips');
    const data = await response.json();
    if (data.status === 404) throw new Error(data.message);
    return data as Trip[];
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
};
