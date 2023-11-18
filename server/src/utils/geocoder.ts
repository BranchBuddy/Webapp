// import axios from 'axios';
// import environment from './environment';
// import { AppError } from './errorHandler';
//
// const serviceName = 'geocoder';
// const getCoordinates = async (address: string): Promise<[number, number]> => {
//   const apiKey = environment.MAPQUEST_API_KEY;
//   const url = `https://www.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${encodeURIComponent(
//     address,
//   )}`;
//
//   const response = await axios.get(url);
//   const results = response.data.results[0].locations;
//
//   if (results.length > 0) {
//     const { latLng } = results[0];
//     const { lat, lng } = latLng;
//     return [lat, lng];
//   } else {
//     throw new AppError(
//       'Error when geocoding address',
//       'No results found for the address.',
//       500,
//     );
//   }
// };
//
// export default getCoordinates;
