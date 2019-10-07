import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { ArtCollectionPreview } from './art-collection-list/art-collection-preview-card/art-collection-preview.model';
import { ArtCollection } from './art-collection.model';

@Injectable()
export class ArtCollectionService {
  constructor(private http: HttpClient) {}

  getAllArtCollections(filter?: string): Observable<ArtCollectionPreview[]> {
    return this.http
      .get(`${environment.API_URL}/art-collection?filter=${filter}`)
      .pipe(map(result => result as ArtCollectionPreview[]));
  }

  getArtCollectionById(id: number): Observable<ArtCollection> {
    return this.http.get(`${environment.API_URL}/art-collection/${id}`).pipe(map(result => result as ArtCollection));
  }

  createArtCollection(artwork: ArtCollection): Observable<any> {
    return this.http.post(`${environment.API_URL}/art-collection`, artwork);
  }

  saveArtCollection(id: number, artwork: ArtCollection): Observable<any> {
    return this.http.put(`${environment.API_URL}/art-collection/${id}`, artwork);
  }

  deleteArtCollection(id: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}/art-collection/${id}`);
  }
}
