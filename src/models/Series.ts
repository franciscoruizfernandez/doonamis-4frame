/**
 * Modelo Series
 * 
 * Representa una serie de TV obtenida de la API de TMDB.
 * Encapsula los datos crudos de la API y proporciona métodos
 * útiles para formatear y acceder a URLs de imágenes.
 */
export class Series {
  id: number;
  name: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  voteAverage: number;
  voteCount: number;
  firstAirDate: string;
  originalLanguage: string;
  popularity: number;

  constructor(data: any) {
    this.id = data.id ?? 0;
    this.name = data.name ?? 'Sin título';
    this.overview = data.overview ?? 'Sin descripción disponible.';
    this.posterPath = data.poster_path ?? '';
    this.backdropPath = data.backdrop_path ?? '';
    this.voteAverage = data.vote_average ?? 0;
    this.voteCount = data.vote_count ?? 0;
    this.firstAirDate = data.first_air_date ?? '';
    this.originalLanguage = data.original_language ?? '';
    this.popularity = data.popularity ?? 0;
  }

  /** URL completa del poster (tamaño medio) */
  get posterUrl(): string {
    return this.posterPath
      ? `https://image.tmdb.org/t/p/w500${this.posterPath}`
      : 'https://via.placeholder.com/500x750/1a2737/ffffff?text=Sin+Imagen';
  }

  /** URL completa del backdrop (imagen grande de fondo) */
  get backdropUrl(): string {
    return this.backdropPath
      ? `https://image.tmdb.org/t/p/original${this.backdropPath}`
      : '';
  }

  /** Nota formateada con un decimal (ej: "8.3") */
  get rating(): string {
    return this.voteAverage.toFixed(1);
  }

  /** Año de estreno (ej: "2005") */
  get year(): string {
    return this.firstAirDate ? this.firstAirDate.split('-')[0] : 'N/A';
  }

  /** Resumen corto (máx N caracteres) */
  shortOverview(maxLength: number = 120): string {
    if (this.overview.length <= maxLength) return this.overview;
    return this.overview.substring(0, maxLength).trim() + '...';
  }
}