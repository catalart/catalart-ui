import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Option } from '../models/option.model';

@Injectable({
  providedIn: 'root'
})
export class ArtworkReferenceService {
  constructor(private http: HttpClient) {}

  getAllArtworkByArtist(artistId: number): Observable<Option[]> {
    return this.http.get<Option[]>(`${environment.API_URL}/reference/artwork?artistId=${artistId}`);
  }
}
