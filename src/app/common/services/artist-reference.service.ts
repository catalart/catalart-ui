import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enumeration } from '../models/enumeration.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Option } from '../models/option.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistReferenceService {
  constructor(private http: HttpClient) {}

  getAllArtists(): Observable<Enumeration[]> {
    return this.http
      .get<Option[]>(`${environment.API_URL}/reference/artists`)
      .pipe(map(results => results.map(r => new Enumeration(r.id, r.text))));
  }
}
