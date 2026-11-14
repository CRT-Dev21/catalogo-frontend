import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieRequest } from '../models/movie';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = '/api/movies';

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.endpoint);
  }

  getMovie(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.endpoint}/${id}`);
  }

  createMovie(movie: MovieRequest): Observable<Movie> {
    return this.http.post<Movie>(this.endpoint, movie);
  }

  updateMovie(id: number, movie: MovieRequest): Observable<Movie> {
    return this.http.put<Movie>(`${this.endpoint}/${id}`, movie);
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
