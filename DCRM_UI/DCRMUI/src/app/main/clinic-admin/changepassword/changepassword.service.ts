import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../auth/models';

@Injectable()
export class ChangepasswordService implements Resolve<any> {
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
        return new Promise<void>((resolve, reject) => {
            Promise.all([]).then(() => {
                resolve();
            }, reject);
        });
    }
    changepassword(changepassword: any) {
        changepassword.id = this.currentUser.id;
        changepassword.type = this.currentUser.role;


        try {
            return this._httpClient.post<any>(`${environment.apiUrl}/ForgotPassword/ChangePassword`, changepassword);
        } catch (err) {
            var abc = err;
            debugger;
        }
        
    }
}
