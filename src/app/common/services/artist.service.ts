import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Enumeration } from '../models/enumeration.model';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Artist } from '../models/artist.model';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  constructor(private http: HttpClient) {}

  getAllArtists(): Observable<Enumeration[]> {
    return this.http
      .get<Artist[]>(`${environment.API_URL}/artists`)
      .pipe(map(results => results.map(r => new Enumeration(r.id, r.identity))));
  }
}
