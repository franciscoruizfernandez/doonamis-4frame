import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Review } from '../../models/Review';
import styles from './ReviewCard.module.scss';

interface ReviewCardProps {
  review: Review;
}

/**
 * Componente ReviewCard
 * 
 * Tarjeta de reseña con avatar, autor, rating, contenido y "ver más".
 */
const ReviewCard = ({ review }: ReviewCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.content.length > 300;

  return (
    <article className={styles.review}>
      <header className={styles.review__header}>
        <img
          src={review.avatarUrl}
          alt={review.author}
          className={styles.review__avatar}
        />
        <div className={styles.review__authorInfo}>
          <h4 className={styles.review__author}>{review.author}</h4>
          <p className={styles.review__date}>{review.formattedDate}</p>
        </div>
        {review.rating !== null && (
          <div className={styles.review__rating}>
            <FaStar />
            <span>{review.rating}/10</span>
          </div>
        )}
      </header>

      <p className={styles.review__content}>
        {expanded ? review.content : review.shortContent(300)}
      </p>

      {isLong && (
        <button 
          className={styles.review__toggleBtn} 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Ver menos' : 'Ver más'}
        </button>
      )}
    </article>
  );
};

export default ReviewCard;