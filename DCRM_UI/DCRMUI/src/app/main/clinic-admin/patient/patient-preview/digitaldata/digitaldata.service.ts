import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from '../../../../../auth/models';

@Injectable({ providedIn: 'root' })

export class DigitalDataService {
    currentUser: any;
    rows: any;
    onDigitalGetChanged: BehaviorSubject<any>;
    constructor(
        private _httpClient: HttpClient
    ) {
        this.currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        this.onDigitalGetChanged = new BehaviorSubject({});
    }


    save(payload: any, mode: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.post(`${environment.apiUrl}/DigitalData/Create`, payload, requestOptions);
    }
    delete(id: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.delete<any>(`${environment.apiUrl}/DigitalData/Delete/` + id, requestOptions);
    }
    getData(id): Observable<any> {
        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get(`${environment.apiUrl}/DigitalData/Get/` + id, requestOptions);
    }
    getApiListData(patientId): Observable<any> {
        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get(`${environment.apiUrl}/DigitalData/Get/Patient/` + patientId, requestOptions);
    }
}