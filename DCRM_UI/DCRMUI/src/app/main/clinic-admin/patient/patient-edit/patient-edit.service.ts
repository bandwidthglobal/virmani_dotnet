// patient.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from 'app/auth/models';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable()

export class PatientEditService implements Resolve<any> {
  
  apiUrl =  `${environment.apiUrl}`;
  id: any;
  apiData: any;
  currentUser: any;
  onEditChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    this.currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
    this.onEditChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    let currentId = Number(route.paramMap.get('id'));
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getApiData(currentId)]).then(() => {
        resolve();
      }, reject);
    });
  }

  getApiData(id: number): Promise<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.currentUser.jwtToken}`
    });
    const requestOptions = { headers: headers };
    const url = `${this.apiUrl}/Patient/Get/${id}`;
    this.id = id;
    return new Promise((resolve, reject) => {
      this._httpClient.get(url, requestOptions).subscribe((response: any) => {
        this.apiData = response;
        this.onEditChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }

  getPatient(id: number): Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/Patient/Get/${id}`);
  }

  updatePatient(id: number, patientData: any): Observable<any> {
    return this._httpClient.put(`${this.apiUrl}/Patient/Update/${id}`, patientData);
  }

}
