/** @typedef {import('./api_docs').vehicleSummaryPayload} VehicleSummaryPayload */

import { request } from './helpers';

const VEHICLES_API_URL = '/api/vehicles.json';

/**
 * Pull vehicles information
 *
 * @param {AbortSignal} [signal]
 * @return {Promise<Array.<VehicleSummaryPayload>>}
 */
export default async function getData(signal) {
  const makeRequest = signal
    ? (url) => request(url, { signal })
    : request;

  const vehiclesList = await makeRequest(VEHICLES_API_URL);

  const vehicleDetails = await Promise.all(
    vehiclesList.map(async (vehicle) => {
      try {
        const details = await makeRequest(vehicle.apiUrl);

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

  return vehicleDetails.filter(Boolean);
}
