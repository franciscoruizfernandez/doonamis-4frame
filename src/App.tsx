// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';

/**
 * Componente raíz de la aplicación.
 * Configura el enrutamiento y el layout general (Header + Contenido + Footer).
 */
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />

        <main className="app__main">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Próximamente: <Route path="/series/:id" element={<SeriesDetail />} /> */}
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;