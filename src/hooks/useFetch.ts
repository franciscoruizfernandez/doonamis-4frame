import { useState, useEffect } from 'react';

/**
 * Hook genérico useFetch
 * 
 * Encapsula el patrón típico de:
 * - Estado de carga (loading)
 * - Estado de error
 * - Estado de datos
 * 
 * Recibe una función async que retorna los datos, y la ejecuta
 * cuando cambien las dependencias.
 * 
 * @example
 * const { data, loading, error } = useFetch(() => TmdbService.getPopularSeries());
 */
export function useFetch<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true; // Evita actualizar estado si el componente se desmontó

    const execute = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchFunction();
        if (isMounted) setData(result);
      } catch (err) {
        if (isMounted) {
          const message = err instanceof Error ? err.message : 'Error desconocido';
          setError(message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    execute();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}