// eslint-disable-next-line no-unused-vars
import { request } from './helpers';

const VEHICLES_API_URL = '/api/vehicles.json';

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>}
 */
// TODO: All API related logic should be made inside this function.
export default async function getData() {
  const response = await request(VEHICLES_API_URL);
  return response;
}
