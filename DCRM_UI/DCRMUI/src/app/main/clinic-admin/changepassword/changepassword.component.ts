import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { ChangepasswordService } from 'app/main/clinic-admin/changepassword/changepassword.service';
import { ChangepasswordModel } from '../changepassword/changepassword.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-changepassword',
    templateUrl: './changepassword.component.html',
    styleUrls: ['./changepassword.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChangepasswordComponent implements OnInit, OnDestroy {
    // Public
    public url = this.router.url;
    public urlLastValue;
    public apiData;
    public sidebarToggleRef = false;
    public paymentSidebarToggle = false;
    public items = [{ itemId: '', itemName: '', itemQuantity: '', itemCost: '' }];
    public invoiceSelect;
    public invoiceSelected;
    public changePasswordForm: UntypedFormGroup;
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public error = '';
    public success = "";
    medicinBrands: any;
    medicinCategories: any;
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();
    public changepassword: ChangepasswordModel = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        id: "0",
        type:""
    }
    // Private
    private _unsubscribeAll: Subject<any>;
    //private _formBuilder: any;

    /**
     * Constructor
     *
     * @param {Router} router
     * @param {InvoiceEditService} _invoiceEditService
     * @param {CoreSidebarService} _coreSidebarService
     */
    constructor(
        private router: Router,
        private _changePasswordService: ChangepasswordService, private _formBuilder: UntypedFormBuilder, private _route: ActivatedRoute, private _toastrService: ToastrService) {
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {

        this.changePasswordForm = this._formBuilder.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            confirmPassword: ['', Validators.required],
        });
    }
    get f() {
        return this.changePasswordForm.controls;
    }
    
   
    onSubmit() {
        this.submitted = true;

        if (this.changePasswordForm.invalid) {
            return;
        }

        this.loading = true;
        this._changePasswordService
            .changepassword(this.changepassword)
            .pipe()
            .subscribe(
                data => {
                    this.error = "";
                    this.success = "your password has been changed";
                },
                error => {
                    this.success = "";
                    this.error = error;
                    this.loading = false;
                }
            );
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
