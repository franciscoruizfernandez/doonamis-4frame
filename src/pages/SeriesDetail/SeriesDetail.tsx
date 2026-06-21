import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaArrowLeft, FaPlay, FaHeart, FaRegHeart } from 'react-icons/fa';
import { TmdbService, Video } from '../../services/tmdbService';
import { useFetch } from '../../hooks/useFetch';
import { useFavorites } from '../../context/FavoritesContext';
import { SeriesDetail as SeriesDetailModel } from '../../models/SeriesDetail';
import { Series } from '../../models/Series';
import SeriesCarousel from '../../components/SeriesCarousel/SeriesCarousel';
import VideoModal from '../../components/VideoModal/VideoModal';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './SeriesDetail.module.scss';
import { CastMember } from '../../models/CastMember';
import CastCarousel from '../../components/CastCarousel/CastCarousel';
import type { WatchProvidersGroup } from '../../models/WatchProvider';
import WatchProviders from '../../components/WatchProviders/WatchProviders';
import { Review } from '../../models/Review';
import ReviewsSection from '../../components/ReviewsSection/ReviewsSection';


/**
 * Página SeriesDetail
 * 
 * Muestra el detalle completo de una serie con sidebar, backdrop,
 * info, géneros y carruseles de recomendaciones.
 */
const SeriesDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const seriesId = Number(id);
  
  const { isFavorite, toggleFavorite } = useFavorites();
  const [showTrailer, setShowTrailer] = useState(false);

  // Llamadas paralelas
  const { data: series, loading: loadingDetail, error: errorDetail } = 
    useFetch<SeriesDetailModel>(
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

  const { data: videos } = useFetch<Video[]>(
    () => TmdbService.getSeriesVideos(seriesId),
    [seriesId]
  );

  const { data: cast } = useFetch<CastMember[]>(
    () => TmdbService.getSeriesCast(seriesId),
    [seriesId]
  );

  const { data: watchProviders } = useFetch<WatchProvidersGroup | null>(
    () => TmdbService.getWatchProviders(seriesId),
    [seriesId]
  );

  const { data: reviews } = useFetch<Review[]>(
    () => TmdbService.getSeriesReviews(seriesId),
    [seriesId]
  );

  // Buscamos el primer trailer oficial de YouTube
  const trailer = videos?.find(v => v.isYoutube && v.isTrailer) ?? videos?.find(v => v.isYoutube);

  if (loadingDetail) return <Loading message="Cargando información..." />;
  if (errorDetail) return <ErrorMessage message={errorDetail} />;
  if (!series) return <ErrorMessage message="Serie no encontrada" />;

  const favorite = isFavorite(series.id);

  return (
    <div className={styles.detail}>
      <button 
        className={styles.detail__backBtn} 
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
        <span>Volver</span>
      </button>

      <div className={styles.detail__layout}>
        
        {/* SIDEBAR */}
        <aside className={styles.detail__sidebar}>
          <div className={styles.detail__posterWrapper}>
            <img 
              src={series.posterUrl} 
              alt={`Póster de ${series.name}`}
              className={styles.detail__poster}
            />
            <button 
              className={`${styles.detail__favoriteBtn} ${favorite ? styles['detail__favoriteBtn--active'] : ''}`}
              onClick={() => toggleFavorite(series)}
            >
              {favorite ? <FaHeart /> : <FaRegHeart />}
              <span>{favorite ? '¡Favorito!' : 'Favorito'}</span>
            </button>
          </div>

          <p className={styles.detail__overview}>{series.overview}</p>

          <hr className={styles.detail__divider} />

          <div className={styles.detail__rating}>
            <h3 className={styles.detail__ratingTitle}>IMDB</h3>
            <div className={styles.detail__ratingValue}>
              <FaStar className={styles.detail__ratingStar} />
              <span className={styles.detail__ratingNumber}>{series.rating}</span>
              <span className={styles.detail__ratingMax}>/10</span>
            </div>
            <p className={styles.detail__ratingCount}>
              {series.voteCount.toLocaleString()} valoraciones
            </p>
          </div>
        </aside>

        {/* MAIN */}
        <main className={styles.detail__main}>
          <div className={styles.detail__header}>
            <h1 className={styles.detail__title}>{series.name}</h1>
            <div className={styles.detail__headerRating}>
              <FaStar />
              <span>{series.rating}/10</span>
            </div>
          </div>

          {/* Backdrop con botón de play */}
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
            
            {trailer && (
              <button 
                className={styles.detail__playBtn} 
                onClick={() => setShowTrailer(true)}
                aria-label="Reproducir trailer"
              >
                <FaPlay />
              </button>
            )}
          </div>

          {/* Info */}
          <div className={styles.detail__info}>
            <div className={styles.detail__infoItem}>
              <span className={styles.detail__infoLabel}>Año</span>
              <span className={styles.detail__infoValue}>{series.year}</span>
            </div>
            <div className={styles.detail__infoItem}>
              <span className={styles.detail__infoLabel}>Temporadas</span>
              <span className={styles.detail__infoValue}>{series.numberOfSeasons}</span>
            </div>
            <div className={styles.detail__infoItem}>
              <span className={styles.detail__infoLabel}>Episodios</span>
              <span className={styles.detail__infoValue}>{series.numberOfEpisodes}</span>
            </div>
            <div className={styles.detail__infoItem}>
              <span className={styles.detail__infoLabel}>Duración</span>
              <span className={styles.detail__infoValue}>{series.runtime}</span>
            </div>
            <div className={styles.detail__infoItem}>
              <span className={styles.detail__infoLabel}>Estado</span>
              <span className={styles.detail__infoValue}>{series.statusLabel}</span>
            </div>
          </div>

          {series.genres.length > 0 && (
            <div className={styles.detail__genres}>
              {series.genres.map(genre => (
                <span key={genre.id} className={styles.detail__genre}>
                  {genre.name}
                </span>
              ))}
            </div>
          )}

          {watchProviders && (
            <WatchProviders providers={watchProviders} />
          )}

          {series.tagline && (
            <p className={styles.detail__tagline}>"{series.tagline}"</p>
          )}

          {cast && cast.length > 0 && (
            <CastCarousel title="Reparto" cast={cast} limit={15} />
          )}

          {reviews && (
            <ReviewsSection reviews={reviews} />
          )}

          {similar && similar.length > 0 && (
            <SeriesCarousel title="Más como esta" series={similar} />
          )}

          {recommendations && recommendations.length > 0 && (
            <SeriesCarousel title="Recomendado para ti" series={recommendations} />
          )}
        </main>
      </div>

      {/* Modal del trailer */}
      {showTrailer && trailer && (
        <VideoModal 
          video={trailer} 
          onClose={() => setShowTrailer(false)} 
        />
      )}
    </div>
  );
};

export default SeriesDetail;