import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { environment } from 'environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../../../auth/models';

@Injectable()
export class AppointmentChairService implements Resolve<any> {
    apiData: any;
    onAppointmentViewChanged: BehaviorSubject<any>;
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
        this.onAppointmentViewChanged = new BehaviorSubject({});
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
            Promise.all([this.getAppointmentChairView()]).then(() => {
                resolve();
            }, reject);
        });
    }
    getAppointmentChairView(): Promise<any[]> {
      let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
      return new Promise((resolve, reject) => {
          const headers = new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${currentUser.jwtToken}`
          });
          const requestOptions = { headers: headers };
          this._httpClient.get(`${environment.apiUrl}/Chair/GetAll`,requestOptions).subscribe((response: any) => {
              /* this.rows = response;
              debugger; */
              this.onAppointmentViewChanged.next(response);
              //resolve(this.rows);
              resolve(response);
          }, reject);
      });
    }
    
}
