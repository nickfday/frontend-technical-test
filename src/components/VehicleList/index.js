import React from 'react';
import useData from './useData';
import './style.scss';
import VehicleDetail from '../VehicleDetail';

export default function VehicleList() {
  const [loading, error, vehicles] = useData();

  if (loading) {
    return <div data-testid="loading">Loading</div>;
  }

  if (error) {
    return <div data-testid="error">{ error }</div>;
  }

  return (
    <ul data-testid="results" className="vehicle-list">

      {vehicles.map(({
        id, apiUrl, description, media, price
      }) => {
        return (
          <li className="vehicle-list__item" key={id}>
            <VehicleDetail apiUrl={apiUrl} description={description} id={id} media={media} price={price} />
          </li>
        );
      })}
      <p>
        Visit
        <a href="/api/vehicles.json" target="_blank"> /api/vehicles.json</a>
        {' '}
        (main endpoint)
      </p>
      <p>
        Visit
        <a href="/api/vehicle_fpace.json" target="_blank">/api/vehicle_fpace.json</a>
        {' '}
        (detail endpoint - apiUrl)
      </p>
      <p>
        Visit
        <a href="/api/vehicle_xf.json" target="_blank">/api/vehicle_xf.json</a>
        {' '}
        (vehicle without any price)
      </p>
    </ul>
  );
}
