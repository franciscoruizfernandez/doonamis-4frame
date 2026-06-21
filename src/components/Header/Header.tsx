import { NavLink, Link } from 'react-router-dom';
import { FaSearch, FaBell, FaUserCircle } from 'react-icons/fa';
import styles from './Header.module.scss';

/**
 * Componente Header
 * 
 * Barra de navegación superior que contiene:
 * - Logo de la aplicación (enlace al home)
 * - Menú de navegación principal (For You, Movies, TV Shows)
 * - Barra de búsqueda
 * - Menú secundario (Favorites, My List)
 * - Icono de notificaciones y avatar de usuario
 */
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        
        {/* Logo */}
        <Link to="/" className={styles.header__logo}>
          <span className={styles.header__logoNumber}>4</span>
          <span className={styles.header__logoText}>FRAME</span>
        </Link>

        {/* Menú principal */}
        <nav className={styles.header__nav}>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `${styles.header__navLink} ${isActive ? styles['header__navLink--active'] : ''}`
            }
          >
            For You
          </NavLink>
          <NavLink to="/movies" className={styles.header__navLink}>
            Movies
          </NavLink>
          <NavLink to="/tv-shows" className={styles.header__navLink}>
            TV Shows
          </NavLink>
        </nav>

        {/* Barra de búsqueda */}
        <div className={styles.header__search}>
          <FaSearch className={styles.header__searchIcon} />
          <input 
            type="text" 
            placeholder="Search"
            className={styles.header__searchInput}
            aria-label="Buscar series y películas"
          />
        </div>

        {/* Menú secundario */}
        <nav className={styles.header__navSecondary}>
          <NavLink to="/favorites" className={styles.header__navLink}>
            Favorites
          </NavLink>
          <NavLink to="/my-list" className={styles.header__navLink}>
            My List
          </NavLink>
        </nav>

        {/* Acciones de usuario */}
        <div className={styles.header__actions}>
          <button 
            className={styles.header__notificationBtn} 
            aria-label="Notificaciones"
          >
            <FaBell />
          </button>
          <button 
            className={styles.header__avatarBtn} 
            aria-label="Perfil de usuario"
          >
            <FaUserCircle />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;