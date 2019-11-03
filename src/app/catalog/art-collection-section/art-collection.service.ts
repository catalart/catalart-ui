import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { ArtCollectionPreview } from './art-collection-list/art-collection-preview-card/art-collection-preview.model';
import { ArtCollection } from './art-collection.model';
import { Query } from 'src/app/common/models/query.model';
import { ListResponse } from 'src/app/common/models/response.model';

@Injectable()
export class ArtCollectionService {
  constructor(private http: HttpClient) {}

  getAllArtCollections(query: Query): Observable<ListResponse<ArtCollectionPreview>> {
    return this.http.get<ListResponse<ArtCollectionPreview>>(
      `${environment.API_URL}/art-collection?${query.toUrlParams()}`
    );
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
