import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Movie } from '../models/movie';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpTestingController: HttpTestingController;

  const movies: Movie[] = [
    {
      id: 7,
      title: 'Película de prueba',
      synopsis: 'Sinopsis de prueba',
      year: 2025,
      cover: '/images/portada-prueba.jpg'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(MovieService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('requests the complete movie catalogue from the backend', () => {
    let response: Movie[] | undefined;

    service.getMovies().subscribe(result => {
      response = result;
    });

    const request = httpTestingController.expectOne('/api/movies');
    expect(request.request.method).toBe('GET');
    request.flush(movies);

    expect(response).toEqual(movies);
  });
});
