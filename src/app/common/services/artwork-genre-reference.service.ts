import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Option } from '../models/option.model';

@Injectable({
  providedIn: 'root'
})
export class ArtworkGenreReferenceService {
  constructor(private http: HttpClient) {}

  getAllGenres(): Observable<Option[]> {
    return this.http.get<Option[]>(`${environment.API_URL}/reference/genres/options`);
  }
}
