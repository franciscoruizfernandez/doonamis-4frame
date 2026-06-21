/**
 * Modelo Review
 * 
 * Reseña/opinión de un usuario sobre una serie.
 */
export class Review {
  id: string;
  author: string;
  authorUsername: string;
  avatarPath: string;
  rating: number | null;
  content: string;
  createdAt: string;
  url: string;

  constructor(data: any) {
    this.id = data.id ?? '';
    this.author = data.author ?? 'Anónimo';
    this.authorUsername = data.author_details?.username ?? '';
    this.avatarPath = data.author_details?.avatar_path ?? '';
    this.rating = data.author_details?.rating ?? null;
    this.content = data.content ?? '';
    this.createdAt = data.created_at ?? '';
    this.url = data.url ?? '';
  }

  /** URL del avatar del usuario (maneja URLs externas e internas) */
  get avatarUrl(): string {
    if (!this.avatarPath) {
      // Generamos un avatar con iniciales si no hay foto
      const initial = this.author.charAt(0).toUpperCase();
      return `https://via.placeholder.com/100/e63462/ffffff?text=${initial}`;
    }
    // TMDB a veces guarda URLs externas con "/" inicial
    if (this.avatarPath.startsWith('/http')) {
      return this.avatarPath.substring(1);
    }
    return `https://image.tmdb.org/t/p/w185${this.avatarPath}`;
  }

  /** Fecha formateada en español */
  get formattedDate(): string {
    if (!this.createdAt) return '';
    return new Date(this.createdAt).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  /** Contenido recortado para preview */
  shortContent(maxLength: number = 300): string {
    if (this.content.length <= maxLength) return this.content;
    return this.content.substring(0, maxLength).trim() + '...';
  }
}