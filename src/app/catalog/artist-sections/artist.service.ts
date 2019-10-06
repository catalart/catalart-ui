import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArtistPreview } from './artist-list/artist-preview-card/artist-preview.model';
import { map } from 'rxjs/operators';
import { Option } from 'src/app/common/models/option.model';
import { Artist } from './artist.model';

@Injectable()
export class ArtistService {
  constructor(private http: HttpClient) {}

  getAllArtists(): Observable<ArtistPreview[]> {
    return this.http.get<ArtistPreview[]>(`${environment.API_URL}/artists`);
  }

  getAllArtistsAsOptions(): Observable<Option[]> {
    return this.http
      .get<ArtistPreview[]>(`${environment.API_URL}/artists`)
      .pipe(map(result => result.map(r => new Option(r.id, r.name))));
  }

  getArtistById(id: number): Observable<Artist> {
    return this.http.get<Artist>(`${environment.API_URL}/artists/${id}`);
  }

  createArtist(artist: Artist): Observable<any> {
    return this.http.post(`${environment.API_URL}/artists`, artist);
  }

  saveArtist(id: number, artist: Artist): Observable<any> {
    return this.http.put(`${environment.API_URL}/artists/${id}`, artist);
  }

  deleteArtist(id: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}/artists/${id}`);
  }
}
