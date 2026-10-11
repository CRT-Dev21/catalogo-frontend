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
- `src/app/services/movie.service.ts`: cliente HTTP compartido para el catálogo.

Las rutas de pantalla son `/movies` y `/movie/:id`.
