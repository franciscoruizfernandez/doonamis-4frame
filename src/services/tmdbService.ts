import { Series } from '../models/Series';
import { SeriesDetail } from '../models/SeriesDetail';
import { API_CONFIG, ENDPOINTS } from '../constants/api';

/**
 * Servicio TMDB
 * 
 * Centraliza todas las llamadas a la API de The Movie Database.
 * Convierte las respuestas crudas en instancias de los modelos de la app.
 */
export class TmdbService {
  /**
   * Método privado y genérico para hacer peticiones a la API.
   * Añade automáticamente la API key y el idioma.
   */
  private static async fetchData<T = any>(
    endpoint: string,
    params: Record<string, string | number> = {}
  ): Promise<T> {
    // Construimos los query params dinámicos
    const queryParams = new URLSearchParams({
      api_key: API_CONFIG.KEY,
      language: API_CONFIG.LANGUAGE,
      ...Object.entries(params).reduce((acc, [k, v]) => {
        acc[k] = String(v);
        return acc;
      }, {} as Record<string, string>),
    });

    const url = `${API_CONFIG.BASE_URL}${endpoint}?${queryParams}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /** Series populares */
  static async getPopularSeries(page: number = 1): Promise<Series[]> {
    const data = await this.fetchData(ENDPOINTS.POPULAR_TV, { page });
    return data.results.map((item: any) => new Series(item));
  }

  /** Series mejor valoradas */
  static async getTopRatedSeries(page: number = 1): Promise<Series[]> {
    const data = await this.fetchData(ENDPOINTS.TOP_RATED_TV, { page });
    return data.results.map((item: any) => new Series(item));
  }

  /** Series en emisión */
  static async getOnTheAirSeries(page: number = 1): Promise<Series[]> {
    const data = await this.fetchData(ENDPOINTS.ON_THE_AIR_TV, { page });
    return data.results.map((item: any) => new Series(item));
  }

  /** Series que se emiten hoy */
  static async getAiringTodaySeries(page: number = 1): Promise<Series[]> {
    const data = await this.fetchData(ENDPOINTS.AIRING_TODAY_TV, { page });
    return data.results.map((item: any) => new Series(item));
  }

  /** Detalle de una serie */
  static async getSeriesDetail(id: number): Promise<SeriesDetail> {
    const data = await this.fetchData(ENDPOINTS.TV_DETAIL(id));
    return new SeriesDetail(data);
  }

  /** Series similares */
  static async getSimilarSeries(id: number): Promise<Series[]> {
    const data = await this.fetchData(ENDPOINTS.TV_SIMILAR(id));
    return data.results.map((item: any) => new Series(item));
  }

  /** Recomendaciones */
  static async getRecommendations(id: number): Promise<Series[]> {
    const data = await this.fetchData(ENDPOINTS.TV_RECOMMENDATIONS(id));
    return data.results.map((item: any) => new Series(item));
  }

  /** Buscador de series */
  static async searchSeries(query: string, page: number = 1): Promise<Series[]> {
    if (!query.trim()) return [];
    const data = await this.fetchData(ENDPOINTS.SEARCH_TV, { query, page });
    return data.results.map((item: any) => new Series(item));
  }

  /** Videos/trailers de una serie */
  static async getSeriesVideos(id: number): Promise<Video[]> {
    const data = await this.fetchData(ENDPOINTS.TV_VIDEOS(id));
    return data.results.map((item: any) => new Video(item));
  }
}

/**
 * Modelo Video (inline, ya que es pequeño)
 */
export class Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;

  constructor(data: any) {
    this.id = data.id ?? '';
    this.key = data.key ?? '';
    this.name = data.name ?? '';
    this.site = data.site ?? '';
    this.type = data.type ?? '';
    this.official = data.official ?? false;
  }

  get isYoutube(): boolean {
    return this.site === 'YouTube';
  }

  get isTrailer(): boolean {
    return this.type === 'Trailer';
  }

  get youtubeEmbedUrl(): string {
    return `https://www.youtube.com/embed/${this.key}?autoplay=1`;
  }
}