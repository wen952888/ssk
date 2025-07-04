import React from 'react';
import { getCardImageUrl } from '../utils/cardImage';

export default function Card({ card }) {
  return (
    <img
      src={getCardImageUrl(card)}
      alt={card}
      style={{ width: '60px', margin: '2px' }}
      onError={e => e.target.src='/cards/unknown.svg'}
    />
  );
}
