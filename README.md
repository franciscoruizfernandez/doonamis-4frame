# 4FRAME — TV Shows Explorer

Aplicación web para explorar series de TV utilizando la API de [The Movie Database (TMDB)](https://developers.themoviedb.org/3).

https://doonamis-4frame.vercel.app/

> Prueba técnica para puesto de Frontend Developer React.

## Sobre el proyecto - Enfoque y planteamiento
Esta aplicación ha sido desarrollada como prueba técnica para el puesto de Frontend Developer con React en Doonamis. El objetivo ha sido entregar un prototipo funcional y representativo de lo que sería una aplicación real de exploración de series, cubriendo las funcionalidades que considero más relevantes desde el punto de vista del usuario final y aprovechando al máximo las capacidades que ofrece la API de TMDB.

### Planteamiento

He estructurado el desarrollo en dos fases. Primero, he construido una base inicial sólida que cumple estrictamente con los requisitos planteados en el enunciado: proyecto en React con TypeScript y SCSS (sin Tailwind ni JavaScript plano), uso de React Router para la navegación entre la página principal y el detalle, separación clara en componentes reutilizables, modelos definidos como clases (no como interfaces) y una arquitectura que evita la repetición de código mediante hooks personalizados, servicios centralizados y componentes genéricos.

Una vez consolidada esa base, y como disponía de más margen de tiempo, he ido ampliando el alcance del proyecto con features secundarios que amplían la experiencia de usuario y aprovechan más la API, para construir algo más cercano a un producto real: si una persona entra a buscar una serie, quiere también poder filtrarlas, ver el reparto, leer reseñas, descubrir dónde verla y explorar episodios concretos.

### Criterios de prioridad

A la hora de decidir qué features implementar, he seguido un criterio basado en el uso real que un usuario haría de una plataforma de este tipo. Por eso he priorizado:

- **Navegación fluida y descubrimiento**: hero dinámico, tabs por categorías, buscador con resultados en tiempo real y página de exploración con filtros avanzados.
- **Información completa en el detalle**: reparto, episodios, galería, reseñas, plataformas de streaming y recomendaciones.
- **Persistencia y personalización**: sistema de favoritos guardado en LocalStorage.
- **Profundidad de navegación**: posibilidad de navegar desde un actor a su filmografía y desde ahí a otras series.

### Diseño y usabilidad

Tal y como indica el enunciado, he dado importancia tanto a la implementación técnica como al diseño estético y la maquetación. He partido del mockup proporcionado como referencia, manteniendo su línea visual, con paleta oscura y acentos rojos, layout de sidebar más contenido principal en el detalle, etc. pero adaptándolo y extendiéndolo para mejorar la experiencia.

Se ha trabajado la responsividad, los estados de carga y error, las animaciones sutiles, las transiciones entre estados y la accesibilidad básica.

### Decisiones técnicas destacables

- **Modelos como clases con getters**: encapsulan los datos y la lógica de presentación, evitando duplicar lógica en las vistas.
- **Custom hooks**: abstraen patrones repetitivos como peticiones a API y entrada de usuario diferida.
- **SCSS Modules con metodología BEM**: aislamiento de estilos por componente con una nomenclatura clara y mantenible.
- **Variables de entorno**: la API key no está hardcodeada en el código como en un proyecto real.
- **Servicio centralizado**: todas las llamadas a TMDB pasan por una única clase TmdbService, con un método genérico interno para construir las peticiones.


### Uso de inteligencia artifical

Durante el desarrollo del proyecto he hecho uso puntual de asistentes de IA como apoyo. Su uso ha sido básicamente para tareas concretas como acelerar la escritura de código repetitivo (por ejemplo, mapeo de campos en los constructores de los modelos), resolver dudas puntuales de sintaxis de SCSS o TypeScript, y revisar errores cuando aparecían bloqueos. En ningún caso se ha delegado en la IA el diseño de la arquitectura, la elección de patrones, la organización de componentes ni la implementación de las features principales. Las decisiones técnicas, la estructura del proyecto, el planteamiento de los modelos como clases con su lógica encapsulada, los custom hooks y la jerarquía de componentes han sido decisiones propias. El objetivo de su uso ha sido más de herramienta de aceleración de desarrollo, no para la toma de decisiones.

### Resultado

El proyecto final cubre alrededor de 19 endpoints distintos de la API de TMDB y consta de 7 páginas, más de 20 componentes reutilizables y una arquitectura pensada para crecer. He intentado encontrar un equilibrio entre demostrar conocimientos técnicos sólidos, entregar una aplicación visualmente cuidada y mantener un código limpio, organizado, documentado y fácilmente extensible.

## Características

- 🏠 **Home con tabs**: Tendencias, Populares, Mejor valoradas, En emisión, Hoy
- 🎯 **Hero dinámico** estilo Netflix con la serie destacada
- 🔍 **Buscador inteligente** con debounce y dropdown de resultados en tiempo real
- 🎛️ **Explorador avanzado** con filtros por género, año, valoración y ordenación
- 📺 **Detalle completo** de cada serie con:
  - Backdrop con reproductor de trailer
  - Información (temporadas, episodios, géneros, estado)
  - **Reparto** con foto, nombre y personaje
  - **Episodios por temporada** con miniaturas
  - **Galería de imágenes** con lightbox navegable
  - **Reseñas** de usuarios expandibles
  - **Plataformas de streaming** donde verla
  - Series similares y recomendaciones
- **Perfil de actor** con biografía y filmografía
- **Sistema de favoritos** persistido en LocalStorage
- **Responsive design** adaptado a móvil, tablet y escritorio
- **Animaciones suaves** y transiciones cuidadas

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| **React 18** | Librería UI |
| **TypeScript** | Tipado estático |
| **Vite** | Build tool y dev server |
| **React Router v6** | Navegación SPA |
| **SCSS Modules** | Estilos con scope local |
| **Context API** | Estado global (favoritos) |
| **Fetch API** | Peticiones HTTP nativas |
| **react-icons** | Iconografía |

## Estructura del proyecto
  src/
  ├── components/ # Componentes reutilizables
  │ ├── CastCard/
  │ ├── CastCarousel/
  │ ├── DiscoverFilters/
  │ ├── EpisodesList/
  │ ├── ErrorMessage/
  │ ├── Footer/
  │ ├── Header/
  │ ├── HeroBanner/
  │ ├── ImageGallery/
  │ ├── ImageLightbox/
  │ ├── Loading/
  │ ├── ReviewCard/
  │ ├── ReviewsSection/
  │ ├── SearchDropdown/
  │ ├── SeriesCard/
  │ ├── SeriesCarousel/
  │ ├── Tabs/
  │ ├── VideoModal/
  │ └── WatchProviders/
  ├── constants/ # Constantes (rutas, endpoints)
  ├── context/ # Context API (favoritos)
  ├── hooks/ # Custom hooks (useFetch, useDebounce)
  ├── models/ # Clases de modelos (Series, Episode, Person, etc.)
  ├── pages/ # Páginas/rutas principales
  │ ├── Explore/
  │ ├── Favorites/
  │ ├── Home/
  │ ├── NotFound/
  │ ├── PersonDetail/
  │ ├── Search/
  │ └── SeriesDetail/
  ├── services/ # Servicios de API (TmdbService)
  ├── styles/ # Estilos globales, variables y mixins
  └── App.tsx


## Instalación y ejecución

### Requisitos previos
- Node.js 18+
- npm o yarn

### Pasos

1. Clonar el repositorio:
git clone https://github.com/franciscoruizfernandez/doonamis-4frame.git
cd 4frame  

2. Instalar dependencias:
npm install

3. Crear archivo .env en la raíz con las variables:
VITE_TMDB_API_KEY=tu_api_key_aqui
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p

4. Ejecutar en modo desarrollo:
npm run dev

5. Abrir en el navegador: http://localhost:5173

### Scripts disponibles
npm run dev — Inicia el servidor de desarrollo
npm run build — Genera el build de producción
npm run preview — Previsualiza el build de producción

## Autor
Francisco Ruiz Fernández
franruiz.815@gmail.com  
+36 628 708 280

## Licencia
Este proyecto es solo para fines de evaluación técnica.
Este producto usa la API de TMDB pero no está respaldado ni certificado por TMDB.
