import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../../../auth/models';

@Injectable()
export class workdonehistoryService implements Resolve<any> {
    apiData: any;
    onDrugEditChanged: BehaviorSubject<any>;
    medicinBrands: any;
    medicinCategories: any;
    onMedicinBrandChanged: BehaviorSubject<any>;
    onMedicinCategoriesChanged: BehaviorSubject<any>;
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
        this.onDrugEditChanged = new BehaviorSubject({});
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
            Promise.all([this.getDrugData(currentId), this.getBrandlist(), this.getCategoryList()]).then(() => {
                resolve();
            }, reject);
        });
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
    getCategoryList(): Promise<any[]> {
        const url = `${environment.apiUrl}/Drug/GetMedicineCategoris`;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url).subscribe((response: any) => {
                this.medicinCategories = response;
                this.onMedicinCategoriesChanged.next(this.medicinCategories);
                resolve(this.medicinCategories);
            }, reject);
        });
    }
    getDrugData(id: number): Promise<any[]> {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/Drug/Get/${id}`;
        this.id = id;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.apiData = response;
                this.onDrugEditChanged.next(this.apiData);
                resolve(this.apiData);
            }, reject);
        });
    }
    delete(id: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.delete<any>(`${environment.apiUrl}/WorkDone/Delete/` + id, requestOptions);
    }
}
