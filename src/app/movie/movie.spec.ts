import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { Movie as MovieModel } from '../models/movie';
import { MovieService } from '../services/movie.service';
import { Movie } from './movie';

describe('Movie', () => {
  const movie: MovieModel = {
    id: 7,
    title: 'Película de prueba',
    synopsis: 'Sinopsis de prueba',
    year: 2025,
    cover: '/images/portada-prueba.jpg'
  };
  const movieService = jasmine.createSpyObj<MovieService>('MovieService', [
    'getMovie',
    'deleteMovie'
  ]);

  beforeEach(async () => {
    movieService.getMovie.and.returnValue(of(movie));
    movieService.deleteMovie.and.returnValue(of(void 0));

    await TestBed.configureTestingModule({
      imports: [Movie],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => String(movie.id) } } }
        },
        { provide: MovieService, useValue: movieService }
      ]
    }).compileComponents();
  });

  it('does not delete the movie when confirmation is declined', () => {
    const confirmation = spyOn(window, 'confirm').and.returnValue(false);
    const fixture = TestBed.createComponent(Movie);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    element.querySelector<HTMLButtonElement>('.btn-outline-danger')?.click();

    expect(confirmation).toHaveBeenCalled();
    expect(movieService.deleteMovie).not.toHaveBeenCalled();
  });

  it('deletes the movie after confirmation and returns to the catalogue', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    const fixture = TestBed.createComponent(Movie);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    element.querySelector<HTMLButtonElement>('.btn-outline-danger')?.click();

    expect(movieService.deleteMovie).toHaveBeenCalledWith(movie.id);
    expect(router.navigate).toHaveBeenCalledWith(['/movies']);
  });
});
