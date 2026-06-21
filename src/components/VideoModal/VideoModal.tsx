import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Video } from '../../services/tmdbService';
import styles from './VideoModal.module.scss';

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

/**
 * Componente VideoModal
 * 
 * Modal que reproduce un video de YouTube en pantalla.
 * Se cierra con ESC, click fuera, o botón X.
 */
const VideoModal = ({ video, onClose }: VideoModalProps) => {
  
  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEsc);
    
    // Bloquear scroll del body mientras está abierto
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div 
      className={styles.modal} 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={video.name}
    >
      <div 
        className={styles.modal__content} 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className={styles.modal__closeBtn} 
          onClick={onClose}
          aria-label="Cerrar"
        >
          <FaTimes />
        </button>
        
        <div className={styles.modal__videoWrapper}>
          <iframe
            src={video.youtubeEmbedUrl}
            title={video.name}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.modal__iframe}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;