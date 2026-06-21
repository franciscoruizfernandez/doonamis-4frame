import { Series } from '../models/Series';

/**
 * Servicio TMDB
 * 
 * Centraliza todas las llamadas a la API de The Movie Database.
 * Convierte las respuestas crudas en instancias de los modelos de la app.
 */

const API_KEY = 'cbea04e4165b81454086e0a336a05352';
const BASE_URL = 'https://api.themoviedb.org/3';
const DEFAULT_LANG = 'es-ES';

export class TmdbService {
  /**
   * Método privado y genérico para hacer peticiones a la API.
   * Añade automáticamente la API key y el idioma.
   * Lanza un error si la respuesta no es OK.
   */
  private static async fetchData<T = any>(endpoint: string): Promise<T> {
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=${DEFAULT_LANG}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Obtiene el listado de series populares.
   * @param page - Página de resultados (por defecto 1)
   */
  static async getPopularSeries(page: number = 1): Promise<Series[]> {
    const data = await this.fetchData(`/tv/popular?page=${page}`);
    return data.results.map((item: any) => new Series(item));
  }

  /**
   * Obtiene el detalle completo de una serie por su ID.
   */
  static async getSeriesDetail(id: number): Promise<Series> {
    const data = await this.fetchData(`/tv/${id}`);
    return new Series(data);
  }

  /**
   * Obtiene series similares a una dada.
   */
  static async getSimilarSeries(id: number): Promise<Series[]> {
    const data = await this.fetchData(`/tv/${id}/similar`);
    return data.results.map((item: any) => new Series(item));
  }

  /**
   * Obtiene recomendaciones basadas en una serie.
   */
  static async getRecommendations(id: number): Promise<Series[]> {
    const data = await this.fetchData(`/tv/${id}/recommendations`);
    return data.results.map((item: any) => new Series(item));
  }
}