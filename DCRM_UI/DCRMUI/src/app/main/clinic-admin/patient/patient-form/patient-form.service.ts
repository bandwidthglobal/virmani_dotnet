import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from '../../../../auth/models';

@Injectable({ providedIn: 'root' })

export class PatientFormService {
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
        return this._httpClient.post(`${environment.apiUrl}/Patient/${action}`, payload, requestOptions);
    }
}