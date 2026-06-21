import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaArrowLeft, FaPlay, FaHeart } from 'react-icons/fa';
import { TmdbService } from '../../services/tmdbService';
import { useFetch } from '../../hooks/useFetch';
import { SeriesDetail as SeriesDetailModel } from '../../models/SeriesDetail';
import { Series } from '../../models/Series';
import SeriesCarousel from '../../components/SeriesCarousel/SeriesCarousel';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './SeriesDetail.module.scss';

/**
 * Página SeriesDetail
 * 
 * Muestra el detalle completo de una serie:
 * - Sidebar izquierdo: poster, descripción, rating
 * - Contenido principal: backdrop, info, carruseles de recomendaciones
 */
const SeriesDetail = () => {
  // Obtenemos el ID de la URL (ruta /series/:id)
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const seriesId = Number(id);

  // 3 llamadas paralelas: detalle, similares, recomendaciones
  const { 
    data: series, 
    loading: loadingDetail, 
    error: errorDetail 
  } = useFetch<SeriesDetailModel>(
    () => TmdbService.getSeriesDetail(seriesId),
    [seriesId]
  );

  const { data: similar } = useFetch<Series[]>(
    () => TmdbService.getSimilarSeries(seriesId),
    [seriesId]
  );

  const { data: recommendations } = useFetch<Series[]>(
    () => TmdbService.getRecommendations(seriesId),
    [seriesId]
  );

  // Estados de carga y error
  if (loadingDetail) return <Loading message="Cargando información..." />;
  if (errorDetail) return <ErrorMessage message={errorDetail} />;
  if (!series) return <ErrorMessage message="Serie no encontrada" />;

  return (
    <div className={styles.detail}>
      
      {/* Botón volver */}
      <button 
        className={styles.detail__backBtn} 
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        <span>Volver</span>
      </button>

      <div className={styles.detail__layout}>
        
        {/* ===== SIDEBAR IZQUIERDO ===== */}
        <aside className={styles.detail__sidebar}>
          
          {/* Poster */}
          <div className={styles.detail__posterWrapper}>
            <img 
              src={series.posterUrl} 
              alt={`Póster de ${series.name}`}
              className={styles.detail__poster}
            />
            <button className={styles.detail__favoriteBtn}>
              <FaHeart />
              <span>Favorito</span>
            </button>
          </div>

          {/* Descripción */}
          <p className={styles.detail__overview}>
            {series.overview}
          </p>

          <hr className={styles.detail__divider} />

          {/* Rating */}
          <div className={styles.detail__rating}>
            <h3 className={styles.detail__ratingTitle}>IMDB</h3>
            <div className={styles.detail__ratingValue}>
              <FaStar className={styles.detail__ratingStar} />
              <span className={styles.detail__ratingNumber}>
                {series.rating}
              </span>
              <span className={styles.detail__ratingMax}>/10</span>
            </div>
            <p className={styles.detail__ratingCount}>
              {series.voteCount.toLocaleString()} valoraciones
            </p>
          </div>

        </aside>

        {/* ===== CONTENIDO PRINCIPAL ===== */}
        <main className={styles.detail__main}>
          
          {/* Cabecera con título y rating */}
          <div className={styles.detail__header}>
            <h1 className={styles.detail__title}>{series.name}</h1>
            <div className={styles.detail__headerRating}>
              <FaStar />
              <span>{series.rating}/10</span>
            </div>
          </div>

          {/* Backdrop (imagen grande) */}
          <div className={styles.detail__backdrop}>
            {series.backdropUrl ? (
              <img 
                src={series.backdropUrl} 
                alt={`Backdrop de ${series.name}`}
                className={styles.detail__backdropImage}
              />
            ) : (
              <div className={styles.detail__backdropPlaceholder}>
                <FaPlay />
              </div>
            )}
            <button className={styles.detail__playBtn} aria-label="Reproducir">
              <FaPlay />
            </button>
          </div>

          {/* Información clave */}
          <div className={styles.detail__info}>
            <div className={styles.detail__infoItem}>
              <span className={styles.detail__infoLabel}>Año</span>
              <span className={styles.detail__infoValue}>{series.year}</span>
            </div>
            <div className={styles.detail__infoItem}>
              <span className={styles.detail__infoLabel}>Temporadas</span>
              <span className={styles.detail__infoValue}>
                {series.numberOfSeasons}
              </span>
            </div>
            <div className={styles.detail__infoItem}>
              <span className={styles.detail__infoLabel}>Episodios</span>
              <span className={styles.detail__infoValue}>
                {series.numberOfEpisodes}
              </span>
            </div>
            <div className={styles.detail__infoItem}>
              <span className={styles.detail__infoLabel}>Duración</span>
              <span className={styles.detail__infoValue}>{series.runtime}</span>
            </div>
            <div className={styles.detail__infoItem}>
              <span className={styles.detail__infoLabel}>Estado</span>
              <span className={styles.detail__infoValue}>
                {series.statusLabel}
              </span>
            </div>
          </div>

          {/* Géneros */}
          {series.genres.length > 0 && (
            <div className={styles.detail__genres}>
              {series.genres.map(genre => (
                <span key={genre.id} className={styles.detail__genre}>
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {/* Tagline */}
          {series.tagline && (
            <p className={styles.detail__tagline}>"{series.tagline}"</p>
          )}

          {/* Carruseles */}
          {similar && similar.length > 0 && (
            <SeriesCarousel title="Más como esta" series={similar} />
          )}

          {recommendations && recommendations.length > 0 && (
            <SeriesCarousel 
              title="Recomendado para ti" 
              series={recommendations} 
            />
          )}

        </main>

      </div>
    </div>
  );
};

export default SeriesDetail;