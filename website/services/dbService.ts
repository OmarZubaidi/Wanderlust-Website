import {
  eventsServiceCreateEvent,
  eventsServiceDeleteEvent,
  eventsServiceGetEvents,
  eventsServiceUpdateEvent,
} from './eventsService';
import {
  flightServiceCreateFlight,
  flightServiceGetFlightByApiId,
} from './flightService';
import {
  hotelsServiceCreatehotel,
  hotelsServiceGetHotelByApiId,
} from './hotelsService';
import {
  tripServiceCreateTrip,
  tripServiceDeleteTrip,
  tripServicegetAllTrips,
  tripServiceGetTrip,
} from './tripService';
import {
  userServiceCreate,
  userServiceGetByEmail,
  userServiceGetById,
} from './userService';
import { userOnFlightsCreateConnection } from './usersOnFlightsService';
import { UOHServiceCreateConnectionUsersHotelsTrip } from './usersOnHotels';
import {
  userOnTripServiceCreate,
  usersOnTripsServiceCreate,
} from './usersOnTripsService';

// users
const createUser = userServiceCreate;
const getUserByEmail = userServiceGetByEmail;
const getUserById = userServiceGetById;

// trips
const createTrip = tripServiceCreateTrip;
const getAllTrips = tripServicegetAllTrips;
const getTrip = tripServiceGetTrip;
const deleteTrip = tripServiceDeleteTrip;

// connecting users <=> trips
const createUsersOnTrips = usersOnTripsServiceCreate;
const createUserOnTrip = userOnTripServiceCreate;

//flights
const createFlight = flightServiceCreateFlight;
const getFlightByApiId = flightServiceGetFlightByApiId;

// connecting users <=> flights <=> trips
const createUsersFlightTripsConnection = userOnFlightsCreateConnection;

// connecting users <=> hotels <=> trips
const createUsersTripHotelConnection =
  UOHServiceCreateConnectionUsersHotelsTrip;

// Events
const getEvents = eventsServiceGetEvents;
const createEvent = eventsServiceCreateEvent;
const updateEvent = eventsServiceUpdateEvent;
const deleteEvent = eventsServiceDeleteEvent;

// Hotels
const getHotelByAPiId = hotelsServiceGetHotelByApiId;
const createHotel = hotelsServiceCreatehotel;

export {
  createUser,
  getUserByEmail,
  createTrip,
  createUsersOnTrips,
  getUserById,
  getAllTrips,
  getTrip,
  createFlight,
  getFlightByApiId,
  createUsersFlightTripsConnection,
  getEvents,
  getHotelByAPiId,
  createHotel,
  createUsersTripHotelConnection,
  createEvent,
  createUserOnTrip,
  deleteTrip,
  updateEvent,
  deleteEvent,
};
