import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../../auth/models';

@Injectable()
export class PatientEditService implements Resolve<any> {
    apiData: any;
    onPatientEditChanged: BehaviorSubject<any>;
    id;
    currentUser: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) {
        // Set the defaults
        this.currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        this.onPatientEditChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     * 
     */

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        let currentId = Number(route.paramMap.get('id'));
        return new Promise<void>((resolve, reject) => {
          /* this.getPatientList() */
            Promise.all([this.getApiData(currentId)]).then(() => {
                resolve();
            }, reject);
        });
    }

    getPatientList(): Promise<any[]> {
      const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.currentUser.jwtToken}`
      });
      const requestOptions = { headers: headers };
      const url = `${environment.apiUrl}/Patient/List`; // Adjust the URL as needed
      return new Promise((resolve, reject) => {
          this._httpClient.get(url, requestOptions).subscribe((response: any) => {
              // Handle the response as needed
              resolve(response);
          }, reject);
      });
  }
  
  
    getApiData(id: number): Promise<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/Patient/Get/${id}`;
        this.id = id;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {

                this.apiData = response;
                this.onPatientEditChanged.next(this.apiData);
                resolve(this.apiData);
            }, reject);
        });
    }
    update(patient: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        debugger;
        return this._httpClient.post<any>(`${environment.apiUrl}/Patient/Update`, patient, requestOptions);
    }


}


// export class PatientEditService {
//   private apiUrl = 'https://localhost:7069/api';

//   constructor(private http: HttpClient) {}

//   getPatient(id: number): Observable<any> {
//     return this.http.get(`${this.apiUrl}/Patient/Get/${id}`);
//   }

//   updatePatient(id: number, patientData: any): Observable<any> {
//     return this.http.put(`${this.apiUrl}/Patient/Update/${id}`, patientData);
//   }
// }
