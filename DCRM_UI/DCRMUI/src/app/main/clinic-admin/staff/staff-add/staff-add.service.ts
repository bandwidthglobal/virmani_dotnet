import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../../auth/models';

@Injectable()
export class StaffAddService implements Resolve<any> {
    apiData: any;
    onStaffEditChanged: BehaviorSubject<any>;
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
        this.onStaffEditChanged = new BehaviorSubject({});
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
            Promise.all([this.getStaff()]).then(() => {
                resolve();
            }, reject);
        });
    }
    getStaff() {

    }
    //getBrandlist(): Promise<any[]> {
    //    const url = `${environment.apiUrl}/Drug/GetMedicineBrands`;
    //    return new Promise((resolve, reject) => {
    //        this._httpClient.get(url).subscribe((response: any) => {
    //            this.medicinBrands = response;
    //            this.onMedicinBrandChanged.next(this.medicinBrands);
    //            resolve(this.medicinBrands);
    //        }, reject);
    //    });
    //}
    //getCategoryList(): Promise<any[]> {
    //    const url = `${environment.apiUrl}/Drug/GetMedicineCategoris`;
    //    return new Promise((resolve, reject) => {
    //        this._httpClient.get(url).subscribe((response: any) => {
    //            this.medicinCategories = response;
    //            this.onMedicinCategoriesChanged.next(this.medicinCategories);
    //            resolve(this.medicinCategories);
    //        }, reject);
    //    });
    //}
    update(drug: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        // debugger;
        return this._httpClient.post<any>(`${environment.apiUrl}/Drug/Create`, drug, requestOptions);
    }


}
