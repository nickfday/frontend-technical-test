import React, { useState } from 'react';
import breakpoints from '../../config/breakpoints.json';
import './style.scss';

export default function VehicleDetail({ id, description, media, price }) {
  const [imageError, setImageError] = useState(false);

  // Check url path name to determine correct image to render
  const landscapeImage = media.find(({ url }) => url.includes('/16x9/'));
  const squareImage = media.find(({ url }) => url.includes('/1x1/'));
  const altText = id; // Vehicle ID deliberatly used as alt text. Reason: more descriptive than API media name response

  const squareSrc =
    !imageError && squareImage
      ? squareImage.url
      : '/images/1x1/vehicle-placeholder-1x1.png';

  const landscapeSrc =
    !imageError && landscapeImage
      ? landscapeImage.url
      : '/images/16x9/vehicle-placeholder-16x9.png';

  return (
    <article className="vehicle-detail">
      <picture className="vehicle-detail__media">
        <source media={`(min-width: ${breakpoints.tablet}px)`} srcSet={landscapeSrc} />
        <img
          src={squareSrc}
          alt={altText}
          className="vehicle-detail__image"
          loading="lazy"
          onError={() => {
            if (!imageError) {
              setImageError(true);
            }
          }}
        />
      </picture>

      <div className="vehicle-detail__content">
        <h2 className="vehicle-detail__title">{id}</h2>
        <p className="vehicle-detail__price">
          From
          <span>{price}</span>
        </p>
        <p className="vehicle-detail__description">{description}</p>
      </div>
    </article>
  );
}
