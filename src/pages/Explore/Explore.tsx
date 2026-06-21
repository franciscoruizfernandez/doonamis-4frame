import { useState, useEffect } from 'react';
import { TmdbService } from '../../services/tmdbService';
import { Series } from '../../models/Series';
import { DiscoverFilters } from '../../models/Discover';
import type { DiscoverResponse } from '../../models/Discover';
import DiscoverFiltersComponent from '../../components/DiscoverFilters/DiscoverFilters';
import SeriesCard from '../../components/SeriesCard/SeriesCard';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './Explore.module.scss';

/**
 * Página Explore
 * 
 * Permite explorar series con filtros avanzados (género, año,
 * valoración, ordenación) usando el endpoint Discover de TMDB.
 */
const Explore = () => {
  const [filters, setFilters] = useState(new DiscoverFilters());
  const [series, setSeries] = useState<Series[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carga la primera página cuando cambian los filtros (no la página).
   * Resetea la lista y vuelve a empezar.
   */
  useEffect(() => {
    let isMounted = true;

    const loadInitial = async () => {
      try {
        setLoading(true);
        setError(null);
        // Forzamos siempre página 1 al cambiar filtros
        const initialFilters = new DiscoverFilters({ ...filters, page: 1 });
        const response: DiscoverResponse = await TmdbService.discoverSeries(initialFilters);
        
        if (isMounted) {
          setSeries(response.series);  // 👈 Reemplaza (es la 1ª página)
          setCurrentPage(1);
          setTotalResults(response.totalResults);
          setTotalPages(response.totalPages);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error desconocido');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadInitial();
    return () => { isMounted = false; };
    // Solo escuchamos cambios en los filtros (NO en la página)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.sortBy,
    filters.withGenres,
    filters.year,
    filters.voteAverageGte,
    filters.voteAverageLte,
    filters.voteCountGte,
  ]);

  /**
   * Carga la siguiente página y la AÑADE a las series existentes.
   */
  const handleLoadMore = async () => {
    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;
      const nextFilters = new DiscoverFilters({ ...filters, page: nextPage });
      const response = await TmdbService.discoverSeries(nextFilters);
      
      setSeries(prev => [...prev, ...response.series]);  // 👈 Acumula
      setCurrentPage(nextPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando más');
    } finally {
      setLoadingMore(false);
    }
  };

  /**
   * Callback cuando cambian los filtros desde el componente hijo.
   */
  const handleFiltersChange = (newFilters: DiscoverFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className={styles.explore}>
      <div className={styles.explore__header}>
        <h1 className={styles.explore__title}>Explorar Series</h1>
        <p className={styles.explore__subtitle}>
          Descubre series usando filtros avanzados
        </p>
      </div>

      <DiscoverFiltersComponent 
        filters={filters} 
        onChange={handleFiltersChange} 
      />

      {!loading && (
        <p className={styles.explore__count}>
          {totalResults.toLocaleString()} resultados encontrados
        </p>
      )}

      {loading && <Loading message="Buscando series..." />}

      {error && !loading && (
        <ErrorMessage 
          message={error} 
          onRetry={() => setFilters(new DiscoverFilters())} 
        />
      )}

      {!loading && !error && series.length === 0 && (
        <div className={styles.explore__empty}>
          <p>No se encontraron series con esos filtros.</p>
          <p>Prueba a cambiar los criterios de búsqueda.</p>
        </div>
      )}

      {!loading && !error && series.length > 0 && (
        <>
          <div className={styles.explore__grid}>
            {series.map((item, idx) => (
              <SeriesCard key={`${item.id}-${idx}`} series={item} />
            ))}
          </div>

          {currentPage < totalPages && (
            <div className={styles.explore__loadMore}>
              {loadingMore ? (
                <Loading message="Cargando más..." />
              ) : (
                <button
                  className={styles.explore__loadMoreBtn}
                  onClick={handleLoadMore}
                >
                  Cargar más
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Explore;