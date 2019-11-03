import { Injectable } from '@angular/core';
import { Artwork } from './artwork.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ArtworkPreview } from './artwork-list/artwork-preview-card/artwork-preview.model';
import { map } from 'rxjs/operators';
import { Option } from 'src/app/common/models/option.model';
import { Query } from 'src/app/common/models/query.model';
import { ListResponse } from 'src/app/common/models/response.model';

@Injectable()
export class ArtworkService {
  constructor(private http: HttpClient) {}

  getAllArtwork(query: Query): Observable<ListResponse<ArtworkPreview>> {
    return this.http.get<ListResponse<ArtworkPreview>>(`${environment.API_URL}/artwork?${query.toUrlParams()}`);
  }

  getAllArtworkAsOptions(): Observable<Option[]> {
    return this.http
      .get<ArtworkPreview[]>(`${environment.API_URL}/artwork`)
      .pipe(map(result => result.map(r => new Option(r.id, r.title))));
  }

  getArtworkById(id: number): Observable<Artwork> {
    return this.http.get<Artwork>(`${environment.API_URL}/artwork/${id}`);
  }

  createArtwork(artwork: Artwork): Observable<any> {
    return this.http.post(`${environment.API_URL}/artwork`, artwork);
  }

  saveArtwork(id: number, artwork: Artwork): Observable<any> {
    return this.http.put(`${environment.API_URL}/artwork/${id}`, artwork);
  }

  deleteArtwork(id: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}/artwork/${id}`);
  }
}
