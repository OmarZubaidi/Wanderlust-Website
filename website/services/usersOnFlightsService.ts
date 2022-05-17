import { UsersOnFlights } from '../types/userOnFlights.type';

const serverUrl = process.env.SERVER_URL || 'http://localhost:3333';

export const userOnFlightsCreateConnection = async (
  userId: number,
  flightId: number,
  tripId: number
): Promise<UsersOnFlights> => {
  try {
    const response = await fetch(serverUrl + '/users-on-flights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, flightId, tripId }),
    });
    const data = await response.json();
    if (data.status > 400) throw new Error(data.message);
    return data as UsersOnFlights;
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
};
