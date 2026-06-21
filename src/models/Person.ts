import { API_CONFIG, IMAGE_SIZES } from '../constants/api';

/**
 * Modelo Person
 * 
 * Representa un actor/actriz con datos biográficos y filmográficos.
 */
export class Person {
  id: number;
  name: string;
  biography: string;
  birthday: string;
  deathday: string | null;
  placeOfBirth: string;
  profilePath: string;
  knownForDepartment: string;
  gender: number;
  popularity: number;
  alsoKnownAs: string[];

  constructor(data: any) {
    this.id = data.id ?? 0;
    this.name = data.name ?? '';
    this.biography = data.biography ?? '';
    this.birthday = data.birthday ?? '';
    this.deathday = data.deathday ?? null;
    this.placeOfBirth = data.place_of_birth ?? '';
    this.profilePath = data.profile_path ?? '';
    this.knownForDepartment = data.known_for_department ?? '';
    this.gender = data.gender ?? 0;
    this.popularity = data.popularity ?? 0;
    this.alsoKnownAs = data.also_known_as ?? [];
  }

  get profileUrl(): string {
    return this.profilePath
      ? `${API_CONFIG.IMAGE_URL}/${IMAGE_SIZES.POSTER_MEDIUM}${this.profilePath}`
      : 'https://via.placeholder.com/500x750/243447/a0b0c0?text=?';
  }

  get formattedBirthday(): string {
    if (!this.birthday) return '';
    return new Date(this.birthday).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  get age(): number | null {
    if (!this.birthday) return null;
    const endDate = this.deathday ? new Date(this.deathday) : new Date();
    const birth = new Date(this.birthday);
    let age = endDate.getFullYear() - birth.getFullYear();
    const monthDiff = endDate.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && endDate.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  get isAlive(): boolean {
    return this.deathday === null;
  }

  /** Biografía recortada */
  shortBio(maxLength: number = 500): string {
    if (this.biography.length <= maxLength) return this.biography;
    return this.biography.substring(0, maxLength).trim() + '...';
  }
}