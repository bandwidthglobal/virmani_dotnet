import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'environments/environment';
import { User, Role, AuthenticateRequest } from 'app/auth/models';
import { ToastrService } from 'ngx-toastr';
import { request } from 'https';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    //public

    public currentUser: Observable<User>;

    //private
    private currentUserSubject: BehaviorSubject<User>;

    /**
     *
     * @param {HttpClient} _http
     * @param {ToastrService} _toastrService
     */
    constructor(private _http: HttpClient, private _toastrService: ToastrService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    // getter: currentUserValue
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    /**
     *  Confirms if user is admin
     */
    get isAdmin() {
        return this.currentUser && this.currentUserSubject.value.role === Role.Admin;
    }
    /**
     *  Confirms if user is user
     */
    get isUser() {
        return this.currentUser && this.currentUserSubject.value.role === Role.User;
    }
    /**
     *  Confirms if user is staff
     */
    get isStaff() {
        return this.currentUser && this.currentUserSubject.value.role === Role.Staff;
    }
    /**
      *  Confirms if user is patient
      */
    get isPatient() {
        return this.currentUser && this.currentUserSubject.value.role === Role.Patient;
    }
    /**
      *  Confirms if user is doctor
      */
    get isDoctor() {
        return this.currentUser && this.currentUserSubject.value.role === Role.Doctor;
    }
    /**
     * User login
     *
     * @param email
     * @param password
     * @returns user
     */
    login(email: string, password: string, type: string) {
        var authenticateRequest = { email: email, password: password };
        return this._http
            .post<any>(`${environment.apiUrl}/Authenticate/` + type, authenticateRequest)
            .pipe(
                map(user => {
                    // login successful if there's a jwt token in the response
                    debugger;
                    if (user != null && user.jwtToken != '') {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                        localStorage.setItem('token', user.jwtToken);
                        // Display welcome toast!
                        setTimeout(() => {
                            this._toastrService.success(
                                'You have successfully logged in as an ' +
                                user.role +
                                ' to Virmani. Now you can start to explore. Enjoy! 🎉',
                                '👋 Welcome, ' + user.name + '!',
                                { toastClass: 'toast ngx-toastr', closeButton: true }
                            );
                        }, 2500);
                        // notify
                        this.currentUserSubject.next(user);
                    }

                    return user;
                })
            );
    }


    /**
     * User logout
     *
     */
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        // notify
        this.currentUserSubject.next(null);
    }
}
