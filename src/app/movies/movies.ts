import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  imports: [RouterLink],
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies implements OnInit {
  private readonly movieService = inject(MovieService);

  protected readonly movies = signal<Movie[]>([]);
  protected readonly loading = signal(true);
  protected readonly error = signal('');

  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: movies => {
        this.movies.set(movies);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el catálogo. Comprueba que el backend esté en ejecución.');
        this.loading.set(false);
      }
    });
  }
}
