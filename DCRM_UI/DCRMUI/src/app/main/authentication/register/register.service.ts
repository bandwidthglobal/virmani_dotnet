import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

import { ToastrService } from 'ngx-toastr';
import { request } from 'https';

@Injectable({ providedIn: 'root' })
export class RegisterService {
    /**
     *
     * @param {HttpClient} _http
     * @param {ToastrService} _toastrService
     */
    constructor(private _http: HttpClient, private _toastrService: ToastrService) {

    }
    /**
     * User register
     *Create
     * @param email
     * @param password
     * @returns user
     */
    register(user: any) {
        return this._http.post<any>(`${environment.apiUrl}/User/Create`, user);
    }
}
