import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Option } from '../models/option.model';

@Injectable({
  providedIn: 'root'
})
export class ClassificationTermReferenceService {
  constructor(private http: HttpClient) {}

  getAllClassificationTerms(): Observable<Option[]> {
    return this.http.get<Option[]>(`${environment.API_URL}/reference/classificationTerm`);
  }
}
