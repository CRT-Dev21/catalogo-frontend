# Catálogo de películas — frontend

Frontend desarrollado con Angular 20.3.1 para el API de Spring Boot.

## Ejecutar en local

1. Desde esta carpeta, instala dependencias la primera vez e inicia Angular:

   ```powershell
   npm install
   npm start
   ```

3. Abre <http://localhost:4200/>.

## Componentes y API

- `src/app/movies`: lista las películas obtenidas de `GET /api/movies`.
- `src/app/movie`: consulta y muestra una película con `GET /api/movies/{id}`.
- `src/app/add-movie`: agrega películas mediante `POST /api/movies`.
- `src/app/edit-movie`: edita películas mediante `PUT /api/movies/{id}`.
- `src/app/services/movie.service.ts`: cliente HTTP compartido para consultar, crear, editar y
  eliminar películas.

Las rutas de pantalla son `/` (inicio), `/movies`, `/movies/new`, `/movie/:id` y
`/movie/:id/edit`. La eliminación solicita confirmación y utiliza `DELETE /api/movies/{id}`.

## Página de inicio

- Bootstrap 5 se utiliza para el contenedor, la cuadrícula y los componentes responsivos.
- Agrega las imágenes en `public/images/`: `logo-catalogo.png` (logotipo del encabezado) y
  `fondo-catalogo.jpg` (fondo de toda la página).
- Sustituye en el pie de página los textos de ejemplo por tu nombre completo, código y correo.
