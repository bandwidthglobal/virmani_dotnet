import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { takeUntil, first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RegisterService } from 'app/auth/service/register.service';
import { CoreConfigService } from '@core/services/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Register } from 'app/auth/models/register';
import { Role } from '../../../auth/models';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
    // Public
    public coreConfig: any;
    public passwordTextType: boolean;
    public registerForm: UntypedFormGroup;
    public submitted = false;
    public loading = false;
    public returnUrl: string;
    public error = '';
    public register: Register = { id: 0, name: "", email: "", password: "", IsTermsandConditions: true, role: Role.User }
        ;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(private _coreConfigService: CoreConfigService,
        private _formBuilder: UntypedFormBuilder,
        private _registerService: RegisterService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
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

    // convenience getter for easy access to form fields
    get f() {
        return this.registerForm.controls;
    }

    /**
     * Toggle password
     */
    togglePasswordTextType() {
        this.passwordTextType = !this.passwordTextType;
    }

    /**
     * On Submit
     */
    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this._registerService
            .register(this.register)
            .pipe()
            .subscribe(
                data => {
                    // debugger;
                    this._router.navigate(['/']);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }

    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.registerForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

        // Subscribe to config changes
        this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
            this.coreConfig = config;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
