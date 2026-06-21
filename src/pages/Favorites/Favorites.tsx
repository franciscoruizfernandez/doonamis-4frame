import { Link } from 'react-router-dom';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { useFavorites } from '../../context/FavoritesContext';
import { ROUTES } from '../../constants/routes';
import SeriesCard from '../../components/SeriesCard/SeriesCard';
import styles from './Favorites.module.scss';

/**
 * Página Favorites
 * 
 * Muestra el listado de series marcadas como favoritas por el usuario.
 */
const Favorites = () => {
  const { favorites, clearFavorites } = useFavorites();

  const handleClearAll = () => {
    if (window.confirm('¿Seguro que quieres eliminar todos los favoritos?')) {
      clearFavorites();
    }
  };

  return (
    <div className={styles.favorites}>
      <div className={styles.favorites__header}>
        <div>
          <h1 className={styles.favorites__title}>
            <FaHeart className={styles.favorites__titleIcon} />
            Mis Favoritos
          </h1>
          <p className={styles.favorites__count}>
            {favorites.length} {favorites.length === 1 ? 'serie' : 'series'} guardada{favorites.length === 1 ? '' : 's'}
          </p>
        </div>

        {favorites.length > 0 && (
          <button 
            className={styles.favorites__clearBtn} 
            onClick={handleClearAll}
          >
            <FaTrash />
            <span>Limpiar todo</span>
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className={styles.favorites__empty}>
          <FaHeart className={styles.favorites__emptyIcon} />
          <h2>Aún no tienes favoritos</h2>
          <p>Explora series y guarda las que más te gusten para verlas más tarde.</p>
          <Link to={ROUTES.HOME} className={styles.favorites__exploreBtn}>
            Explorar series
          </Link>
        </div>
      ) : (
        <div className={styles.favorites__grid}>
          {favorites.map(series => (
            <SeriesCard key={series.id} series={series} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;