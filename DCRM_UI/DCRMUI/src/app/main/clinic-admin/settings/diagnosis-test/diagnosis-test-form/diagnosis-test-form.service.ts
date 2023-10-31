import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from '../../../../../auth/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable()
export class DiagnosisTestFormService implements Resolve<any> {
  public apiData: any;
  public onChairFormChanged: BehaviorSubject<any>;
    rows: any;
  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(private _httpClient: HttpClient) {
    // Set the defaults
      this.onChairFormChanged = new BehaviorSubject({});
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
        Promise.all([]).then(() => {
        resolve();
      }, reject);
    });
  }

    get(id: any) {
        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.jwtToken}`
            });
            const requestOptions = { headers: headers };
        return this._httpClient.get(`${environment.apiUrl}/Settings/Get/Diagonosis/` + id, requestOptions)
    }
   
    save(id: any, data: any) {
        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.jwtToken}`
        });
        let url = `${environment.apiUrl}/Settings/Create/Diagonosis`;
        if (id > 0) {
            url = `${environment.apiUrl}/Settings/Update/Diagonosis`;
        }
        const requestOptions = { headers: headers };
        return this._httpClient.post(url, data, requestOptions)
    }
   
}
