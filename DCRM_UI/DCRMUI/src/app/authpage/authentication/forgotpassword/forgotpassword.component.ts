import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { catchError, first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { CoreConfigService } from '@core/services/config.service';
import { ForgotPasswordService } from 'app/authpage/authentication/forgotpassword/forgotpassword.service';
import { debug } from 'console';
import { Router } from '@angular/router';

@Component({
    selector: 'app-forgotpassword',
    templateUrl: './forgotpassword.component.html',
    styleUrls: ['./forgotpassword.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent implements OnInit {
    // Public
    public emailVar;
    public coreConfig: any;
    public forgotPasswordForm: UntypedFormGroup;
    public forgotOtpForm: UntypedFormGroup;
    public resetPasswordForm: UntypedFormGroup;
    public submitted = false;
    public submitted1 = false;
    public submitted2 = false;
    public isReadOnly = "";
    public isOtp = false;
    public loading = false;
    public success: any = '';
    public email: any = '';
    public apiData: any;
    entityId: any;
    error: any = '';
    type = "user";
    // Private
    private _unsubscribeAll: Subject<any>;
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();
    isReset: boolean = false;
    /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     * @param {FormBuilder} _formBuilder
     *
     */
    constructor(private _coreConfigService: CoreConfigService
        , private _formBuilder: UntypedFormBuilder, private _forgotPasswordService: ForgotPasswordService, private _router: Router) {
        this._unsubscribeAll = new Subject();

        // Configure the layout
        this._coreConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                menu: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                customizer: false,
                enableLocalStorage: false
            }
        };
    }
    onTypeChange(vale) {
        this.type = vale;
    }
    ngOnInit(): void {
        this.forgotPasswordForm = this._formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });
        this.forgotOtpForm = this._formBuilder.group({
            otp: ['', [Validators.required]]
        });
        this.resetPasswordForm = this._formBuilder.group({
            password: ['', [Validators.required]],
            confirmpassword: ['', [Validators.required]]
        }

        );
        this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
            this.coreConfig = config;
        });
    }
    ConfirmedValidator(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (
                matchingControl.errors &&
                !matchingControl.errors.confirmedValidator
            ) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmedValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }
    // convenience getter for easy access to form fields
    //const txtEmail = document.getElementById('txtEmail') as HTMLButtonElement | null;
    //const btn = document.getElementById('btnForgot') as HTMLButtonElement | null;
    get f() {
        return this.forgotPasswordForm.controls;
    }
    get fotp() {
        return this.forgotOtpForm.controls;
    }
    get fpassword() {
        return this.resetPasswordForm.controls;
    }

    sendOtp() {
        this.submitted = true;
        if (this.forgotPasswordForm.invalid) {
            return;
        }

        this.loading = true;
        this._forgotPasswordService.sendOtp(this.f.email.value,this.type)
            .pipe(first())
            .subscribe(
                data => {

                    this.email = this.f.email.value;
                    this.isOtp = true;
                    this.loading = false;
                    this.success = "otp has been sent on registerd email.";
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }
    onSubmitOtp() {
        this.submitted1 = true;
        this.success = "";
        if (this.forgotOtpForm.invalid) {
            return;
        }
        this.loading = true;
        this._forgotPasswordService.submitOtp(this.email, this.fotp.otp.value, this.type)
            .pipe(first())
            .subscribe(
                data => {
                    this.error = "";
                    this.apiData = data;
                    this.isOtp = false;
                    this.isReset = true;
                    this.loading = false;

                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }
    resetPassword() {
        this.submitted2 = true;
        if (this.resetPasswordForm.invalid) {
            return;
        }
        this.loading = true;
        let forgotPassword = { entityId: this.apiData.entityId, newPassword: this.fpassword.password.value, type: this.type }
        this._forgotPasswordService.resetPassword(forgotPassword)
            .pipe(first())
            .subscribe(
                data => {
                    this.success = "your password hase been successfully reset.";
                    this.loading = false;
                    setTimeout(() => {
                        this._router.navigate(['/admin/dashboard']);
                    }, 1000)

                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
