/**
 * Rutas de la aplicación
 * 
 * Centralizadas para evitar strings duplicados y facilitar cambios.
 */

export const ROUTES = {
  HOME: '/',
  SERIES_DETAIL: '/series/:id',
  SEARCH: '/search',
  FAVORITES: '/favorites',
  EXPLORE: '/explore',
  NOT_FOUND: '*',
} as const;

/**
 * Helper para construir URLs dinámicas
 */
export const buildRoute = {
  seriesDetail: (id: number | string) => `/series/${id}`,
  search: (query: string) => `/search?q=${encodeURIComponent(query)}`,
};