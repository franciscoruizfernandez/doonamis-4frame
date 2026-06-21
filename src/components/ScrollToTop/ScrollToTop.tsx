import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente ScrollToTop
 * 
 * Hace scroll al inicio de la página cada vez que cambia la ruta (por defecto no se hace).
 * No renderiza nada, solo ejecuta el efecto.
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;