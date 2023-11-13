import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../../auth/models';

@Injectable()
export class AppointmentChairViewService implements Resolve<any> {
    rows: any;
    chairRows: any;
    onAppointmentChairChanged: BehaviorSubject<any>;
    public currentUserSubject: Observable<User>;
    id;
    currentUser: any;
    onDoctorChange: BehaviorSubject<any>;
    onChairChange: BehaviorSubject<any>;
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) {
        // Set the defaults
        this.currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));

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
            Promise.all([]).then(() => {
                resolve();
            }, reject);
        });
    }
    row: any;
    getDoctors() {
        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get(`${environment.apiUrl}/Doctor/Get/Names`, requestOptions);
    }
    getChairs() {
        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get(`${environment.apiUrl}/Chair/GetChairsForDropdown`, requestOptions);
    }

    getAppointmentChairViewlist() {

        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get(`${environment.apiUrl}/Appointment/ChairViews`, requestOptions)
    }

    getAppointmentChairViewSearchlist(params: any) {

        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.post(`${environment.apiUrl}/Appointment/ChairViewsSearch`, params, requestOptions)
    }
}
