import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Movie, MovieRequest } from '../models/movie';
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
  const movieRequest: MovieRequest = {
    title: 'Película de prueba',
    synopsis: 'Sinopsis de prueba',
    year: 2025,
    cover: '/images/portada-prueba.jpg'
  };

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

  it('creates a movie with POST', () => {
    let response: Movie | undefined;

    service.createMovie(movieRequest).subscribe(result => {
      response = result;
    });

    const request = httpTestingController.expectOne('/api/movies');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(movieRequest);
    request.flush({ id: 7, ...movieRequest });

    expect(response).toEqual({ id: 7, ...movieRequest });
  });

  it('updates a movie with PUT using its ID', () => {
    let response: Movie | undefined;

    service.updateMovie(7, movieRequest).subscribe(result => {
      response = result;
    });

    const request = httpTestingController.expectOne('/api/movies/7');
    expect(request.request.method).toBe('PUT');
    expect(request.request.body).toEqual(movieRequest);
    request.flush({ id: 7, ...movieRequest });

    expect(response).toEqual({ id: 7, ...movieRequest });
  });

  it('deletes a movie with DELETE using its ID', () => {
    let completed = false;

    service.deleteMovie(7).subscribe(() => {
      completed = true;
    });

    const request = httpTestingController.expectOne('/api/movies/7');
    expect(request.request.method).toBe('DELETE');
    request.flush(null);

    expect(completed).toBeTrue();
  });
});
