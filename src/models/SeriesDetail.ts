import { Series } from './Series';
import { Genre } from './Genre';

/**
 * Modelo SeriesDetail
 * 
 * Extiende Series con información adicional que solo está disponible
 * en el endpoint de detalle (/tv/{id}).
 */
export class SeriesDetail extends Series {
  numberOfSeasons: number;
  numberOfEpisodes: number;
  genres: Genre[];
  status: string;
  tagline: string;
  homepage: string;
  inProduction: boolean;
  lastAirDate: string;
  episodeRunTime: number[];

  constructor(data: any) {
    super(data);
    this.numberOfSeasons = data.number_of_seasons ?? 0;
    this.numberOfEpisodes = data.number_of_episodes ?? 0;
    this.genres = (data.genres ?? []).map((g: any) => new Genre(g));
    this.status = data.status ?? '';
    this.tagline = data.tagline ?? '';
    this.homepage = data.homepage ?? '';
    this.inProduction = data.in_production ?? false;
    this.lastAirDate = data.last_air_date ?? '';
    this.episodeRunTime = data.episode_run_time ?? [];
  }

  /** Nombres de géneros separados por coma */
  get genreNames(): string {
    return this.genres.map(g => g.name).join(', ');
  }

  /** Duración media de un episodio (ej: "45 min") */
  get runtime(): string {
    if (this.episodeRunTime.length === 0) return 'N/A';
    const avg = this.episodeRunTime[0];
    return `${avg} min`;
  }

  /** Estado traducido */
  get statusLabel(): string {
    const map: Record<string, string> = {
      'Returning Series': 'En emisión',
      'Ended': 'Finalizada',
      'Canceled': 'Cancelada',
      'In Production': 'En producción',
      'Pilot': 'Piloto',
    };
    return map[this.status] || this.status;
  }
}