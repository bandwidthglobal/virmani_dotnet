import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../../auth/models';

@Injectable()
export class PatientPreviewService implements Resolve<any> {
    patientData: any;
    apiData: any;
    treatmentData: any;
    workdoneData: any;
    onPatientChanged: BehaviorSubject<any>;
    medicinBrands: any;
    medicinCategories: any;
    onTreatmentChanged: BehaviorSubject<any>;
    onWorkedDoneChanged: BehaviorSubject<any>;
    onAppointmentChanged: BehaviorSubject<any>;
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
        this.onPatientChanged = new BehaviorSubject({});
        this.onTreatmentChanged = new BehaviorSubject({});
        this.onWorkedDoneChanged = new BehaviorSubject({});
        this.onAppointmentChanged = new BehaviorSubject({});

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
            Promise.all([this.getPatientData(currentId), this.getLabList(currentId),
                this.getPaymentList(currentId), this.getAppointmentList(currentId)
                , this.getWorkDoneHistoryList(currentId), this.getTreatmentPalnList(currentId)
                , this.getPriscriptionsList(currentId)
            ]).then(() => {
                resolve();
            }, reject);
        });
    }

    getPatientData(id: number): Promise<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/Patient/Get/${id}`;
        this.id = id;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.patientData = response;
                this.onPatientChanged.next(this.patientData);
                resolve(this.patientData);
            }, reject);
        });
    }


    getAppointmentList(id: number): Promise<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/Appointment/GetAppointments/${id}`;
        this.id = id;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.apiData = response;
                this.onAppointmentChanged.next(this.apiData);
                resolve(this.apiData);
            }, reject);
        });
    }

    getLabList(id: number): Promise<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/Appointment/GetAppointments/${id}`;
        this.id = id;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.apiData = response;
                this.onAppointmentChanged.next(this.apiData);
                resolve(this.apiData);
            }, reject);
        });
    }

    getPaymentList(id: number): Promise<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/Appointment/GetAppointments/${id}`;
        this.id = id;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.apiData = response;
                this.onAppointmentChanged.next(this.apiData);
                resolve(this.apiData);
            }, reject);
        });
    }

    getWorkDoneHistoryList(id: number): Promise<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/WorkDone/GetWorkDonesByPatient/${id}`;
        this.id = id;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.workdoneData = response;
                this.onWorkedDoneChanged.next(this.workdoneData);
                resolve(this.workdoneData);
            }, reject);
        });
    }

    getTreatmentPalnList(id: number): Promise<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/Patient/PatientTreatmentplans/${id}`;
        this.id = id;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.treatmentData = response;
                this.onTreatmentChanged.next(this.treatmentData);
                resolve(this.treatmentData);
            }, reject);
        });
    }

    getPriscriptionsList(id: number): Promise<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/Appointment/GetAppointments/${id}`;
        this.id = id;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.apiData = response;
                this.onAppointmentChanged.next(this.apiData);
                resolve(this.apiData);
            }, reject);
        });
    }
}
