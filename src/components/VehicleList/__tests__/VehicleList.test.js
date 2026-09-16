import React from 'react';
import { render } from '@testing-library/react';
import VehicleList from '..';
import useData from '../useData';

jest.mock('../useData');

describe('<VehicleList /> Tests', () => {
  it('Should show loading state if it not falsy', () => {
    useData.mockReturnValue([true, 'An error occurred', 'results']);
    const { queryByTestId } = render(<VehicleList />);

    expect(queryByTestId('loading')).not.toBeNull();
    expect(queryByTestId('error')).toBeNull();
    expect(queryByTestId('results')).toBeNull();
  });

  it('Should show error if it is not falsy and loading is finished', () => {
    useData.mockReturnValue([false, 'An error occurred', 'results']);
    const { queryByTestId } = render(<VehicleList />);

    expect(queryByTestId('loading')).toBeNull();
    expect(queryByTestId('error')).not.toBeNull();
    expect(queryByTestId('results')).toBeNull();
  });

  it('Should show results if loading successfully finished', () => {
    const vehicles = [
      {
        id: 'xf_k17',
        apiUrl: '/api/vehicle_xf.json',
        description: 'A luxury saloon',
        price: '£350 per month',
        media: [
          { name: 'landscape', url: '/images/16x9/xf_k17.jpg' },
          { name: 'square', url: '/images/1x1/xf_k17.jpg' },
        ],
      },
      {
        id: 'xe_k17',
        apiUrl: '/api/vehicle_xe.json',
        description: 'A compact executive saloon',
        price: '£300 per month',
        media: [
          { name: 'landscape', url: '/images/16x9/xe_k17.jpg' },
          { name: 'square', url: '/images/1x1/xe_k17.jpg' },
        ],
      },
    ];
    useData.mockReturnValue([false, false, vehicles]);
    const { queryByTestId, getByText, getAllByRole } = render(<VehicleList />);

    expect(queryByTestId('loading')).toBeNull();
    expect(queryByTestId('error')).toBeNull();
    expect(queryByTestId('results')).not.toBeNull();
    expect(getAllByRole('listitem')).toHaveLength(vehicles.length);
    expect(getByText(vehicles[0].description)).not.toBeNull();
  });
});
