import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  public baseApi = `${environment.fakeRestEndPoint}/movies`;

  constructor(private http: HttpClient) {}

  public getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.baseApi);
  }

  public updateMovie(payload: Movie) {
    return this.http.put(`${this.baseApi}/${payload.id}`, payload);
  }

  public deleteMovie(payload: Movie) {
    return this.http.delete(`${this.baseApi}/${payload.id}`);
  }

  public getById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.baseApi}/${id}`);
  }
}
