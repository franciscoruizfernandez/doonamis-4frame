import { useState, useEffect } from 'react';

/**
 * Hook useDebounce
 * 
 * Retrasa la actualización de un valor hasta que ha pasado X tiempo
 * sin cambios. Útil para evitar peticiones excesivas en buscadores.
 * 
 * @param value - Valor a debouncing
 * @param delay - Tiempo en ms a esperar (por defecto 500)
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}