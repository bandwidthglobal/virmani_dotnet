// patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class PatientEditService {
  private apiUrl = 'https://localhost:7069/api';

  constructor(private http: HttpClient) {}

  getPatient(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Patient/Get/${id}`);
  }

  updatePatient(id: number, patientData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Patient/Update/${id}`, patientData);
  }
}
