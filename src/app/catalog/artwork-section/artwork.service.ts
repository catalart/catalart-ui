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

  createArtwork(artwork: Artwork): Observable<any> {
    return this.http.post(`${environment.API_URL}/artwork`, artwork);
  }

  getAllArtwork(): Observable<ArtworkPreview[]> {
    return this.http.get(`${environment.API_URL}/artwork`).pipe(map(result => result as ArtworkPreview[]));
  }
}
