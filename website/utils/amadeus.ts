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

export const hotelSearch = (cityCode: string, budget: string): Promise<any> => {
  return amadeus.shopping.hotelOffers
    .get({
      cityCode,
      max: '10',
    })
    .then((res: any) => {
      return new Promise((resolve, reject) => {
        resolve(
          res.data
            .filter((h: any) => {
              return h.offers[0].price.total <= budget;
            })
            .slice(0, 10)
        );
      });
    })
    .catch(function (responseError: any) {
      return new Promise((resolve, reject) => {
        reject(responseError);
      });
    });
};

export const altHotelSearch = (cityCode: string): Promise<any> => {
  console.log(cityCode);
  return amadeus.client
    .get('/v1/reference-data/locations/hotels/by-city', {
      cityCode,
    })
    .then((res: any) => {
      return new Promise((resolve, reject) => {
        resolve(res.data.slice(0, 10));
      });
    })
    .catch(function (responseError: any) {
      return new Promise((resolve, reject) => {
        reject(responseError);
      });
    });
};

export const HotelSearchById = (
  hotelId: string,
  budget: string
): Promise<any> => {
  return amadeus.client
    .get('/v3/shopping/hotel-offers', {
      hotelIds: hotelId,
    })
    .then((res: any) => {
      return res.data
        .filter((h: any) => {
          return +h.offers[0].price.total <= +budget;
        })
        .slice(0, 10);
    })
    .catch(function (responseError: any) {
      return new Promise((resolve, reject) => {
        reject(responseError);
      });
    });
};
