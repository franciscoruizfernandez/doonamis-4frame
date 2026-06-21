import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaUserCircle, FaHeart } from 'react-icons/fa';
import { ROUTES, buildRoute } from '../../constants/routes';
import styles from './Header.module.scss';

/**
 * Componente Header
 * 
 * Barra de navegación superior con logo, navegación, buscador 
 * y acciones de usuario.
 */
const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Maneja el submit del formulario de búsqueda.
   * Navega a /search?q=... con el término escrito.
   */
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(buildRoute.search(trimmed));
      setSearchQuery('');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        
        {/* Logo */}
        <Link to={ROUTES.HOME} className={styles.header__logo}>
          <span className={styles.header__logoNumber}>4</span>
          <span className={styles.header__logoText}>FRAME</span>
        </Link>

        {/* Menú principal */}
        <nav className={styles.header__nav}>
          <NavLink 
            to={ROUTES.HOME} 
            className={({ isActive }) => 
              `${styles.header__navLink} ${isActive ? styles['header__navLink--active'] : ''}`
            }
            end
          >
            TV Shows
          </NavLink>
          <NavLink 
            to={ROUTES.FAVORITES} 
            className={({ isActive }) => 
              `${styles.header__navLink} ${isActive ? styles['header__navLink--active'] : ''}`
            }
          >
            <FaHeart style={{ marginRight: '6px', fontSize: '0.85em' }} />
            Favoritos
          </NavLink>
        </nav>

        {/* Buscador */}
        <form 
          className={styles.header__search} 
          onSubmit={handleSearchSubmit}
          role="search"
        >
          <FaSearch className={styles.header__searchIcon} />
          <input 
            type="text" 
            placeholder="Buscar series..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.header__searchInput}
            aria-label="Buscar series"
          />
        </form>

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