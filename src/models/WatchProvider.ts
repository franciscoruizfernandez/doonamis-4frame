import { API_CONFIG, IMAGE_SIZES } from '../constants/api';

/**
 * Modelo WatchProvider
 * 
 * Representa una plataforma de streaming (Netflix, HBO, etc.) donde
 * se puede ver una serie.
 */
export class WatchProvider {
  providerId: number;
  providerName: string;
  logoPath: string;
  displayPriority: number;

  constructor(data: any) {
    this.providerId = data.provider_id ?? 0;
    this.providerName = data.provider_name ?? '';
    this.logoPath = data.logo_path ?? '';
    this.displayPriority = data.display_priority ?? 999;
  }

  /** URL del logo de la plataforma */
  get logoUrl(): string {
    return this.logoPath
      ? `${API_CONFIG.IMAGE_URL}/${IMAGE_SIZES.POSTER_SMALL}${this.logoPath}`
      : '';
  }
}

/**
 * Agrupa los providers por tipo de acceso (suscripción, alquiler, compra).
 */
export interface WatchProvidersGroup {
  flatrate: WatchProvider[];  // Suscripción
  rent: WatchProvider[];      // Alquiler
  buy: WatchProvider[];       // Compra
  link: string;               // Link a TMDB con info detallada
}