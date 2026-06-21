import { useState } from 'react';
import { FaComments } from 'react-icons/fa';
import { Review } from '../../models/Review';
import ReviewCard from '../ReviewCard/ReviewCard';
import styles from './ReviewsSection.module.scss';

interface ReviewsSectionProps {
  reviews: Review[];
}

const INITIAL_LIMIT = 3;

/**
 * Componente ReviewsSection
 * 
 * Sección de reseñas con opción de mostrar más/menos.
 */
const ReviewsSection = ({ reviews }: ReviewsSectionProps) => {
  const [showAll, setShowAll] = useState(false);

  if (reviews.length === 0) {
    return (
      <section className={styles.reviews}>
        <h2 className={styles.reviews__title}>
          <FaComments />
          Reseñas
        </h2>
        <p className={styles.reviews__empty}>
          Aún no hay reseñas para esta serie.
        </p>
      </section>
    );
  }

  const visibleReviews = showAll ? reviews : reviews.slice(0, INITIAL_LIMIT);
  const hasMore = reviews.length > INITIAL_LIMIT;

  return (
    <section className={styles.reviews}>
      <h2 className={styles.reviews__title}>
        <FaComments />
        Reseñas ({reviews.length})
      </h2>

      <div className={styles.reviews__list}>
        {visibleReviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {hasMore && (
        <div className={styles.reviews__loadMore}>
          <button 
            className={styles.reviews__loadMoreBtn} 
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Mostrar menos' : `Ver todas las reseñas (${reviews.length})`}
          </button>
        </div>
      )}
    </section>
  );
};

export default ReviewsSection;