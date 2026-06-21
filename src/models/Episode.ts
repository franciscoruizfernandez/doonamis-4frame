import { API_CONFIG, IMAGE_SIZES } from '../constants/api';

/**
 * Modelo Episode
 * 
 * Representa un episodio individual de una temporada.
 */
export class Episode {
  id: number;
  name: string;
  overview: string;
  episodeNumber: number;
  seasonNumber: number;
  stillPath: string;
  airDate: string;
  voteAverage: number;
  runtime: number | null;

  constructor(data: any) {
    this.id = data.id ?? 0;
    this.name = data.name ?? '';
    this.overview = data.overview ?? '';
    this.episodeNumber = data.episode_number ?? 0;
    this.seasonNumber = data.season_number ?? 0;
    this.stillPath = data.still_path ?? '';
    this.airDate = data.air_date ?? '';
    this.voteAverage = data.vote_average ?? 0;
    this.runtime = data.runtime ?? null;
  }

  /** URL de la miniatura del episodio */
  get stillUrl(): string {
    return this.stillPath
      ? `${API_CONFIG.IMAGE_URL}/${IMAGE_SIZES.POSTER_MEDIUM}${this.stillPath}`
      : 'https://via.placeholder.com/500x281/243447/a0b0c0?text=Sin+imagen';
  }

  /** Rating formateado */
  get rating(): string {
    return this.voteAverage.toFixed(1);
  }

  /** Fecha formateada */
  get formattedDate(): string {
    if (!this.airDate) return '';
    return new Date(this.airDate).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }

  /** Etiqueta tipo "T2 E11" */
  get label(): string {
    return `T${this.seasonNumber} E${this.episodeNumber}`;
  }

  /** Duración formateada */
  get runtimeFormatted(): string {
    if (!this.runtime) return '';
    return `${this.runtime} min`;
  }
}