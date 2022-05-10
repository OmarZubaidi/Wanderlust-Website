import { UsersOnTrips } from '../types/usersOnTrips.type';

const serverUrl = process.env.SERVER_URL || 'http://localhost:3333';

export const usersOnTripsServiceCreate = async (
  tripId: number,
  userIds: number[]
) => {
  try {
    console.log(userIds);
    const response = await fetch(serverUrl + '/users-on-trips/many', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tripId, userIds }),
    });

    const data = await response.json();
    if (data.status === 404) throw new Error(data.message);
    return data as UsersOnTrips;
  } catch (error: any) {
    console.log(error.message);
    return error.message;
  }
};
