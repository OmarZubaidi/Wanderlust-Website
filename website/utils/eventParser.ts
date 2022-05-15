import { EventType } from '../types/event.type';

export const eventParser = (eventsFromAmadeus: any): EventType[] => {
  console.log(eventsFromAmadeus);
  return eventsFromAmadeus.map((event: any) => {
    return {
      title: event.name,
      start: '',
      end: '',
      allDay: false,
      description: event.shortDescription,
      location: '',
      longitude: +event.geocode?.longitude || null,
      latitude: +event.geocode?.latitude || null,
      price: +event.price.amount,
      eventApiId: +event.id,
      type: event.type,
      pictures: event.pictures[0],
      rating: +event.rating,
    };
  });
};
