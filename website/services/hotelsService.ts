import { Hotel } from '../types/hotel.type';

const serverUrl = process.env.SERVER_URL || 'http://localhost:3333';

export const getHotels = () => {};

export const hotelsServiceCreatehotel = async (
  hotel: Hotel
): Promise<Hotel> => {
  try {
    const response = await fetch(serverUrl + '/hotels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(hotel),
    });
    const data = await response.json();
    if (data.status === 404) throw new Error(data.message);
    return data as Hotel;
  } catch (error: any) {
    return error.message;
  }
};

export const hotelsServiceGetHotelByApiId = async (
  apiId: string
): Promise<Hotel[]> => {
  try {
    const response = await fetch(serverUrl + `/hotels/api/${apiId}`);
    const data = await response.json();
    if (data.status === 404) throw new Error(data.message);
    return data as Hotel[];
  } catch (error: any) {
    return error.message;
  }
};
