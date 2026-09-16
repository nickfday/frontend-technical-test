import React from 'react';
import { render } from '@testing-library/react';
import VehicleDetail from '..';

describe('<VehicleDetail /> Tests', () => {
  const media = [
    { name: 'landscape', url: '/images/16x9/xf_k17.jpg' },
    { name: 'square', url: '/images/1x1/xf_k17.jpg' },
  ];

  it('Should render the id, description and price', () => {
    const { getByText } = render(
      <VehicleDetail id="xf_k17" description="A luxury saloon" price="£350 per month" media={media} />
    );

    expect(getByText('xf_k17')).not.toBeNull();
    expect(getByText('A luxury saloon')).not.toBeNull();
    expect(getByText('£350 per month')).not.toBeNull();
  });

  it('Should render the landscape and square images from the correct media urls', () => {
    const { container } = render(
      <VehicleDetail id="xf_k17" description="A luxury saloon" price="£350 per month" media={media} />
    );

    expect(container.querySelector('source').srcset).toEqual(media[0].url);
    expect(container.querySelector('img').src).toContain(media[1].url);
  });

  it('Should use the vehicle id as the image alt text', () => {
    const { getByAltText } = render(
      <VehicleDetail id="xf_k17" description="A luxury saloon" price="£350 per month" media={media} />
    );

    expect(getByAltText('xf_k17')).not.toBeNull();
  });
});
