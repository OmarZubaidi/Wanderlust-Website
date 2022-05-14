import { EventType } from '../types/event.type';

const serverUrl = process.env.SERVER_URL || 'http://localhost:3333';

export const eventsServiceGetEvents = async () => {
  try {
    const response = await fetch(serverUrl + '/events');
    const data = await response.json();
    if (data.status === 404) throw new Error(data.message);
    return data as EventType[];
  } catch (error: any) {
    return error.message;
  }
};
