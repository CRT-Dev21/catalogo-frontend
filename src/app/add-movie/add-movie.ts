import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MovieService } from '../services/movie.service';
import { getMovieSaveError } from '../movie-form-error';

const integerValidator: ValidatorFn = control =>
  Number.isInteger(control.value) ? null : { integer: true };
const nonBlankValidator: ValidatorFn = control =>
  typeof control.value === 'string' && control.value.trim().length > 0 ? null : { blank: true };

@Component({
  selector: 'app-add-movie',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-movie.html',
  styleUrl: '../movie-form.css'
})
export class AddMovie {
  private readonly formBuilder = inject(FormBuilder);
  private readonly movieService = inject(MovieService);
  private readonly router = inject(Router);

  protected readonly saving = signal(false);
  protected readonly error = signal('');

  protected readonly form = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required, nonBlankValidator]],
    synopsis: ['', [Validators.required, nonBlankValidator]],
    year: [new Date().getFullYear(), [Validators.required, Validators.min(1), integerValidator]],
    cover: ['', [Validators.required, nonBlankValidator]]
  });

  protected save(): void {
    this.error.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.movieService.createMovie(this.form.getRawValue()).subscribe({
      next: movie => {
        this.saving.set(false);
        void this.router.navigate(['/movie', movie.id]);
      },
      error: (response: HttpErrorResponse) => {
        this.error.set(getMovieSaveError(response.status, 'create'));
        this.saving.set(false);
      }
    });
  }
}
