const weatherUrl = process.env.WEATHER_URL;

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export const getCoordinates = async (
  cityName: string
): Promise<Coordinates> => {
  try {
    const response = await fetch(
      weatherUrl + `q=${cityName}&appid=${process.env.WEATHER_API_KEY}`
    );
    const data = await response.json();
    if (data.status >= 400) throw new Error(data.message);
    return { latitude: data[0].lat, longitude: data[0].lon };
  } catch (error: any) {
    return error.message;
  }
};
