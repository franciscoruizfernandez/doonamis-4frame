import { Series } from '../models/Series';

const API_KEY = 'cbea04e4165b81454086e0a336a05352';
const BASE_URL = 'https://api.themoviedb.org/3';

export class TmdbService {
  private static async fetchData(endpoint: string): Promise<any> {
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=es-ES`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    return response.json();
  }

  static async getPopularSeries(page: number = 1): Promise<Series[]> {
    const data = await this.fetchData(`/tv/popular?page=${page}`);
    return data.results.map((item: any) => new Series(item));
  }

  static async getSeriesDetail(id: number): Promise<Series> {
    const data = await this.fetchData(`/tv/${id}`);
    return new Series(data);
  }

  static async getSimilarSeries(id: number): Promise<Series[]> {
    const data = await this.fetchData(`/tv/${id}/similar`);
    return data.results.map((item: any) => new Series(item));
  }

  static async getRecommendations(id: number): Promise<Series[]> {
    const data = await this.fetchData(`/tv/${id}/recommendations`);
    return data.results.map((item: any) => new Series(item));
  }
}