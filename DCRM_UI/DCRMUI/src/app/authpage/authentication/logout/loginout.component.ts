import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { takeUntil, first } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AuthenticationService } from 'app/auth/service';
import { CoreConfigService } from '@core/services/config.service';

@Component({
    selector: 'app-logout',
    templateUrl: './loginout.component.html',
    encapsulation: ViewEncapsulation.None
})
export class LoginOutComponent implements OnInit {
    //  Public
    public coreConfig: any;
    public loginForm: UntypedFormGroup;
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public error = '';
    public passwordTextType: boolean;
    public type = 'user';

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     */
    constructor(
        private _router: Router, private _authenticationService: AuthenticationService
    ) {
        this._authenticationService.logout();
        this._router.navigate(['/auth/login']);
    }
    ngOnInit(): void {

    }
}
