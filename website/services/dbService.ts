import {
  flightServiceCreateFlight,
  flightServiceGetFlightByApiId,
} from './flightService';
import {
  tripServiceCreateTrip,
  tripServicegetAllTrips,
  tripServiceGetTrip,
} from './tripService';
import {
  userServiceCreate,
  userServiceGetByEmail,
  userServiceGetById,
} from './userService';
import { userOnFlightsCreateConnection } from './usersOnFlightsService';
import { usersOnTripsServiceCreate } from './usersOnTripsService';

// users
const createUser = userServiceCreate;
const getUserByEmail = userServiceGetByEmail;
const getUserById = userServiceGetById;

// trips
const createTrip = tripServiceCreateTrip;
const getAllTrips = tripServicegetAllTrips;
const getTrip = tripServiceGetTrip;

// connecting users <=> trips
const createUsersOnTrips = usersOnTripsServiceCreate;

//flights
const createFlight = flightServiceCreateFlight;
const getFlightByApiId = flightServiceGetFlightByApiId;

// connecting users <=> flights <=> trips
const createUsersFlightTripsConnection = userOnFlightsCreateConnection;

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
};
