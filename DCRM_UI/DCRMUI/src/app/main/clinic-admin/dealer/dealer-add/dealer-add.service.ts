import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from 'app/auth/models';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DealerAddService implements Resolve<any> {

  apiData: any;
  onInvoicAddChanged: BehaviorSubject<any>;
  currentUser: any;

  constructor(private _httpClient: HttpClient) {
    this.currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
    this.onInvoicAddChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getApiData()]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get API Data
   */
  getApiData(): Promise<any[]> {
    const url = `api/invoice-data`;
    return new Promise((resolve, reject) => {
      this._httpClient.get(url).subscribe((response: any) => {
        this.apiData = response;
        this.onInvoicAddChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }

  update(payload: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.currentUser.jwtToken}`
    });
    const requestOptions = { headers: headers };
    return this._httpClient.post<any>(`${environment.apiUrl}/Dealer/Create`, payload, requestOptions);
  }
}
