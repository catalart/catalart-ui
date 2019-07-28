import { Injectable } from '@angular/core';
import { Artwork } from './artwork.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArtworkPreview } from './artwork-list/artwork-preview-card/artwork-preview.model';
import { map } from 'rxjs/operators';

@Injectable()
export class ArtworkService {
  constructor(private http: HttpClient) {}

  getAllArtwork(): Observable<ArtworkPreview[]> {
    return this.http.get(`${environment.API_URL}/artwork`).pipe(map(result => result as ArtworkPreview[]));
  }

  getArtworkById(id: number): Observable<Artwork> {
    return this.http.get(`${environment.API_URL}/artwork/${id}`).pipe(map(result => result as Artwork));
  }

  createArtwork(artwork: Artwork): Observable<any> {
    return this.http.post(`${environment.API_URL}/artwork`, artwork);
  }

  saveArtwork(id: number, artwork: Artwork): Observable<any> {
    return this.http.post(`${environment.API_URL}/artwork/${id}`, artwork);
  }
}
