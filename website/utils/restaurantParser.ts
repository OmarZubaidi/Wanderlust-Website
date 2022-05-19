import { EventType } from '../types/event.type';

export const restaurantParser = (eventsFromAmadeus: any): EventType[] => {
  return eventsFromAmadeus.map((event: any) => {
    return {
      title: event.name,
      start: '',
      end: '',
      allDay: false,
      description: '',
      location: '',
      longitude: +event.geoCode?.longitude || null,
      latitude: +event.geoCode?.latitude || null,
      price: 0,
      eventApiId: +event.id.match(/\d/gi)!.join(''),
      type: event.category,
      pictures: '',
      rating: +event.rank,
      bookingLink: '',
    };
  });
};
