export interface EventType {
  id?: number;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  price: number;
  eventApiId: number;
  bookingLink: string;
  type: string;
  pictures: string;
  rating: number;
  tripId?: number;
}
