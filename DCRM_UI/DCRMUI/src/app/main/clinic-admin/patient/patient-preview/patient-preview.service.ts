import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../../auth/models';

@Injectable()
export class PatientPreviewService implements Resolve<any> {
    patientData: any;
    DiagnosisData: any;
    apiData: any;
    treatmentData: any;
    workdoneData: any;
    paymentsData: any;
    labData: any;
    digitalData: any;
    prescriptionData: any;
    onPatientChanged: BehaviorSubject<any>;
    onDiagnosisData: BehaviorSubject<any>;
    onTreatmentChanged: BehaviorSubject<any>;
    onWorkedDoneChanged: BehaviorSubject<any>;
    onAppointmentChanged: BehaviorSubject<any>;
    onPaymentChanged: BehaviorSubject<any>;
    onLabChanged: BehaviorSubject<any>;
    onScansChanged: BehaviorSubject<any>;
    onPrescriptionChanged: BehaviorSubject<any>;
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
        this.onDiagnosisData = new BehaviorSubject({});
        this.onTreatmentChanged = new BehaviorSubject({});
        this.onWorkedDoneChanged = new BehaviorSubject({});
        this.onAppointmentChanged = new BehaviorSubject({});
        this.onPaymentChanged = new BehaviorSubject({});
        this.onLabChanged = new BehaviorSubject({});
        this.onScansChanged = new BehaviorSubject({});
        this.onPrescriptionChanged = new BehaviorSubject({});

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
            Promise.all([this.getPatientData(currentId)
                , this.getLabList(currentId)
                , this.getPaymentList(currentId)
                , this.getAppointmentList(currentId)
                , this.getWorkDoneHistoryList(currentId)
                , this.getTreatmentPalnList(currentId)
                , this.getPaymentList(currentId)
                , this.getDigitalDataList(currentId)
                , this.getPriscriptionsList(currentId)
                , this.getIDiagnosisData()
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
        const url = `${environment.apiUrl}/Patient/Get/Appointments/${id}`;
        this.id = id;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.apiData = response;
                this.onAppointmentChanged.next(this.apiData);
                resolve(this.apiData);
            }, reject);
        });
    }
    getTreatmentPalnList(id: number): Promise<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/Patient/Get/Treatmentplans/${id}`;
        this.id = id;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.treatmentData = response;
                this.onTreatmentChanged.next(this.treatmentData);
                resolve(this.treatmentData);
            }, reject);
        });
    }
    getWorkDoneHistoryList(id: number): Promise<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/Patient/Get/WorkDones/${id}`;
        this.id = id;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.workdoneData = response;
                this.onWorkedDoneChanged.next(this.workdoneData);
                resolve(this.workdoneData);
            }, reject);
        });
    }
    getPaymentList(id: number): Promise<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/Patient/Get/Payments/${id}`;
        this.id = id;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.paymentsData = response;
                this.onPaymentChanged.next(this.paymentsData);
                resolve(this.paymentsData);
            }, reject);
        });
    }
    getLabList(id: number): Promise<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/Lab/Get/Patient/${id}`;
        this.id = id;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.labData = response;
                this.onLabChanged.next(this.labData);
                resolve(this.labData);
            }, reject);
        });
    }
    getDigitalDataList(id: number): Promise<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/DigitalData/Get/Patient/${id}`;
        this.id = id;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.digitalData = response;
                this.onScansChanged.next(this.digitalData);
                resolve(this.digitalData);
            }, reject);
        });
    }
    getPriscriptionsList(id: number): Promise<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/Patient/Get/Prescriptions/${id}`;
        this.id = id;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.prescriptionData = response;
                debugger;
                this.onPrescriptionChanged.next(this.prescriptionData);
                resolve(this.prescriptionData);
            }, reject);
        });
    }

   
    getPayments(id: any): Observable<any> {
        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get(`${environment.apiUrl}/Patient/Get/Payments/` + id, requestOptions);
    }

    savePayment(payload: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.post(`${environment.apiUrl}/Payment/Create/Received`, payload, requestOptions);
    }
    getPaymentReceives(id: any): Observable<any> {
        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get(`${environment.apiUrl}/Payment/Get/Received/` + id, requestOptions);
    }
    getDigitalList(id: number) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/DigitalData/Get/Patient/${id}`;
        this.id = id;
        return this._httpClient.get(url, requestOptions)
    }

    getIDiagnosisData(): Promise<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/Treatmentplan/Get/DiagnosisData`;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.DiagnosisData = response;
                this.onDiagnosisData.next(this.DiagnosisData);
                resolve(this.DiagnosisData);
            }, reject);
        });
    }
    deleteWorkDone(id: any) {
        debugger;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.delete<any>(`${environment.apiUrl}/WorkDone/Delete/` + id, requestOptions);
    }

    deletePayment(id: any) {
        debugger;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.delete<any>(`${environment.apiUrl}/Payment/Delete/` + id, requestOptions);
    }

    deletePriscription(id: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.delete<any>(`${environment.apiUrl}/Prescription/Delete/` + id, requestOptions);
    }
}
