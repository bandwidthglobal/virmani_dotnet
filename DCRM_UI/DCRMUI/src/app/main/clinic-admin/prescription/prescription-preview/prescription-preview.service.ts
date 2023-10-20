import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../../auth/models';

@Injectable()
export class PrescriptionPreviewService implements Resolve<any> {
    apiData: any;
    onPrescriptionChanged: BehaviorSubject<any>;
    id;
    currentUser: any;
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) {
        this.currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
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
        this.id = Number(route.paramMap.get('id'));
        return new Promise<void>((resolve, reject) => {
            Promise.all([this.getPrescription()]).then(() => {
                resolve();
            }, reject);
        });
    }
    getPrescription(): Promise<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/Prescription/Get/` + this.id;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.apiData = response;
                this.onPrescriptionChanged.next(this.apiData);
                resolve(this.apiData);
            }, reject);
        });
    }
}
