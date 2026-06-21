import { Series } from './Series';

/**
 * Filtros disponibles para el endpoint Discover.
 */
export class DiscoverFilters {
  page: number;
  sortBy: string;
  withGenres: string;
  year: number | null;
  voteAverageGte: number | null;
  voteAverageLte: number | null;
  voteCountGte: number;

  constructor(data?: Partial<DiscoverFilters>) {
    this.page = data?.page ?? 1;
    this.sortBy = data?.sortBy ?? 'popularity.desc';
    this.withGenres = data?.withGenres ?? '';
    this.year = data?.year ?? null;
    this.voteAverageGte = data?.voteAverageGte ?? null;
    this.voteAverageLte = data?.voteAverageLte ?? null;
    this.voteCountGte = data?.voteCountGte ?? 50;
  }
}

/**
 * Respuesta paginada del endpoint Discover.
 */
export interface DiscoverResponse {
  series: Series[];
  totalPages: number;
  totalResults: number;
  page: number;
}