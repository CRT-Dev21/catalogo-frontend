import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Movie } from '../models/movie';
import { MovieService } from '../services/movie.service';
import { Movies } from './movies';

describe('Movies', () => {
  const movie: Movie = {
    id: 7,
    title: 'Película de prueba',
    synopsis: 'Sinopsis de prueba',
    year: 2025,
    cover: '/images/portada-prueba.jpg'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Movies],
      providers: [
        provideRouter([]),
        { provide: MovieService, useValue: { getMovies: () => of([movie]) } }
      ]
    }).compileComponents();
  });

  it('displays movies from the service with a detail link', () => {
    const fixture = TestBed.createComponent(Movies);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    const movieCard = element.querySelector('.movie-card');
    const detailLink = element.querySelector<HTMLAnchorElement>('.movie-card');

    expect(movieCard?.textContent).toContain(movie.title);
    expect(detailLink?.getAttribute('href')).toBe(`/movie/${movie.id}`);
  });
});
