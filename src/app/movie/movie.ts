import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Movie as MovieModel } from '../models/movie';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie',
  imports: [RouterLink],
  templateUrl: './movie.html',
  styleUrl: './movie.css'
})
export class Movie implements OnInit {
  private readonly movieService = inject(MovieService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly movie = signal<MovieModel | null>(null);
  protected readonly loading = signal(true);
  protected readonly deleting = signal(false);
  protected readonly error = signal('');
  protected readonly deleteError = signal('');

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isSafeInteger(id) || id < 1) {
      this.error.set('El identificador de la película no es válido.');
      this.loading.set(false);
      return;
    }

    this.movieService.getMovie(id).subscribe({
      next: movie => {
        this.movie.set(movie);
        this.loading.set(false);
      },
      error: response => {
        this.error.set(
          response.status === 404
            ? 'No encontramos esa película en el catálogo.'
            : 'No se pudo cargar la película. Comprueba que el backend esté en ejecución.'
        );
        this.loading.set(false);
      }
    });
  }

  protected deleteMovie(): void {
    const selectedMovie = this.movie();
    if (!selectedMovie || this.deleting()) {
      return;
    }

    const confirmed = window.confirm(
      `¿Deseas eliminar la película "${selectedMovie.title}"? Esta acción no se puede deshacer.`
    );
    if (!confirmed) {
      return;
    }

    this.deleteError.set('');
    this.deleting.set(true);
    this.movieService.deleteMovie(selectedMovie.id).subscribe({
      next: () => {
        void this.router.navigate(['/movies']);
      },
      error: (response: HttpErrorResponse) => {
        this.deleteError.set(
          response.status === 404
            ? 'La película ya no existe en el catálogo.'
            : 'No se pudo eliminar la película. Comprueba que Spring Boot esté en ejecución e inténtalo de nuevo.'
        );
        this.deleting.set(false);
      }
    });
  }
}
