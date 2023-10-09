import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { User } from 'app/auth/models';
import { environment } from 'environments/environment';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DealerEditService implements Resolve<any> {

  id: any;
  apiData: any;
  currentUser: any;
  onDealerEditChanged: BehaviorSubject<any>;

  constructor(private _httpClient: HttpClient) {
    // Set the defaults
    this.currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
    this.onDealerEditChanged = new BehaviorSubject({});
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    let currentId = Number(route.paramMap.get('id'));
    return new Promise<void>((resolve, reject) => {
      Promise.all([this.getApiData(currentId)]).then(() => {
        resolve();
      }, reject);
    });
  }

  /**
   * Get API Data
   */
  getApiData(id: number): Promise<any[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.currentUser.jwtToken}`
    });
    const requestOptions = { headers: headers };
    const url = `${environment.apiUrl}/Dealer/Get/${id}`;
    this.id = id;
    return new Promise((resolve, reject) => {
      this._httpClient.get(url, requestOptions).subscribe((response: any) => {
        this.apiData = response;
        this.onDealerEditChanged.next(this.apiData);
        resolve(this.apiData);
      }, reject);
    });
  }
}
