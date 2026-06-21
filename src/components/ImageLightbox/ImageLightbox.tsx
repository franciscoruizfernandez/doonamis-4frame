import { useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SeriesImage } from '../../models/SeriesImage';
import styles from './ImageLightbox.module.scss';

interface ImageLightboxProps {
  images: SeriesImage[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Componente ImageLightbox
 * 
 * Modal de galería con navegación por flechas y teclado.
 */
const ImageLightbox = ({ images, currentIndex, onClose, onPrev, onNext }: ImageLightboxProps) => {
  const current = images[currentIndex];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className={styles.lightbox} onClick={onClose}>
      <div className={styles.lightbox__content} onClick={(e) => e.stopPropagation()}>
        <button className={styles.lightbox__closeBtn} onClick={onClose}>
          <FaTimes />
        </button>

        <button 
          className={`${styles.lightbox__navBtn} ${styles['lightbox__navBtn--prev']}`} 
          onClick={onPrev}
          disabled={currentIndex === 0}
        >
          <FaChevronLeft />
        </button>

        <img 
          src={current.fullUrl} 
          alt={`Imagen ${currentIndex + 1}`}
          className={styles.lightbox__image}
        />

        <button 
          className={`${styles.lightbox__navBtn} ${styles['lightbox__navBtn--next']}`} 
          onClick={onNext}
          disabled={currentIndex === images.length - 1}
        >
          <FaChevronRight />
        </button>

        <div className={styles.lightbox__counter}>
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageLightbox;