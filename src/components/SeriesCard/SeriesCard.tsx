import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { Series } from '../../models/Series';
import { useFavorites } from '../../context/FavoritesContext';
import { buildRoute } from '../../constants/routes';
import styles from './SeriesCard.module.scss';

interface SeriesCardProps {
  series: Series;
}

/**
 * Componente SeriesCard
 * 
 * Muestra una tarjeta de serie con poster, título, año, rating y
 * botón de favorito.
 */
const SeriesCard = ({ series }: SeriesCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(series.id);

  /**
   * Maneja el click en el botón de favorito.
   * Detiene la propagación para no navegar al detalle.
   */
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(series);
  };

  return (
    <Link 
      to={buildRoute.seriesDetail(series.id)} 
      className={styles.card}
    >
      <div className={styles.card__imageWrapper}>
        <img
          src={series.posterUrl}
          alt={`Póster de ${series.name}`}
          className={styles.card__image}
          loading="lazy"
        />
        
        {/* Badge de rating */}
        <div className={styles.card__rating}>
          <FaStar className={styles.card__ratingIcon} />
          <span>{series.rating}</span>
        </div>

        {/* Botón de favorito */}
        <button
          className={`${styles.card__favoriteBtn} ${favorite ? styles['card__favoriteBtn--active'] : ''}`}
          onClick={handleFavoriteClick}
          aria-label={favorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          {favorite ? <FaHeart /> : <FaRegHeart />}
        </button>

        {/* Overlay al hover */}
        <div className={styles.card__overlay}>
          <p className={styles.card__overview}>
            {series.shortOverview(150)}
          </p>
        </div>
      </div>

      <div className={styles.card__info}>
        <h3 className={styles.card__title}>{series.name}</h3>
        <span className={styles.card__year}>{series.year}</span>
      </div>
    </Link>
  );
};

export default SeriesCard;