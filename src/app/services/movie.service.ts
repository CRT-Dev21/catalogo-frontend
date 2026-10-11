import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';

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
}
