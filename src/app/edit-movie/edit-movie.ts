import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { getMovieSaveError } from '../movie-form-error';

const integerValidator: ValidatorFn = control =>
  Number.isInteger(control.value) ? null : { integer: true };
const nonBlankValidator: ValidatorFn = control =>
  typeof control.value === 'string' && control.value.trim().length > 0 ? null : { blank: true };

@Component({
  selector: 'app-edit-movie',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './edit-movie.html',
  styleUrl: '../movie-form.css'
})
export class EditMovie implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly movieService = inject(MovieService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly loading = signal(true);
  protected readonly loaded = signal(false);
  protected readonly saving = signal(false);
  protected readonly error = signal('');
  protected readonly movieId = signal<number | null>(null);

  protected readonly form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, nonBlankValidator]],
    synopsis: ['', [Validators.required, nonBlankValidator]],
    year: [new Date().getFullYear(), [Validators.required, Validators.min(1), integerValidator]],
    cover: ['', [Validators.required, nonBlankValidator]]
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isSafeInteger(id) || id < 1) {
      this.error.set('El identificador de la película no es válido.');
      this.loading.set(false);
      return;
    }

    this.movieId.set(id);
    this.movieService.getMovie(id).subscribe({
      next: movie => {
        this.form.setValue({
          title: movie.title,
          synopsis: movie.synopsis,
          year: movie.year,
          cover: movie.cover
        });
        this.loaded.set(true);
        this.loading.set(false);
      },
      error: (response: HttpErrorResponse) => {
        this.error.set(
          response.status === 404
            ? 'La película que intentas editar no existe en el catálogo.'
            : 'No se pudo cargar la película. Comprueba que Spring Boot esté en ejecución.'
        );
        this.loading.set(false);
      }
    });
  }

  protected save(): void {
    this.error.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const id = this.movieId();
    if (id === null) {
      this.error.set('No se puede guardar porque el identificador de la película no es válido.');
      return;
    }

    this.saving.set(true);
    this.movieService.updateMovie(id, this.form.getRawValue()).subscribe({
      next: () => {
        this.saving.set(false);
        void this.router.navigate(['/movie', id]);
      },
      error: (response: HttpErrorResponse) => {
        this.error.set(getMovieSaveError(response.status, 'update'));
        this.saving.set(false);
      }
    });
  }
}
