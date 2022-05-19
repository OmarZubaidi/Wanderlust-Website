import { EventType } from '../types/event.type';
const serverUrl = process.env.SERVER_URL || 'http://localhost:3333';

export const eventsServiceGetEvents = async () => {
  try {
    const response = await fetch(serverUrl + '/events');
    const data = await response.json();
    if (data.status >= 400) throw new Error(data.message);
    return data as EventType[];
  } catch (error: any) {
    return error.message;
  }
};

export const eventsServiceCreateEvent = async (
  event: EventType
): Promise<EventType> => {
  try {
    const response = await fetch(serverUrl + '/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    const data = await response.json();
    if (data.status >= 400) throw new Error(data.message);
    return data as EventType;
  } catch (error: any) {
    return error.message;
  }
};

export const eventsServiceUpdateEvent = async (
  eventId: number,
  startDate: Date,
  endDate: Date
): Promise<EventType> => {
  try {
    const response = await fetch(serverUrl + `/events/${eventId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ start: startDate, end: endDate }),
    });
    const data = await response.json();
    if (data.status >= 400) throw new Error(data.message);
    return data as EventType;
  } catch (error: any) {
    return error.message;
  }
};

export const eventsServiceDeleteEvent = async (eventId: number) => {
  try {
    const response = await fetch(serverUrl + `/events/${eventId}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    if (data.status >= 400) throw new Error(data.message);
    return data as EventType;
  } catch (error: any) {
    return error.message;
  }
};
