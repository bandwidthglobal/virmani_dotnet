import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { User, Role, AuthenticateRequest } from 'app/main/clinic-admin/models';
import { ToastrService } from 'ngx-toastr';
import { request } from 'https';

@Injectable({ providedIn: 'root' })
export class ForgotPasswordService {

  /**
   *
   * @param {HttpClient} _http
   * @param {ToastrService} _toastrService
   */
  constructor(private _http: HttpClient, private _toastrService: ToastrService) {
    //this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    //this.currentUser = this.currentUserSubject.asObservable();
    }

    sendOtp(email: string,type:string) {
        var userotp = { email: email, createdDate: new Date(), type: type };
        return this._http
            .post<any>(`${environment.apiUrl}/ForgotPassword/SendOtp/`, userotp)
            .pipe(
                map(res => {
                    return email;
                })
            );
    }

    submitOtp(email: any, otp: any, type: string) {
        var userOtp = { email: email, otp: otp, createdDate: new Date(), type: type };
        debugger;
        return this._http
            .post<any>(`${environment.apiUrl}/ForgotPassword/ValidateOtp`, userOtp)
            .pipe(
                map(res => {
                    debugger;
                    return res;
                })
            );
    }

    resetPassword(forgotPassword: any) {
        //var userotp = { email: email, otp: otp, createdDate: "" };
        debugger;
        return this._http
            .post<any>(`${environment.apiUrl}/ForgotPassword/ResetPassword`, forgotPassword)
            .pipe(
                map(res => {
                    return res;
                })
            );
    }
}
