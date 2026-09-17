/** @typedef {import('../../api/api_docs').vehicleSummaryPayload} VehicleSummaryPayload */

import { useState, useEffect } from 'react';
import getData from '../../api';

/**
 * @returns {[boolean, string|null, VehicleSummaryPayload[]]}
 */
export default function useData() {
  /** @type {[VehicleSummaryPayload[], Function]} */
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    getData(controller.signal)
      .then(setVehicles)
      .catch((requestError) => {
        if (!controller.signal.aborted) {
          setError(requestError.message);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, []);

  return [loading, error, vehicles];
}
