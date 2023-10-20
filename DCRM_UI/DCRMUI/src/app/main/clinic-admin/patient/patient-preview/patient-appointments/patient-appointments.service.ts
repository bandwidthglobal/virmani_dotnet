import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../../../auth/models';

@Injectable()
export class PatientinAppointmentsService implements Resolve<any> {
    rows: any;
    onPatientListChanged: BehaviorSubject<any>;
    public currentUserSubject: Observable<User>;
    currentUser: any;
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) {
        this.currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));

        this.onPatientListChanged = new BehaviorSubject({});
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        let currentId = Number(route.paramMap.get('id'));
        alert(currentId);
        return new Promise<void>((resolve, reject) => {
            Promise.all([this.getDataTableRows(currentId)]).then(() => {
                resolve();
            }, reject);
        });
    }
    /**
     * Get rows
     */
    getDataTableRows(id: number): Promise<any[]> {
        // debugger;
        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        return new Promise((resolve, reject) => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.jwtToken}`
            });
            const requestOptions = { headers: headers };
            const url = `${environment.apiUrl}/Appointment/Get/Patient/${id}`;
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.rows = response;
                // debugger;
                this.onPatientListChanged.next(this.rows);
                resolve(this.rows);
            }, reject);
        });
    }

}
