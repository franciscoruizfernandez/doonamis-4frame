import { useState } from 'react';
import { Series } from '../../models/Series';
import { TmdbService } from '../../services/tmdbService';
import { useFetch } from '../../hooks/useFetch';
import SeriesCard from '../../components/SeriesCard/SeriesCard';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './Home.module.scss';

/**
 * Página Home
 * 
 * Página principal que muestra el listado de series populares de TMDB
 * con paginación tipo "cargar más".
 */
const Home = () => {
  const [page, setPage] = useState(1);
  const [allSeries, setAllSeries] = useState<Series[]>([]);

  // useFetch ejecuta la llamada cada vez que cambia 'page'
  const { data, loading, error } = useFetch<Series[]>(
    () => TmdbService.getPopularSeries(page),
    [page]
  );

  // Cuando llegan nuevos datos, los acumulamos en allSeries
  // (en lugar de reemplazar, los añadimos para hacer paginación tipo scroll)
  if (data && !allSeries.some(s => s.id === data[0]?.id)) {
    setAllSeries(prev => [...prev, ...data]);
  }

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  // Render condicional: error y aún no hay series cargadas
  if (error && allSeries.length === 0) {
    return <ErrorMessage message={error} onRetry={() => setPage(1)} />;
  }

  // Loading inicial (cuando aún no hay nada cargado)
  if (loading && allSeries.length === 0) {
    return <Loading message="Cargando series populares..." />;
  }

  return (
    <div className={styles.home}>
      
      {/* Hero / Encabezado */}
      <section className={styles.home__hero}>
        <div className={styles.home__heroContent}>
          <h1 className={styles.home__title}>Series Populares</h1>
          <p className={styles.home__subtitle}>
            Descubre las series más vistas del momento
          </p>
        </div>
      </section>

      {/* Grid de series */}
      <section className={styles.home__content}>
        <div className={styles.home__grid}>
          {allSeries.map(series => (
            <SeriesCard key={series.id} series={series} />
          ))}
        </div>

        {/* Botón de cargar más */}
        <div className={styles.home__loadMore}>
          {loading && allSeries.length > 0 ? (
            <Loading message="Cargando más series..." />
          ) : (
            <button 
              className={styles.home__loadMoreBtn} 
              onClick={handleLoadMore}
              disabled={loading}
            >
              Cargar más
            </button>
          )}
        </div>
      </section>

    </div>
  );
};

export default Home;