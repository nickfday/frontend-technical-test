import React from 'react';
import useData from './useData';
import './style.scss';
import VehicleDetail from '../VehicleDetail';

export default function VehicleList() {
  const [loading, error, vehicles] = useData();

  if (loading) {
    return (
      <div data-testid="loading" role="status" aria-live="polite" className="vehicle-list__loading">
        <img
          src="/images/tube-spinner.svg"
          alt=""
          aria-hidden="true"
          width="48"
          height="48"
          className="vehicle-list__spinner"
        />
        <span className="visually-hidden">Loading vehicles</span>
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="error" role="alert">
        {error}
      </div>
    );
  }

  return (
    <>
      <h1 className="visually-hidden">Vehicles</h1>
      <ul data-testid="results" className="vehicle-list">
        {vehicles.map(({
          id, description, media, price
        }, index) => {
          return (
            <li
              className="vehicle-list__item"
              key={id}
              style={{ '--vehicle-index': index }}
            >
              <VehicleDetail
                description={description}
                id={id}
                media={media}
                price={price}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}
