import { Flight } from '../types/flight.type';

const serverUrl = process.env.SERVER_URL || 'http://localhost:3333';

export const flightServiceGetFlightByApiId = async (
  apiId: number
): Promise<Flight[]> => {
  try {
    const response = await fetch(serverUrl + `/flights/api/${apiId}`);
    const data = await response.json();
    if (data.status === 404) throw new Error(data.message);
    return data as Flight[];
  } catch (error: any) {
    return error.message;
  }
};

export const flightServiceCreateFlight = async (flight: Flight) => {
  try {
    const response = await fetch(serverUrl + '/flights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...flight,
        itineraries: JSON.parse(flight.itineraries),
      }),
    });
    const data = await response.json();
    if (data.status === 404) throw new Error(data.message);
    return data as Flight;
  } catch (error: any) {
    return error.message;
  }
};
