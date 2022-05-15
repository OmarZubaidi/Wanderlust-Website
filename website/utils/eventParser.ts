import { EventType } from '../types/event.type';

export const eventParser = (eventsFromAmadeus: any): EventType[] => {
  return eventsFromAmadeus.map((event: any) => {
    return {
      title: event.name,
      start: '',
      end: '',
      allDay: false,
      description: event.shortDescription,
      location: '',
      longitude: +event.geoCode?.longitude || null,
      latitude: +event.geoCode?.latitude || null,
      price: +event.price.amount,
      eventApiId: +event.id,
      type: event.type,
      pictures: event.pictures[0],
      rating: +event.rating,
      bookingLink: event.bookingLink,
    };
  });
};
