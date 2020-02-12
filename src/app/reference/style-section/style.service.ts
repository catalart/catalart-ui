import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Style } from './style.model';
import { ListResponse } from 'src/app/common/models/response.model';

@Injectable()
export class StyleService {
  constructor(private http: HttpClient) {}

  getAllStyles(): Observable<ListResponse<Style>> {
    return this.http.get<ListResponse<Style>>(`${environment.API_URL}/reference/styles`);
  }

  getStyleById(id: number): Observable<Style> {
    return this.http.get(`${environment.API_URL}/reference/styles/${id}`).pipe(map(result => result as Style));
  }

  createStyle(style: Style): Observable<any> {
    return this.http.post(`${environment.API_URL}/reference/styles`, style);
  }

  saveStyle(id: number, style: Style): Observable<any> {
    return this.http.put(`${environment.API_URL}/reference/styles/${id}`, style);
  }

  deleteStyle(id: number): Observable<any> {
    return this.http.delete(`${environment.API_URL}/reference/styles/${id}`);
  }
}
