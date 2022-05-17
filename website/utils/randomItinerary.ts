import { createEvent, deleteEvent } from '../services/dbService';
import { EventType } from '../types/event.type';
import { Trip } from '../types/trip.type';

export const randomItinerary = async (trip: Trip, events: EventType[]) => {
  const endDate = new Date(trip.end);
  const startDate = new Date(trip.start);
  const days = Math.floor((+endDate - +startDate) / (24 * 60 * 60 * 1000));

  let i = 1;
  while (i < days) {
    let randomIndex = Math.floor(Math.random() * events.length);
    while (!events[randomIndex]) {
      randomIndex = Math.floor(Math.random() * events.length);
    }
    startDate.setDate(startDate.getDate() + 1);
    const startMorning = startDate.toISOString().slice(0, 11) + '07:00:00.000Z';
    const endMorning = startDate.toISOString().slice(0, 11) + '10:00:00.000Z';
    const startEvening = startDate.toISOString().slice(0, 11) + '14:00:00.000Z';
    const endEvening = startDate.toISOString().slice(0, 11) + '17:00:00.000Z';

    const morningEvent: EventType = {
      ...events.splice(randomIndex, 1)[0],
      start: new Date(startMorning),
      end: new Date(endMorning),
      type: 'RANDOM',
      tripId: trip.id,
      eventApiId: Date.now(),
    };
    while (!events[randomIndex]) {
      randomIndex = Math.floor(Math.random() * events.length);
    }
    const eveningEvent: EventType = {
      ...events.splice(randomIndex, 1)[0],
      start: new Date(startEvening),
      end: new Date(endEvening),
      type: 'RANDOM',
      tripId: trip.id,
      eventApiId: Date.now() + 1,
    };
    await createEvent(morningEvent);
    await createEvent(eveningEvent);

    i++;
  }
};

export const deleteRandomEvents = async (events: EventType[]) => {
  events
    .filter((e: EventType) => {
      return e.type === 'RANDOM';
    })
    .forEach(async (eventToDelete: EventType) => {
      await deleteEvent(eventToDelete.id!);
    });
};
