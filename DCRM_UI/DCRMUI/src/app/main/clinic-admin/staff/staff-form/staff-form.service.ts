import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "app/auth/models";
import { environment } from "environments/environment";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

// @Injectable()
@Injectable({ providedIn: 'root' })

export class StaffFormService {

  currentUser: any;

  constructor(
    private _httpClient: HttpClient
  ) {
    this.currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
  }

  save(payload: any, mode: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.currentUser.jwtToken}`
    });
    const requestOptions = { headers: headers };
    const action: any = mode === 'add' ? 'Create' : 'Update';
    return this._httpClient.post(`${environment.apiUrl}/Staff/${action}`, payload, requestOptions);
  }

}