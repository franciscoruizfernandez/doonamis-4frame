import { API_CONFIG, IMAGE_SIZES } from '../constants/api';

/**
 * Modelo SeriesImage
 * 
 * Representa una imagen (backdrop o poster) de una serie.
 */
export class SeriesImage {
  filePath: string;
  width: number;
  height: number;
  aspectRatio: number;
  voteAverage: number;

  constructor(data: any) {
    this.filePath = data.file_path ?? '';
    this.width = data.width ?? 0;
    this.height = data.height ?? 0;
    this.aspectRatio = data.aspect_ratio ?? 0;
    this.voteAverage = data.vote_average ?? 0;
  }

  /** URL de la miniatura */
  get thumbnailUrl(): string {
    return `${API_CONFIG.IMAGE_URL}/${IMAGE_SIZES.POSTER_MEDIUM}${this.filePath}`;
  }

  /** URL de la imagen completa */
  get fullUrl(): string {
    return `${API_CONFIG.IMAGE_URL}/${IMAGE_SIZES.BACKDROP}${this.filePath}`;
  }

  /** Indica si es horizontal (backdrop) o vertical (poster) */
  get isLandscape(): boolean {
    return this.aspectRatio > 1;
  }
}