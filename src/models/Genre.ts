/**
 * Modelo Genre
 * 
 * Representa un género de TV/cine (ej: Comedia, Drama).
 */
export class Genre {
  id: number;
  name: string;

  constructor(data: any) {
    this.id = data.id ?? 0;
    this.name = data.name ?? '';
  }
}