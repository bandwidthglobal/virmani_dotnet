import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from 'app/auth/models';

@Injectable({ providedIn: 'root' })

export class TreatmentPalnFormService {

    APIURL: string = `${environment.apiUrl}`;
    currentUser: any;

    constructor(
        private _httpClient: HttpClient
    ) {
        this.currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
    }

    save(payload: any, mode: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const action: any = mode === 'add' ? 'Create' : 'Update';
        return this._httpClient.post(`${this.APIURL}/Treatmentplan/${action}`, payload, requestOptions);
    }

    getIDoctors(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get(`${environment.apiUrl}/Doctor/Get/Names`, requestOptions);
    }
}