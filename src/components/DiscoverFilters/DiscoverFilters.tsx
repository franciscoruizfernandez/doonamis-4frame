import { useState, useEffect } from 'react';
import { FaFilter, FaUndo } from 'react-icons/fa';
import { TmdbService } from '../../services/tmdbService';
import { Genre } from '../../models/Genre';
import { DiscoverFilters as DiscoverFiltersModel } from '../../models/Discover';
import styles from './DiscoverFilters.module.scss';

interface DiscoverFiltersProps {
  filters: DiscoverFiltersModel;
  onChange: (filters: DiscoverFiltersModel) => void;
}

/** Opciones de ordenación */
const SORT_OPTIONS = [
  { value: 'popularity.desc', label: 'Más populares' },
  { value: 'popularity.asc', label: 'Menos populares' },
  { value: 'vote_average.desc', label: 'Mejor valoradas' },
  { value: 'vote_average.asc', label: 'Peor valoradas' },
  { value: 'first_air_date.desc', label: 'Más recientes' },
  { value: 'first_air_date.asc', label: 'Más antiguas' },
];

/** Genera un rango de años */
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 50 }, (_, i) => CURRENT_YEAR - i);

/** Opciones de nota mínima */
const RATING_OPTIONS = [
  { value: 0, label: 'Cualquiera' },
  { value: 5, label: '5+' },
  { value: 6, label: '6+' },
  { value: 7, label: '7+' },
  { value: 8, label: '8+' },
  { value: 9, label: '9+' },
];

/**
 * Componente DiscoverFilters
 * 
 * Panel de filtros: género, año, valoración, ordenación.
 */
const DiscoverFiltersComponent = ({ filters, onChange }: DiscoverFiltersProps) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>(
    filters.withGenres ? filters.withGenres.split(',').map(Number) : []
  );

  // Cargar lista de géneros al montar
  useEffect(() => {
    TmdbService.getTvGenres()
      .then(setGenres)
      .catch(err => console.error('Error cargando géneros:', err));
  }, []);

  /** Toggle de un género (multi-select) */
  const handleGenreToggle = (genreId: number) => {
    const updated = selectedGenres.includes(genreId)
      ? selectedGenres.filter(id => id !== genreId)
      : [...selectedGenres, genreId];
    
    setSelectedGenres(updated);
    onChange(new DiscoverFiltersModel({
      ...filters,
      withGenres: updated.join(','),
      page: 1,
    }));
  };

  /** Cambio en select/input genérico */
  const handleChange = (key: keyof DiscoverFiltersModel, value: any) => {
    onChange(new DiscoverFiltersModel({
      ...filters,
      [key]: value,
      page: 1,
    }));
  };

  /** Reset de todos los filtros */
  const handleReset = () => {
    setSelectedGenres([]);
    onChange(new DiscoverFiltersModel());
  };

  return (
    <div className={styles.filters}>
      <div className={styles.filters__header}>
        <h3 className={styles.filters__title}>
          <FaFilter />
          Filtros
        </h3>
        <button className={styles.filters__resetBtn} onClick={handleReset}>
          <FaUndo />
          Limpiar
        </button>
      </div>

      {/* Géneros (multi-select chips) */}
      <div className={styles.filters__section}>
        <label className={styles.filters__label}>Géneros</label>
        <div className={styles.filters__genres}>
          {genres.map(genre => (
            <button
              key={genre.id}
              className={`${styles.filters__genreChip} ${
                selectedGenres.includes(genre.id) 
                  ? styles['filters__genreChip--active'] 
                  : ''
              }`}
              onClick={() => handleGenreToggle(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* Fila de selects */}
      <div className={styles.filters__row}>
        {/* Ordenar por */}
        <div className={styles.filters__section}>
          <label className={styles.filters__label}>Ordenar por</label>
          <select
            className={styles.filters__select}
            value={filters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Año */}
        <div className={styles.filters__section}>
          <label className={styles.filters__label}>Año</label>
          <select
            className={styles.filters__select}
            value={filters.year ?? ''}
            onChange={(e) => handleChange('year', e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">Todos</option>
            {YEARS.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        {/* Valoración mínima */}
        <div className={styles.filters__section}>
          <label className={styles.filters__label}>Nota mínima</label>
          <select
            className={styles.filters__select}
            value={filters.voteAverageGte ?? 0}
            onChange={(e) => handleChange('voteAverageGte', Number(e.target.value) || null)}
          >
            {RATING_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DiscoverFiltersComponent;