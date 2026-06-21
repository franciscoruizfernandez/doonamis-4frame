/**
 * Constantes de la API TMDB
 * 
 * Centralizan URLs, endpoints y configuración para evitar valores
 * mágicos repetidos en el código.
 */

export const API_CONFIG = {
  KEY: import.meta.env.VITE_TMDB_API_KEY,
  BASE_URL: import.meta.env.VITE_TMDB_BASE_URL,
  IMAGE_URL: import.meta.env.VITE_TMDB_IMAGE_URL,
  LANGUAGE: 'es-ES',
} as const;

export const IMAGE_SIZES = {
  POSTER_SMALL: 'w200',
  POSTER_MEDIUM: 'w500',
  BACKDROP: 'original',
  PROFILE: 'w185',
} as const;

export const ENDPOINTS = {
  POPULAR_TV: '/tv/popular',
  TOP_RATED_TV: '/tv/top_rated',
  ON_THE_AIR_TV: '/tv/on_the_air',
  AIRING_TODAY_TV: '/tv/airing_today',
  TV_DETAIL: (id: number) => `/tv/${id}`,
  TV_SIMILAR: (id: number) => `/tv/${id}/similar`,
  TV_RECOMMENDATIONS: (id: number) => `/tv/${id}/recommendations`,
  TV_VIDEOS: (id: number) => `/tv/${id}/videos`,
  TV_CREDITS: (id: number) => `/tv/${id}/credits`,
  SEARCH_TV: '/search/tv',
  TV_WATCH_PROVIDERS: (id: number) => `/tv/${id}/watch/providers`,
} as const;