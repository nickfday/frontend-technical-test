import React from 'react';
import './style.scss';

export default function VehicleDetail({
  id, description, media, price
}) {
  // Check url path name to determine correct image to render
  const landscapeImage = media.find(({ url }) => url.includes('/16x9/'),);
  const squareImage = media.find(({ url }) => url.includes('/1x1/'),);
  const altText = id; // Vehicle ID deliberatly used as alt text. Reason: more descriptive than API media name response

  return (
    <article className="vehicle-detail">
      <picture className="vehicle-detail__media">

        <source
          media="(min-width: 768px)"
          srcSet={landscapeImage.url}
        />
        <img
          src={squareImage.url}
          alt={altText}
          className="vehicle-detail__image"
          loading="lazy"

        />
      </picture>

      <div className="vehicle-detail__content">
        <h2 className="vehicle-detail__title ">{id}</h2>
        <p className="vehicle-detail__price">
          From
          <span>{price}</span>
        </p>
        <p className="vehicle-detail__description">
          {description}
        </p>
      </div>

    </article>
  );
}
