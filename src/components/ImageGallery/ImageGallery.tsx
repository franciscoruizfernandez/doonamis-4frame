import { useState } from 'react';
import { FaImages } from 'react-icons/fa';
import { SeriesImage } from '../../models/SeriesImage';
import ImageLightbox from '../ImageLightbox/ImageLightbox';
import styles from './ImageGallery.module.scss';

interface ImageGalleryProps {
  backdrops: SeriesImage[];
  posters: SeriesImage[];
}

const MAX_THUMBNAILS = 8;

/**
 * Componente ImageGallery
 * 
 * Grid de miniaturas con tabs backdrops/posters. Click → lightbox.
 */
const ImageGallery = ({ backdrops, posters }: ImageGalleryProps) => {
  const [activeTab, setActiveTab] = useState<'backdrops' | 'posters'>('backdrops');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const currentImages = activeTab === 'backdrops' ? backdrops : posters;
  const visibleImages = showAll ? currentImages : currentImages.slice(0, MAX_THUMBNAILS);

  if (backdrops.length === 0 && posters.length === 0) return null;

  return (
    <section className={styles.gallery}>
      <div className={styles.gallery__header}>
        <h2 className={styles.gallery__title}>
          <FaImages />
          Galería
        </h2>

        <div className={styles.gallery__tabs}>
          <button
            className={`${styles.gallery__tab} ${activeTab === 'backdrops' ? styles['gallery__tab--active'] : ''}`}
            onClick={() => { setActiveTab('backdrops'); setShowAll(false); }}
          >
            Backdrops ({backdrops.length})
          </button>
          <button
            className={`${styles.gallery__tab} ${activeTab === 'posters' ? styles['gallery__tab--active'] : ''}`}
            onClick={() => { setActiveTab('posters'); setShowAll(false); }}
          >
            Posters ({posters.length})
          </button>
        </div>
      </div>

      <div className={`${styles.gallery__grid} ${activeTab === 'posters' ? styles['gallery__grid--posters'] : ''}`}>
        {visibleImages.map((img, index) => (
          <div
            key={img.filePath}
            className={styles.gallery__item}
            onClick={() => setLightboxIndex(index)}
          >
            <img
              src={img.thumbnailUrl}
              alt={`Imagen ${index + 1}`}
              className={styles.gallery__thumbnail}
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {currentImages.length > MAX_THUMBNAILS && (
        <button 
          className={styles.gallery__showMoreBtn}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Mostrar menos' : `Ver todas (${currentImages.length})`}
        </button>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <ImageLightbox
          images={showAll ? currentImages : visibleImages}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex(Math.max(0, lightboxIndex - 1))}
          onNext={() => setLightboxIndex(Math.min(currentImages.length - 1, lightboxIndex + 1))}
        />
      )}
    </section>
  );
};

export default ImageGallery;