import { tripServiceCreateTrip } from './tripService';
import { userServiceCreate, userServiceGetByEmail } from './userService';
import { usersOnTripsServiceCreate } from './usersOnTripsService';

const createUser = userServiceCreate;
const getUserByEmail = userServiceGetByEmail;
const createTrip = tripServiceCreateTrip;
const createUsersOnTrips = usersOnTripsServiceCreate;

export { createUser, getUserByEmail, createTrip, createUsersOnTrips };
