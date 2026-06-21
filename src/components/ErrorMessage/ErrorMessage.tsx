import { FaExclamationTriangle } from 'react-icons/fa';
import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

/**
 * Componente ErrorMessage
 * 
 * Muestra un mensaje de error con opción de reintento.
 */
const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className={styles.error}>
      <FaExclamationTriangle className={styles.error__icon} />
      <h3 className={styles.error__title}>Algo salió mal</h3>
      <p className={styles.error__message}>{message}</p>
      {onRetry && (
        <button className={styles.error__retryBtn} onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;