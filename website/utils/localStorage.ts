import { Flight } from '../types/flight.type';
import { User } from '../types/user.type';
export type CacheTrip = {
  startDate: string;
  endDate: string;
  destination: string;
};

export const cacheAddedFriends = (addedFriends: User[]) => {
  window.localStorage.setItem('addedFriends', JSON.stringify(addedFriends));
};

export const getCachedAddedFriends = () => {
  const friends = window.localStorage.getItem('addedFriends');
  return JSON.parse(friends!);
};

export const cacheTrip = (trip: CacheTrip) => {
  window.localStorage.setItem('trip', JSON.stringify(trip));
};

export const getCachedTrip = () => {
  const trip = window.localStorage.getItem('trip');
  return JSON.parse(trip!);
};

export const deleteCachedTrip = () => {
  window.localStorage.setItem('trip', JSON.stringify(null));
};

export const deleteCachedAddedFriends = () => {
  window.localStorage.setItem('addedFriends', JSON.stringify(null));
};

export const cacheFlight = (flight: Flight) => {
  window.localStorage.setItem('departureFlight', JSON.stringify(flight));
};

export const getCachedFlight = () => {
  const flight = window.localStorage.getItem('departureFlight');
  return JSON.parse(flight!);
};

export const deleteCachedFlight = () => {
  window.localStorage.setItem('departureFlight', JSON.stringify(null));
};
