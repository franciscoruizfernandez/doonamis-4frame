// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Home from './pages/Home/Home';
import SeriesDetail from './pages/SeriesDetail/SeriesDetail';
import Search from './pages/Search/Search';
import Favorites from './pages/Favorites/Favorites';
import NotFound from './pages/NotFound/NotFound';
import { ROUTES } from './constants/routes';

/**
 * Componente raíz de la aplicación.
 * Configura el enrutamiento y el layout general (Header + Contenido + Footer).
 */
function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="app">
          <Header />

          <main className="app__main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/series/:id" element={<SeriesDetail />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

export default App;