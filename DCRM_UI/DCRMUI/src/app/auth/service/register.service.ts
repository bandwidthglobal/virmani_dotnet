import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';

import { ToastrService } from 'ngx-toastr';
import { request } from 'https';

@Injectable({ providedIn: 'root' })
export class RegisterService {
    //public

    //public currentUser: Observable<Register>;

    //private
   // private currentUserSubject: BehaviorSubject<Register>;

    /**
     *
     * @param {HttpClient} _http
     * @param {ToastrService} _toastrService
     */
    //constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    //    this.currentUserSubject = new BehaviorSubject<Register>(JSON.parse(localStorage.getItem('currentUser')));
    //    this.currentUser = this.currentUserSubject.asObservable();
    //}
    constructor(private _http: HttpClient, private _toastrService: ToastrService)
    {
        
    }
    // getter: currentUserValue
    //public get currentUserValue(): Register {
    //    return this.currentUserSubject.value;
    //}

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
