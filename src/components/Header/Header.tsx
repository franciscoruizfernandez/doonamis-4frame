import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBell, FaUserCircle, FaHeart } from 'react-icons/fa';
import { ROUTES, buildRoute } from '../../constants/routes';
import { useDebounce } from '../../hooks/useDebounce';
import { TmdbService } from '../../services/tmdbService';
import { Series } from '../../models/Series';
import SearchDropdown from '../SearchDropdown/SearchDropdown';
import styles from './Header.module.scss';

/**
 * Componente Header
 * 
 * Barra de navegación superior con logo, navegación, buscador 
 * en tiempo real (con debounce) y acciones de usuario.
 */
const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Series[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Aplicamos debounce de 400ms al texto buscado
  const debouncedQuery = useDebounce(searchQuery, 400);

  /**
   * Cierra el dropdown al hacer click fuera de él.
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  /**
   * Ejecuta la búsqueda cada vez que cambia el query debounced.
   */
  useEffect(() => {
    const search = async () => {
      console.log('🎨 State:', { showDropdown, resultsCount: results.length, query: debouncedQuery });
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      try {
        setLoading(true);
        const data = await TmdbService.searchSeries(debouncedQuery);
        setResults(data);
      } catch (err) {
        console.error('Error en búsqueda:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [debouncedQuery]);

  /**
   * Submit del formulario: va a la página completa de resultados.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(buildRoute.search(trimmed));
      setSearchQuery('');
      setShowDropdown(false);
    }
  };

  /**
   * Click en "Ver todos los resultados" del dropdown.
   */
  const handleSeeAll = () => {
    navigate(buildRoute.search(searchQuery));
    setSearchQuery('');
    setShowDropdown(false);
  };

  /**
   * Click en un item del dropdown: cierra dropdown.
   */
  const handleSelect = () => {
    setSearchQuery('');
    setShowDropdown(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        
        {/* Logo */}
        <Link to={ROUTES.HOME} className={styles.header__logo}>
          <span className={styles.header__logoNumber}>4</span>
          <span className={styles.header__logoText}>FRAME</span>
        </Link>

        {/* Menú */}
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

          <NavLink 
          to={ROUTES.EXPLORE} 
          className={({ isActive }) => 
            `${styles.header__navLink} ${isActive ? styles['header__navLink--active'] : ''}`
          }
        >
          Explorar
        </NavLink>
        </nav>

        {/* Buscador con dropdown */}
        <div className={styles.header__searchContainer} ref={searchRef}>
          <form 
            className={styles.header__search} 
            onSubmit={handleSubmit}
            role="search"
          >
            <FaSearch className={styles.header__searchIcon} />
            <input 
              type="text" 
              placeholder="Buscar series..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              className={styles.header__searchInput}
              aria-label="Buscar series"
            />
          </form>

          {showDropdown && (
            <SearchDropdown
              results={results}
              loading={loading}
              query={debouncedQuery}
              onSelect={handleSelect}
              onSeeAll={handleSeeAll}
            />
          )}
        </div>

        {/* Acciones */}
        <div className={styles.header__actions}>
          <button className={styles.header__notificationBtn} aria-label="Notificaciones">
            <FaBell />
          </button>
          <button className={styles.header__avatarBtn} aria-label="Perfil de usuario">
            <FaUserCircle />
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;