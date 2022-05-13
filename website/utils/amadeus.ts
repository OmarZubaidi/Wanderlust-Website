const Amadeus = require('amadeus');

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_API_KEY,
  clientSecret: process.env.AMADEUS_API_SECRET,
});

export const flightOffersSearch = (
  originLocationCode: string,
  destinationLocationCode: string,
  departureDate: string,
  budget: string
): Promise<any> => {
  console.log(originLocationCode, destinationLocationCode, departureDate);
  return amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      adults: '1',
      max: '10',
    })
    .then(function (response: any) {
      return new Promise((resolve, reject) => {
        resolve(response.data.filter((f: any) => +f.price.total <= +budget));
      });
    })
    .catch(function (responseError: any) {
      return new Promise((resolve, reject) => {
        reject(responseError);
      });
    });
};

export const flightSearch = (
  originLocationCode: string,
  destinationLocationCode: string,
  departureDate: string,
  returnDate: string
): Promise<any> => {
  return amadeus.client
    .get('v2/shopping/flight-offers', {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults: '1',
      max: '5',
    })
    .then(function (response: any) {
      return new Promise((resolve, reject) => {
        resolve(response.data);
      });
    })
    .catch(function (responseError: any) {
      return new Promise((resolve, reject) => {
        reject(responseError);
      });
    });
};
