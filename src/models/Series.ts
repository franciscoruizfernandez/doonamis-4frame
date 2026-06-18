export class Series {
  id: number;
  name: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  voteAverage: number;
  firstAirDate: string;

  constructor(data: any) {
    this.id = data.id ?? 0;
    this.name = data.name ?? 'Sin título';
    this.overview = data.overview ?? '';
    this.posterPath = data.poster_path ?? '';
    this.backdropPath = data.backdrop_path ?? '';
    this.voteAverage = data.vote_average ?? 0;
    this.firstAirDate = data.first_air_date ?? '';
  }

  get posterUrl(): string {
    return this.posterPath
      ? `https://image.tmdb.org/t/p/w500${this.posterPath}`
      : '/placeholder.jpg';
  }

  get backdropUrl(): string {
    return this.backdropPath
      ? `https://image.tmdb.org/t/p/original${this.backdropPath}`
      : '';
  }

  get rating(): string {
    return this.voteAverage.toFixed(1);
  }

  get year(): string {
    return this.firstAirDate ? this.firstAirDate.split('-')[0] : '';
  }
}