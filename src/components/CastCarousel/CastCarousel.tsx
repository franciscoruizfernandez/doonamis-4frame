import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { CastMember } from '../../models/CastMember';
import CastCard from '../CastCard/CastCard';
import styles from './CastCarousel.module.scss';

interface CastCarouselProps {
  title: string;
  cast: CastMember[];
  limit?: number;
}

/**
 * Componente CastCarousel
 * 
 * Carrusel horizontal de actores con controles de scroll.
 */
const CastCarousel = ({ title, cast, limit = 20 }: CastCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (cast.length === 0) return null;

  // Limitamos a los primeros N actores
  const visibleCast = cast.slice(0, limit);

  return (
    <section className={styles.carousel}>
      <h2 className={styles.carousel__title}>{title}</h2>

      <div className={styles.carousel__wrapper}>
        <button
          className={`${styles.carousel__navBtn} ${styles['carousel__navBtn--left']}`}
          onClick={() => scroll('left')}
          aria-label="Scroll izquierda"
        >
          <FaChevronLeft />
        </button>

        <div className={styles.carousel__track} ref={scrollRef}>
          {visibleCast.map(member => (
            <div key={member.id} className={styles.carousel__item}>
              <CastCard member={member} />
            </div>
          ))}
        </div>

        <button
          className={`${styles.carousel__navBtn} ${styles['carousel__navBtn--right']}`}
          onClick={() => scroll('right')}
          aria-label="Scroll derecha"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default CastCarousel;