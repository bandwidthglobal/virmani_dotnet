import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from '../../../../auth/models';

@Injectable({ providedIn: 'root' })

export class AppointmentFormService {
    currentUser: any;

    constructor(
        private _httpClient: HttpClient
    ) {
        this.currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
    }

    getIStartTimes(): Array<any> {
        return [
            { id: "09:00:00", text: "09:00 AM" },
            { id: "09:15:00", text: "09:15 AM" },
            { id: "09:30:00", text: "09:30 AM" },
            { id: "09:45:00", text: "09:45 AM" },
            { id: "10:00:00", text: "10:00 AM" },
            { id: "10:15:00", text: "10:15 AM" },
            { id: "10:30:00", text: "10:30 AM" },
            { id: "10:45:00", text: "10:45 AM" },
            { id: "11:00:00", text: "11:00 AM" },
            { id: "11:15:00", text: "11:15 AM" },
            { id: "11:30:00", text: "11:30 AM" },
            { id: "11:45:00", text: "11:45 AM" },
            { id: "12:00:00", text: "12:00 PM" },
            { id: "12:15:00", text: "12:15 PM" },
            { id: "12:30:00", text: "12:30 PM" },
            { id: "12:45:00", text: "12:45 PM" },
            { id: "01:00:00", text: "01:00 PM" },
            { id: "01:15:00", text: "01:15 PM" },
            { id: "01:30:00", text: "01:30 PM" },
            { id: "01:45:00", text: "01:45 PM" },
            { id: "02:00:00", text: "02:00 PM" },
            { id: "02:15:00", text: "02:15 PM" },
            { id: "02:30:00", text: "02:30 PM" },
            { id: "02:45:00", text: "02:45 PM" },
            { id: "03:00:00", text: "03:00 PM" },
            { id: "03:15:00", text: "03:15 PM" },
            { id: "03:30:00", text: "03:30 PM" },
            { id: "03:45:00", text: "03:45 PM" },
            { id: "04:00:00", text: "04:00 PM" },
            { id: "04:15:00", text: "04:15 PM" },
            { id: "04:30:00", text: "04:30 PM" },
            { id: "04:45:00", text: "04:45 PM" },
            { id: "05:00:00", text: "05:00 PM" },
            { id: "05:15:00", text: "05:15 PM" },
            { id: "05:30:00", text: "05:30 PM" },
            { id: "05:45:00", text: "05:45 PM" },
        ];
    }

    getISlotTimes(): Array<any> {
        return [
            { id: "15", text: "15 Mints" },
            { id: "30", text: "30 Mints" },
            { id: "45", text: "45 Mints" },
            { id: "60", text: "60 Mints" },
        ];
    }

    save(payload: any, mode: string): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const action: any = mode === 'add' ? 'Create' : 'Update';
        return this._httpClient.post(`${environment.apiUrl}/Appointment/${action}`, payload, requestOptions);
    }

    getIDoctors(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get(`${environment.apiUrl}/Doctor/Get/Names`, requestOptions);
    }

    getIPatients(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get(`${environment.apiUrl}/Patient/Get/Names`, requestOptions);
    }

    getIChairList(): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get(`${environment.apiUrl}/Chair/GetAll`, requestOptions);
    }
}