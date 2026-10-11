import { Routes } from '@angular/router';
import { Movie } from './movie/movie';
import { Movies } from './movies/movies';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'movies' },
  { path: 'movies', component: Movies, title: 'Películas | Cineclub' },
  { path: 'movie/:id', component: Movie, title: 'Detalle de película | Cineclub' },
  { path: '**', redirectTo: 'movies' }
];
