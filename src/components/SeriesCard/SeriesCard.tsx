import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { Series } from '../../models/Series';
import styles from './SeriesCard.module.scss';

interface SeriesCardProps {
  series: Series;
}

/**
 * Componente SeriesCard
 * 
 * Muestra una tarjeta de serie con su poster, título, año y rating.
 * Al hacer click, navega a la página de detalle de la serie.
 */
const SeriesCard = ({ series }: SeriesCardProps) => {
  return (
    <Link to={`/series/${series.id}`} className={styles.card}>
      
      {/* Poster */}
      <div className={styles.card__imageWrapper}>
        <img
          src={series.posterUrl}
          alt={`Póster de ${series.name}`}
          className={styles.card__image}
          loading="lazy"
        />
        
        {/* Badge de rating sobre la imagen */}
        <div className={styles.card__rating}>
          <FaStar className={styles.card__ratingIcon} />
          <span>{series.rating}</span>
        </div>

        {/* Overlay con descripción al hover */}
        <div className={styles.card__overlay}>
          <p className={styles.card__overview}>
            {series.shortOverview(150)}
          </p>
        </div>
      </div>

      {/* Información */}
      <div className={styles.card__info}>
        <h3 className={styles.card__title}>{series.name}</h3>
        <span className={styles.card__year}>{series.year}</span>
      </div>

    </Link>
  );
};

export default SeriesCard;