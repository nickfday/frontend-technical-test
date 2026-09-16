/** @typedef {import('../../api/api_docs').vehicleSummaryPayload} VehicleSummaryPayload */

import { useState, useEffect } from 'react';
import getData from '../../api';

/**
 * @returns {[boolean, Error|null, VehicleSummaryPayload[]]}
 */
export default function useData() {
  /** @type {[VehicleSummaryPayload[], Function]} */
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getData()
      .then((response) => setVehicles(response))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  return [
    loading,
    error,
    vehicles,
  ];
}
