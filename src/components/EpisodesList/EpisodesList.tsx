import { useState, useEffect } from 'react';
import { FaStar, FaCalendar, FaClock } from 'react-icons/fa';
import { TmdbService } from '../../services/tmdbService';
import { Episode } from '../../models/Episode';
import { Season } from '../../models/SeriesDetail';
import styles from './EpisodesList.module.scss';

interface EpisodesListProps {
  seriesId: number;
  seasons: Season[];
}

/**
 * Componente EpisodesList
 * 
 * Selector de temporada + lista de episodios con miniatura,
 * título, descripción y datos.
 */
const EpisodesList = ({ seriesId, seasons }: EpisodesListProps) => {
  const [selectedSeason, setSelectedSeason] = useState(
    seasons.length > 0 ? seasons[0].seasonNumber : 1
  );
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedEp, setExpandedEp] = useState<number | null>(null);

  // Cargar episodios cuando cambia la temporada seleccionada
  useEffect(() => {
    let isMounted = true;

    const loadEpisodes = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await TmdbService.getSeasonEpisodes(seriesId, selectedSeason);
        if (isMounted) setEpisodes(data);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Error cargando episodios');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadEpisodes();
    return () => { isMounted = false; };
  }, [seriesId, selectedSeason]);

  if (seasons.length === 0) return null;

  return (
    <section className={styles.episodes}>
      <div className={styles.episodes__header}>
        <h2 className={styles.episodes__title}>Episodios</h2>
        
        {/* Selector de temporada */}
        <select
          className={styles.episodes__seasonSelect}
          value={selectedSeason}
          onChange={(e) => setSelectedSeason(Number(e.target.value))}
        >
          {seasons.map(season => (
            <option key={season.id} value={season.seasonNumber}>
              {season.name} ({season.episodeCount} ep.)
            </option>
          ))}
        </select>
      </div>

      {/* Loading */}
      {loading && (
        <div className={styles.episodes__loading}>Cargando episodios...</div>
      )}

      {/* Error */}
      {error && (
        <div className={styles.episodes__error}>{error}</div>
      )}

      {/* Lista de episodios */}
      {!loading && !error && (
        <div className={styles.episodes__list}>
          {episodes.map(ep => (
            <article 
              key={ep.id} 
              className={styles.episodes__item}
              onClick={() => setExpandedEp(expandedEp === ep.id ? null : ep.id)}
            >
              {/* Miniatura */}
              <div className={styles.episodes__still}>
                <img 
                  src={ep.stillUrl} 
                  alt={ep.name} 
                  className={styles.episodes__stillImage}
                  loading="lazy"
                />
                <span className={styles.episodes__number}>{ep.label}</span>
              </div>

              {/* Info */}
              <div className={styles.episodes__info}>
                <h3 className={styles.episodes__epTitle}>{ep.name}</h3>
                
                <div className={styles.episodes__meta}>
                  {ep.formattedDate && (
                    <span className={styles.episodes__metaItem}>
                      <FaCalendar />
                      {ep.formattedDate}
                    </span>
                  )}
                  {ep.runtimeFormatted && (
                    <span className={styles.episodes__metaItem}>
                      <FaClock />
                      {ep.runtimeFormatted}
                    </span>
                  )}
                  <span className={styles.episodes__metaItem}>
                    <FaStar />
                    {ep.rating}
                  </span>
                </div>

                {expandedEp === ep.id && ep.overview && (
                  <p className={styles.episodes__overview}>{ep.overview}</p>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default EpisodesList;