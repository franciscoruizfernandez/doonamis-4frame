import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import styles from './Footer.module.scss';

/**
 * Componente Footer
 * 
 * Pie de página de la aplicación que contiene:
 * - Logo
 * - Enlaces de navegación secundaria
 * - Iconos de redes sociales
 */

// Configuración de enlaces para evitar repetición y facilitar mantenimiento
const NAV_LINKS = [
  { to: '/', label: 'For You' },
  { to: '/movies', label: 'Movies' },
  { to: '/tv-shows', label: 'TV Shows' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/my-list', label: 'My List' },
  { to: '/settings', label: 'User Settings' },
];

const SOCIAL_LINKS = [
  { href: 'https://facebook.com', icon: <FaFacebookF />, label: 'Facebook' },
  { href: 'https://instagram.com', icon: <FaInstagram />, label: 'Instagram' },
  { href: 'https://twitter.com', icon: <FaTwitter />, label: 'Twitter' },
  { href: 'https://youtube.com', icon: <FaYoutube />, label: 'YouTube' },
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        
        {/* Logo */}
        <Link to="/" className={styles.footer__logo}>
          <span className={styles.footer__logoText}>4FRAME</span>
        </Link>

        {/* Navegación */}
        <nav className={styles.footer__nav}>
          {NAV_LINKS.map(link => (
            <Link 
              key={link.to} 
              to={link.to} 
              className={styles.footer__navLink}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Redes sociales */}
        <div className={styles.footer__social}>
          {SOCIAL_LINKS.map(social => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footer__socialLink}
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;