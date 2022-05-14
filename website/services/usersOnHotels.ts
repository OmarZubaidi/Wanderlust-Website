import { UsersOnHotels } from '../types/usersOnHotels.type';

const serverUrl = process.env.SERVER_URL || 'http://localhost:3333';

export const UOHServiceCreateConnectionUsersHotelsTrip = async (
  userId: number,
  tripId: number,
  hotelId: number
): Promise<UsersOnHotels> => {
  try {
    const response = await fetch(serverUrl + '/users-on-hotels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, tripId, hotelId }),
    });
    const data = await response.json();
    if (data.status === 404) throw new Error(data.message);
    return data as UsersOnHotels;
  } catch (error: any) {
    return error.message;
  }
};
