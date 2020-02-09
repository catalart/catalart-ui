import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Genre } from './genre.model';
import { ListResponse } from 'src/app/common/models/response.model';

@Injectable()
export class GenreService {
  constructor(private http: HttpClient) {}

  getAllGenres(): Observable<ListResponse<Genre>> {
    return this.http.get<ListResponse<Genre>>(`${environment.API_URL}/reference/genres`);
  }

  getGenreById(id: number): Observable<Genre> {
    return this.http.get(`${environment.API_URL}/reference/genres/${id}`).pipe(map(result => result as Genre));
  }

  createGenre(genre: Genre): Observable<any> {
    return this.http.post(`${environment.API_URL}/reference/genres`, genre);
  }

  saveGenre(id: number, genre: Genre): Observable<any> {
    return this.http.put(`${environment.API_URL}/reference/genres/${id}`, genre);
  }

  deleteGenre(id: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}/reference/genres/${id}`);
  }
}
