/** @typedef {import('./api_docs').vehicleSummaryPayload} VehicleSummaryPayload */

import { request } from './helpers';

const VEHICLES_API_URL = '/api/vehicles.json';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<VehicleSummaryPayload>>}
 */
// TODO: All API related logic should be made inside this function.
export default async function getData() {
  const vehiclesList = await request(VEHICLES_API_URL);

  const vehicleDetails = await Promise.all(
    vehiclesList.map(async (vehicle) => {
      try {
        const details = await request(vehicle.apiUrl);
        if (!details.price) {
          return null;
        }
        return {
          ...vehicle,
          ...details,
        };
      } catch {
        return null;
      }
    }),
  );

  return vehicleDetails.filter((vehicle) => vehicle !== null);
}
