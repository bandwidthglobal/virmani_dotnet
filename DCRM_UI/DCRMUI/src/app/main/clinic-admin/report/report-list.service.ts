import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../auth/models';



@Injectable()
export class ReportService implements Resolve<any> {

    rows: any;
    onReportChanged: BehaviorSubject<any>;
    public currentUserSubject: Observable<User>;
    currentUser: any;
    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) {
        this.currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        this.onReportChanged = new BehaviorSubject({});
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        debugger;
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise<void>((resolve, reject) => {
            Promise.all([this.getDataTableRows()]).then(() => {
                resolve();
            }, reject);
        });
    }
    /**
     * Get rows
     */
    getDataTableRows(): Promise<any[]> {
        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        return new Promise((resolve, reject) => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.jwtToken}`
            });
            const requestOptions = { headers: headers };
            this._httpClient.get(`${environment.apiUrl}/Payment/Get/PaymentReports`, requestOptions).subscribe((response: any) => {
                this.rows = response;
                debugger;
                this.onReportChanged.next(this.rows);
                resolve(this.rows);
            }, reject);
        });
    }
    delete(id: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.delete<any>(`${environment.apiUrl}/Staff/Delete/` + id, requestOptions);
    }

    getWorkDone(id: any) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get<any>(`${environment.apiUrl}/Payment/Get/PaymentReport/` + id, requestOptions);
    }
    getPatients() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        return this._httpClient.get<any>(`${environment.apiUrl}/Patient/Get/Names`, requestOptions);
    }
    getDoctors() {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.currentUser.jwtToken}`
        }); 
        const requestOptions = { headers: headers };
        return this._httpClient.get<any>(`${environment.apiUrl}/Doctor/Get/Names/`, requestOptions);
    }
}
//  public rows: any;
//  public onUserListChanged: BehaviorSubject<any>;

//  /**
//   * Constructor
//   *
//   * @param {HttpClient} _httpClient
//   */
//  constructor(private _httpClient: HttpClient) {
//    // Set the defaults
//    this.onUserListChanged = new BehaviorSubject({});
//  }

//  /**
//   * Resolver
//   *
//   * @param {ActivatedRouteSnapshot} route
//   * @param {RouterStateSnapshot} state
//   * @returns {Observable<any> | Promise<any> | any}
//   */
//  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
//    return new Promise<void>((resolve, reject) => {
//      Promise.all([this.getDataTableRows()]).then(() => {
//        resolve();
//      }, reject);
//    });
//  }

//  /**
//   * Get rows Get/PaymentReports
//   */
//  getDataTableRows(): Promise<any[]> {
//    return new Promise((resolve, reject) => {
//      this._httpClient.get('api/users-data').subscribe((response: any) => {
//        this.rows = response;
//        this.onUserListChanged.next(this.rows);
//        resolve(this.rows);
//      }, reject);
//    });
//  }
//}
