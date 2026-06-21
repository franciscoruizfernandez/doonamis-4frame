import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { TmdbService } from '../../services/tmdbService';
import { Series } from '../../models/Series';
import SeriesCard from '../../components/SeriesCard/SeriesCard';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { FaSearch } from 'react-icons/fa';
import styles from './Search.module.scss';

/**
 * Página Search
 * 
 * Muestra los resultados de búsqueda según el query param ?q=
 */
const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const { data: results, loading, error } = useFetch<Series[]>(
    () => TmdbService.searchSeries(query),
    [query]
  );

  return (
    <div className={styles.search}>
      <div className={styles.search__header}>
        <h1 className={styles.search__title}>
          Resultados para: <span className={styles.search__query}>"{query}"</span>
        </h1>
        {results && (
          <p className={styles.search__count}>
            {results.length} {results.length === 1 ? 'resultado' : 'resultados'} encontrado{results.length === 1 ? '' : 's'}
          </p>
        )}
      </div>

      <div className={styles.search__content}>
        {loading && <Loading message="Buscando series..." />}
        
        {error && <ErrorMessage message={error} />}
        
        {!loading && !error && results && results.length === 0 && (
          <div className={styles.search__empty}>
            <FaSearch className={styles.search__emptyIcon} />
            <h2>No se encontraron resultados</h2>
            <p>Prueba con otros términos de búsqueda.</p>
          </div>
        )}

        {!loading && results && results.length > 0 && (
          <div className={styles.search__grid}>
            {results.map(series => (
              <SeriesCard key={series.id} series={series} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;