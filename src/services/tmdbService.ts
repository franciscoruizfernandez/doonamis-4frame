import { Series } from '../models/Series';
import { SeriesDetail } from '../models/SeriesDetail';
import { API_CONFIG, ENDPOINTS } from '../constants/api';
import { CastMember } from '../models/CastMember';
import type { WatchProvidersGroup } from '../models/WatchProvider';
import { WatchProvider } from '../models/WatchProvider';
import { Review } from '../models/Review';
import { DiscoverFilters } from '../models/Discover';
import type { DiscoverResponse } from '../models/Discover';
import { Genre } from '../models/Genre';
import { Episode } from '../models/Episode';
import { SeriesImage } from '../models/SeriesImage';

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

  /** Obtiene el reparto (cast) de una serie */
  static async getSeriesCast(id: number): Promise<CastMember[]> {
    const data = await this.fetchData(ENDPOINTS.TV_CREDITS(id));
    return (data.cast ?? [])
      .map((item: any) => new CastMember(item))
      .sort((a: CastMember, b: CastMember) => a.order - b.order);
  }

  /**
  * Obtiene las plataformas donde se puede ver una serie.
  * Devuelve los providers de España por defecto, con fallback a US.
  */
  static async getWatchProviders(id: number): Promise<WatchProvidersGroup | null> {
    const data = await this.fetchData(ENDPOINTS.TV_WATCH_PROVIDERS(id));
    const results = data.results ?? {};
    
    // Preferimos España, si no hay datos usamos US
    const region = results.ES ?? results.US;
    if (!region) return null;

    return {
      flatrate: (region.flatrate ?? [])
        .map((p: any) => new WatchProvider(p))
        .sort((a: WatchProvider, b: WatchProvider) => a.displayPriority - b.displayPriority),
      rent: (region.rent ?? []).map((p: any) => new WatchProvider(p)),
      buy: (region.buy ?? []).map((p: any) => new WatchProvider(p)),
      link: region.link ?? '',
    };
  }

  /** Series en tendencia hoy */
  static async getTrendingDay(page: number = 1): Promise<Series[]> {
    const data = await this.fetchData(ENDPOINTS.TRENDING_TV_DAY, { page });
    return data.results.map((item: any) => new Series(item));
  }

  /** Series en tendencia esta semana */
  static async getTrendingWeek(page: number = 1): Promise<Series[]> {
    const data = await this.fetchData(ENDPOINTS.TRENDING_TV_WEEK, { page });
    return data.results.map((item: any) => new Series(item));
  }

  /** Obtiene las reseñas de una serie */
  static async getSeriesReviews(id: number): Promise<Review[]> {
    const data = await this.fetchData(ENDPOINTS.TV_REVIEWS(id));
    return (data.results ?? []).map((item: any) => new Review(item));
  }

  /**
  * Obtiene la lista de todos los géneros de TV disponibles.
  */
  static async getTvGenres(): Promise<Genre[]> {
    const data = await this.fetchData(ENDPOINTS.GENRE_TV_LIST);
    return (data.genres ?? []).map((g: any) => new Genre(g));
  }

  /**
  * Obtiene las imágenes (backdrops y posters) de una serie.
  * No filtra por idioma para obtener más resultados.
  */
  static async getSeriesImages(id: number): Promise<{ backdrops: SeriesImage[], posters: SeriesImage[] }> {
    // Para imágenes pedimos sin filtro de idioma
    const data = await this.fetchData(ENDPOINTS.TV_IMAGES(id), { include_image_language: 'en,null' });
    return {
      backdrops: (data.backdrops ?? []).map((img: any) => new SeriesImage(img)),
      posters: (data.posters ?? []).map((img: any) => new SeriesImage(img)),
    };
  }

  /**
  * Descubre series con filtros avanzados.
  * Combina múltiples parámetros opcionales.
  */
  static async discoverSeries(filters: DiscoverFilters): Promise<DiscoverResponse> {
    const params: Record<string, string | number> = {};

    if (filters.page) params.page = filters.page;
    if (filters.sortBy) params.sort_by = filters.sortBy;
    if (filters.withGenres) params.with_genres = filters.withGenres;
    if (filters.year) params.first_air_date_year = filters.year;
    if (filters.voteAverageGte) params['vote_average.gte'] = filters.voteAverageGte;
    if (filters.voteAverageLte) params['vote_average.lte'] = filters.voteAverageLte;
    if (filters.voteCountGte) params['vote_count.gte'] = filters.voteCountGte;

    const data = await this.fetchData(ENDPOINTS.DISCOVER_TV, params);
    return {
      series: data.results.map((item: any) => new Series(item)),
      totalPages: data.total_pages ?? 1,
      totalResults: data.total_results ?? 0,
      page: data.page ?? 1,
    };
  }

  /** Obtiene los episodios de una temporada específica. */
  static async getSeasonEpisodes(seriesId: number, seasonNumber: number): Promise<Episode[]> {
    const data = await this.fetchData(ENDPOINTS.TV_SEASON(seriesId, seasonNumber));
    return (data.episodes ?? []).map((ep: any) => new Episode(ep));
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