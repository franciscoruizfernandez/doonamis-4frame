import styles from './Loading.module.scss';

interface LoadingProps {
  message?: string;
}

/**
 * Componente Loading
 * 
 * Spinner visual para indicar estados de carga.
 */
const Loading = ({ message = 'Cargando...' }: LoadingProps) => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__spinner} />
      <p className={styles.loading__message}>{message}</p>
    </div>
  );
};

export default Loading;