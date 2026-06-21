import { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Series } from '../../models/Series';
import SeriesCard from '../SeriesCard/SeriesCard';
import styles from './SeriesCarousel.module.scss';

interface SeriesCarouselProps {
  title: string;
  series: Series[];
}

/**
 * Componente SeriesCarousel
 * 
 * Muestra un carrusel horizontal de series con controles de navegación.
 * Reutiliza el componente SeriesCard.
 */
const SeriesCarousel = ({ title, series }: SeriesCarouselProps) => {
  // Ref al contenedor scrollable para controlarlo con los botones
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Si no hay datos, no renderizamos nada
  if (series.length === 0) return null;

  return (
    <section className={styles.carousel}>
      <h2 className={styles.carousel__title}>{title}</h2>

      <div className={styles.carousel__wrapper}>
        {/* Botón izquierdo */}
        <button
          className={`${styles.carousel__navBtn} ${styles['carousel__navBtn--left']}`}
          onClick={() => scroll('left')}
          aria-label="Scroll izquierda"
        >
          <FaChevronLeft />
        </button>

        {/* Contenedor scrollable */}
        <div className={styles.carousel__track} ref={scrollRef}>
          {series.map(item => (
            <div key={item.id} className={styles.carousel__item}>
              <SeriesCard series={item} />
            </div>
          ))}
        </div>

        {/* Botón derecho */}
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

export default SeriesCarousel;