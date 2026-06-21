import type { WatchProvidersGroup } from '../../models/WatchProvider';
import styles from './WatchProviders.module.scss';

interface WatchProvidersProps {
  providers: WatchProvidersGroup;
}

/**
 * Componente WatchProviders
 * 
 * Muestra las plataformas donde se puede ver la serie agrupadas
 * por tipo de acceso (suscripción, alquiler, compra).
 */
const WatchProviders = ({ providers }: WatchProvidersProps) => {
  const hasContent = 
    providers.flatrate.length > 0 ||
    providers.rent.length > 0 ||
    providers.buy.length > 0;

  if (!hasContent) return null;

  /**
   * Renderiza una sección con sus providers.
   */
  const renderGroup = (label: string, list: typeof providers.flatrate) => {
    if (list.length === 0) return null;
    return (
      <div className={styles.providers__group}>
        <span className={styles.providers__label}>{label}</span>
        <div className={styles.providers__list}>
          {list.map(p => (
            <a
              key={p.providerId}
              href={providers.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.providers__item}
              title={p.providerName}
            >
              <img 
                src={p.logoUrl} 
                alt={p.providerName} 
                className={styles.providers__logo} 
              />
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className={styles.providers}>
      <h3 className={styles.providers__title}>Dónde ver</h3>
      {renderGroup('Suscripción', providers.flatrate)}
      {renderGroup('Alquilar', providers.rent)}
      {renderGroup('Comprar', providers.buy)}
    </section>
  );
};

export default WatchProviders;