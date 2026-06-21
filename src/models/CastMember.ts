import { API_CONFIG, IMAGE_SIZES } from '../constants/api';

/**
 * Modelo CastMember
 * 
 * Representa un miembro del reparto de una serie.
 */
export class CastMember {
  id: number;
  name: string;
  character: string;
  profilePath: string;
  order: number;

  constructor(data: any) {
    this.id = data.id ?? 0;
    this.name = data.name ?? '';
    this.character = data.character ?? '';
    this.profilePath = data.profile_path ?? '';
    this.order = data.order ?? 999;
  }

  /** URL de la foto de perfil del actor */
  get profileUrl(): string {
    return this.profilePath
      ? `${API_CONFIG.IMAGE_URL}/${IMAGE_SIZES.PROFILE}${this.profilePath}`
      : 'https://via.placeholder.com/185x278/243447/a0b0c0?text=?';
  }
}