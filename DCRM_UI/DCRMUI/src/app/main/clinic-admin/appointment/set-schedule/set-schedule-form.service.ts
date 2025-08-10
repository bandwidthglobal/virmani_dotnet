import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../../auth/models';

@Injectable()
export class  SetSscheduleFormService implements Resolve<any> {
    apiData: any;
    onDrugChanged: BehaviorSubject<any>;
    medicinBrands: any;
    medicinCategories: any;
    onMedicinBrandChanged: BehaviorSubject<any>;
    onMedicinCategoriesChanged: BehaviorSubject<any>;
    id: any;
    currentUser: any;
   

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) {
        // Set the defaults
        this.currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        this.onDrugChanged = new BehaviorSubject({});
        this.onMedicinBrandChanged = new BehaviorSubject({});
        this.onMedicinCategoriesChanged = new BehaviorSubject({});

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
    getSchedule() {
        
        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        debugger;
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get(`${environment.apiUrl}/Appointment/GetTimes`, requestOptions)
    }
   
    getBrandlist(): Promise<any[]> {
        const url = `${environment.apiUrl}/Drug/GetMedicineBrands`;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url).subscribe((response: any) => {
                this.medicinBrands = response;
                this.onMedicinBrandChanged.next(this.medicinBrands);
                resolve(this.medicinBrands);
            }, reject);
        });
    }
    saveForm(drug: any) {
           const url = `${environment.apiUrl}/Appointment/SetSchedule`;
       
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.post<any>(url, drug, requestOptions);
    }
   
}
