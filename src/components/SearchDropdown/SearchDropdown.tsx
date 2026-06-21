import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { Series } from '../../models/Series';
import { buildRoute } from '../../constants/routes';
import styles from './SearchDropdown.module.scss';

interface SearchDropdownProps {
  results: Series[];
  loading: boolean;
  query: string;
  onSelect: () => void;
  onSeeAll: () => void;
}

/**
 * Componente SearchDropdown
 * 
 * Dropdown que muestra resultados de búsqueda en tiempo real
 * debajo del input del header.
 */
const SearchDropdown = ({ 
  results, 
  loading, 
  query, 
  onSelect, 
  onSeeAll 
}: SearchDropdownProps) => {
  if (!query.trim()) return null;

  // Mostramos máximo 6 resultados en el dropdown
  const limitedResults = results.slice(0, 6);

  return (
    <div className={styles.dropdown}>
      {loading && (
        <div className={styles.dropdown__loading}>Buscando...</div>
      )}

      {!loading && results.length === 0 && (
        <div className={styles.dropdown__empty}>
          No se encontraron resultados para "{query}"
        </div>
      )}

      {!loading && limitedResults.length > 0 && (
        <>
          <ul className={styles.dropdown__list}>
            {limitedResults.map(series => (
              <li key={series.id}>
                <Link
                  to={buildRoute.seriesDetail(series.id)}
                  className={styles.dropdown__item}
                  onClick={onSelect}
                >
                  <img
                    src={series.posterUrl}
                    alt={series.name}
                    className={styles.dropdown__poster}
                  />
                  <div className={styles.dropdown__info}>
                    <h4 className={styles.dropdown__title}>{series.name}</h4>
                    <div className={styles.dropdown__meta}>
                      <span>{series.year}</span>
                      <span className={styles.dropdown__rating}>
                        <FaStar />
                        {series.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {results.length > 6 && (
            <button 
              className={styles.dropdown__seeAll} 
              onClick={onSeeAll}
            >
              Ver todos los resultados ({results.length})
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default SearchDropdown;