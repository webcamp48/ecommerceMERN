import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import './RatingStars.css';

const RatingStars = ({ rating }) => {
  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (rating >= i + 1) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="star" />);
    } else if (rating >= i + 0.5) {
      stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="star" />);
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={faStarRegular} className="star" />);
    }
  }

  return <div className="rating-stars">{stars}</div>;
};

export default RatingStars;
