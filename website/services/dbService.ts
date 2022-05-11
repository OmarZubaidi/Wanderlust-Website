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
import { usersOnTripsServiceCreate } from './usersOnTripsService';

const createUser = userServiceCreate;
const getUserByEmail = userServiceGetByEmail;
const getUserById = userServiceGetById;

const createTrip = tripServiceCreateTrip;
const createUsersOnTrips = usersOnTripsServiceCreate;
const getAllTrips = tripServicegetAllTrips;
const getTrip = tripServiceGetTrip;

export {
  createUser,
  getUserByEmail,
  createTrip,
  createUsersOnTrips,
  getUserById,
  getAllTrips,
  getTrip,
};
