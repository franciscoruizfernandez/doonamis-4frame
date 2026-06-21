import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { Series } from '../models/Series';

const STORAGE_KEY = '4frame_favorites';

interface FavoritesContextType {
  favorites: Series[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (series: Series) => void;
  removeFavorite: (id: number) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

/**
 * Provider del Context de Favoritos.
 * 
 * Gestiona la lista de series favoritas del usuario, persistida
 * en localStorage para que sobreviva a recargas de página.
 */
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Series[]>([]);

  // Cargar favoritos del localStorage al iniciar
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Reconstruir como instancias de Series
        const seriesInstances = parsed.map((data: any) => new Series(data));
        setFavorites(seriesInstances);
      }
    } catch (err) {
      console.error('Error al cargar favoritos:', err);
    }
  }, []);

  // Guardar en localStorage cada vez que cambien
  useEffect(() => {
    try {
      // Guardamos los datos crudos (no las instancias) para serialización limpia
      const dataToStore = favorites.map(s => ({
        id: s.id,
        name: s.name,
        overview: s.overview,
        poster_path: s.posterPath,
        backdrop_path: s.backdropPath,
        vote_average: s.voteAverage,
        vote_count: s.voteCount,
        first_air_date: s.firstAirDate,
        original_language: s.originalLanguage,
        popularity: s.popularity,
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (err) {
      console.error('Error al guardar favoritos:', err);
    }
  }, [favorites]);

  const isFavorite = (id: number): boolean => {
    return favorites.some(s => s.id === id);
  };

  const toggleFavorite = (series: Series) => {
    setFavorites(prev => {
      if (prev.some(s => s.id === series.id)) {
        return prev.filter(s => s.id !== series.id);
      }
      return [...prev, series];
    });
  };

  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(s => s.id !== id));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider 
      value={{ favorites, isFavorite, toggleFavorite, removeFavorite, clearFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

/**
 * Hook para acceder al contexto de favoritos.
 * Lanza error si se usa fuera del provider.
 */
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  }
  return context;
};