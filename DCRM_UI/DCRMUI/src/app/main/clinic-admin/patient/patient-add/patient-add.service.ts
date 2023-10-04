import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from '../../../../auth/models';

@Injectable()
export class PatientAddService implements Resolve<any> {
    apiData: any;
    onPatientEditChanged: BehaviorSubject<any>;
    insuranceLoanItems: any[]; // You may need to initialize this with appropriate data if it's related to patient details.
    onInsuranceLoanItemsChanged: BehaviorSubject<any[]>;

    currentUser: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient, private http: HttpClient) {
        // Set the defaults
        this.currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        this.onPatientEditChanged = new BehaviorSubject({});
        this.onInsuranceLoanItemsChanged = new BehaviorSubject([]);

        // Initialize insuranceLoanItems with initial data if needed.
        this.insuranceLoanItems = [];
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
        // You can add data fetching logic here if needed.
        return null;
    }

    // You can add methods to fetch patient data or perform patient-related operations here.

    // Example method to update patient data:
    update(patientData: any): Observable<any> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        
        // You may need to adjust the API endpoint and request type based on your backend.
        return this._httpClient.post<any>(`${environment.apiUrl}/Patient/Create`, patientData, requestOptions);
    }

    // Example method to add insurance or loan details for a patient:
    addInsuranceLoanItem(item: any): void {
        this.insuranceLoanItems.push(item);
        this.onInsuranceLoanItemsChanged.next(this.insuranceLoanItems);
    }

    // Example method to remove insurance or loan details for a patient:
    removeInsuranceLoanItem(index: number): void {
        this.insuranceLoanItems.splice(index, 1);
        this.onInsuranceLoanItemsChanged.next(this.insuranceLoanItems);
    }
}
