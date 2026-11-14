import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Movie } from './movie/movie';
import { Movies } from './movies/movies';

export const routes: Routes = [
  { path: '', component: Home, title: 'Inicio | Cineclub' },
  { path: 'movies', component: Movies, title: 'Películas | Cineclub' },
  {
    path: 'movies/new',
    loadComponent: () => import('./add-movie/add-movie').then(component => component.AddMovie),
    title: 'Agregar película | Cineclub'
  },
  { path: 'movie/:id', component: Movie, title: 'Detalle de película | Cineclub' },
  {
    path: 'movie/:id/edit',
    loadComponent: () => import('./edit-movie/edit-movie').then(component => component.EditMovie),
    title: 'Editar película | Cineclub'
  },
  { path: '**', redirectTo: 'movies' }
];
