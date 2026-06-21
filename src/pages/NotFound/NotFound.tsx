import { Link } from 'react-router-dom';
import { FaHome, FaSadTear } from 'react-icons/fa';
import { ROUTES } from '../../constants/routes';
import styles from './NotFound.module.scss';

/**
 * Página NotFound (404)
 * 
 * Se muestra cuando el usuario navega a una ruta inexistente.
 */
const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__content}>
        <FaSadTear className={styles.notFound__icon} />
        <h1 className={styles.notFound__code}>404</h1>
        <h2 className={styles.notFound__title}>Página no encontrada</h2>
        <p className={styles.notFound__message}>
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link to={ROUTES.HOME} className={styles.notFound__btn}>
          <FaHome />
          <span>Volver al inicio</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;