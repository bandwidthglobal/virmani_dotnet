import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../../auth/models';

@Injectable()
export class PrescriptionAddService implements Resolve<any> {
    apiData: any;
    onDrugChanged: BehaviorSubject<any>;
    onPatientChanged: BehaviorSubject<any>;
    id;
    currentUser: any;
    drugList: any;
    patientList: any;
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) {
        // Set the defaults
        this.currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        this.onDrugChanged = new BehaviorSubject({});
        this.onPatientChanged = new BehaviorSubject({});
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
        return new Promise<void>((resolve, reject) => {
            Promise.all([]).then(() => {
                resolve();
            }, reject);
        });
    }
    getDrug() {
        const url = `${environment.apiUrl}/Drug/GetMedicineBrands`;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url).subscribe((response: any) => {
                this.drugList = response;
                this.onDrugChanged.next(this.drugList);
                resolve(this.drugList);
            }, reject);
        });
    }
    getUserChamber(): Observable<any> {
        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get(`${environment.apiUrl}/User/GetUserChamber/` + currentUser.id, requestOptions);
    }

    getPatients(): Observable<any> {
        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get(`${environment.apiUrl}/Patient/Get/Names`, requestOptions);
    }
    getDrugs(): Observable<any> {
        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get(`${environment.apiUrl}/Drug/GateAll`, requestOptions);
    }
    getDrugCategories(): Observable<any> {
        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get(`${environment.apiUrl}/Drug/GetMedicineCategoris`, requestOptions);
    }
    save(payload: any): Observable<any> {
        debugger;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.post(`${environment.apiUrl}/Prescription/Create`, payload, requestOptions);
    }
    savePatient(payload: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.post(`${environment.apiUrl}/Patient/Create`, payload, requestOptions);
    }
    saveDrug(payload: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.post(`${environment.apiUrl}/Drug/Create`, payload, requestOptions);
    }
}
