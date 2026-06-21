import { Link } from 'react-router-dom';
import { FaPlay, FaInfoCircle, FaStar } from 'react-icons/fa';
import { Series } from '../../models/Series';
import { buildRoute } from '../../constants/routes';
import styles from './HeroBanner.module.scss';

interface HeroBannerProps {
  series: Series;
}

/**
 * Componente HeroBanner
 * 
 * Banner destacado tipo Netflix con backdrop grande, título, 
 * descripción y CTAs. Se muestra al principio de la home.
 */
const HeroBanner = ({ series }: HeroBannerProps) => {
  return (
    <section 
      className={styles.hero}
      style={{ backgroundImage: `url(${series.backdropUrl})` }}
    >
      <div className={styles.hero__overlay}>
        <div className={styles.hero__content}>
          
          <span className={styles.hero__badge}>
            <FaStar />
            <span>Destacado · {series.rating}/10</span>
          </span>

          <h1 className={styles.hero__title}>{series.name}</h1>

          <div className={styles.hero__meta}>
            <span>{series.year}</span>
            <span>·</span>
            <span>{series.voteCount.toLocaleString()} valoraciones</span>
          </div>

          <p className={styles.hero__overview}>
            {series.shortOverview(250)}
          </p>

          <div className={styles.hero__actions}>
            <Link 
              to={buildRoute.seriesDetail(series.id)} 
              className={`${styles.hero__btn} ${styles['hero__btn--primary']}`}
            >
              <FaPlay />
              <span>Ver ahora</span>
            </Link>
            <Link 
              to={buildRoute.seriesDetail(series.id)} 
              className={`${styles.hero__btn} ${styles['hero__btn--secondary']}`}
            >
              <FaInfoCircle />
              <span>Más información</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroBanner;