import { useState, useEffect } from 'react';
import { FaFire, FaStar, FaTv, FaClock, FaChartLine } from 'react-icons/fa';
import { Series } from '../../models/Series';
import { TmdbService } from '../../services/tmdbService';
import SeriesCard from '../../components/SeriesCard/SeriesCard';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Tabs from '../../components/Tabs/Tabs';
import type { TabItem } from '../../components/Tabs/Tabs';
import styles from './Home.module.scss';

/**
 * Identificadores únicos de cada tab/categoría.
 */
type CategoryId = 'trending_week' | 'popular' | 'top_rated' | 'on_the_air' | 'airing_today';

/**
 * Mapeo de cada categoría a su función del servicio.
 * Centralizado para evitar repetición y facilitar añadir nuevas.
 */
const CATEGORY_FETCHERS: Record<CategoryId, (page: number) => Promise<Series[]>> = {
  trending_week: TmdbService.getTrendingWeek.bind(TmdbService),
  popular: TmdbService.getPopularSeries.bind(TmdbService),
  top_rated: TmdbService.getTopRatedSeries.bind(TmdbService),
  on_the_air: TmdbService.getOnTheAirSeries.bind(TmdbService),
  airing_today: TmdbService.getAiringTodaySeries.bind(TmdbService),
};

/**
 * Configuración de los tabs visibles.
 */
const TABS: TabItem[] = [
  { id: 'trending_week', label: 'Tendencias', icon: <FaChartLine /> },
  { id: 'popular', label: 'Populares', icon: <FaFire /> },
  { id: 'top_rated', label: 'Mejor valoradas', icon: <FaStar /> },
  { id: 'on_the_air', label: 'En emisión', icon: <FaTv /> },
  { id: 'airing_today', label: 'Hoy', icon: <FaClock /> },
];

/**
 * Página Home
 * 
 * Página principal con tabs para diferentes categorías de series
 * y paginación tipo "cargar más".
 */
const Home = () => {
  const [activeTab, setActiveTab] = useState<CategoryId>('trending_week');
  const [series, setSeries] = useState<Series[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Carga la primera página al cambiar de tab.
   */
  useEffect(() => {
    let isMounted = true;

    const loadInitial = async () => {
      try {
        setLoading(true);
        setError(null);
        setPage(1);
        const data = await CATEGORY_FETCHERS[activeTab](1);
        if (isMounted) {
          setSeries(data);
        }
      } catch (err) {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Error desconocido';
          setError(msg);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadInitial();
    return () => { isMounted = false; };
  }, [activeTab]);

  /**
   * Carga la siguiente página y la añade a la lista.
   */
  const handleLoadMore = async () => {
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const data = await CATEGORY_FETCHERS[activeTab](nextPage);
      setSeries(prev => [...prev, ...data]);
      setPage(nextPage);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error cargando más';
      setError(msg);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className={styles.home}>
      
      {/* Hero */}
      <section className={styles.home__hero}>
        <div className={styles.home__heroContent}>
          <h1 className={styles.home__title}>Series de TV</h1>
          <p className={styles.home__subtitle}>
            Descubre las mejores series de televisión del momento
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className={styles.home__content}>
        <Tabs 
          tabs={TABS} 
          activeTab={activeTab} 
          onChange={(id) => setActiveTab(id as CategoryId)} 
        />

        {/* Contenido según estado */}
        {loading && <Loading message="Cargando series..." />}
        
        {error && !loading && (
          <ErrorMessage 
            message={error} 
            onRetry={() => setActiveTab(activeTab)}
          />
        )}

        {!loading && !error && (
          <>
            <div className={styles.home__grid}>
              {series.map(item => (
                <SeriesCard key={`${activeTab}-${item.id}`} series={item} />
              ))}
            </div>

            <div className={styles.home__loadMore}>
              {loadingMore ? (
                <Loading message="Cargando más..." />
              ) : (
                <button 
                  className={styles.home__loadMoreBtn} 
                  onClick={handleLoadMore}
                >
                  Cargar más
                </button>
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;