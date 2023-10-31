import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { repeaterAnimation } from 'app/main/forms/form-repeater/form-repeater.animation';
import { ProsthesisTypeFormService } from 'app/main/clinic-admin/settings/prosthesis-type/prosthesis-type-form/prosthesis-type-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ProsthesisTypeFormModel } from './prosthesis-type-form.model';

@Component({
    selector: 'app-prosthesis-type-form',
    templateUrl: './prosthesis-type-form.component.html',
    styleUrls: ['./prosthesis-type-form.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class ProsthesisTypeFormComponent implements OnInit, OnDestroy {
    // public
    public apiData;
    public sidebarToggleRef = false;
    public invoiceSelect;
    public invoiceSelected;
    isEdit = false;
    prosthesisTypeId = 0;
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public error = '';
    doctorNameList: any;
    public prosthesisTypeForm: UntypedFormGroup;
    public prosthesisTypeModel: ProsthesisTypeFormModel = {
        id: 0,
        name: "",
    }

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {InvoiceAddService} _invoiceAddService
     * @param {CoreSidebarService} _coreSidebarService
     */
    constructor(private _fromService: ProsthesisTypeFormService, private _coreSidebarService: CoreSidebarService, private route: ActivatedRoute
        , private _formBuilder: UntypedFormBuilder, private router: Router,) {
        this._unsubscribeAll = new Subject();
    }


    /**
     * Toggle Sidebar
     *
     * @param name
     */
    toggleSidebar(name) {
        this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    }
    ngOnInit(): void {
        this.prosthesisTypeForm = this._formBuilder.group({
            name: ['', Validators.required],
            
        });
        const id = this.route.snapshot.paramMap.get('id');
        if (id != undefined && id != null) {
            this.prosthesisTypeId = parseInt(id);
        }
        if (this.prosthesisTypeId > 0) {
            this.isEdit = true;
            this._fromService.getProsthesisType(this.prosthesisTypeId).subscribe(response => {
                this.apiData = response;
                this.prosthesisTypeModel.name = this.apiData.name;
            })
        }
    }
  
    get f() {
        return this.prosthesisTypeForm.controls;
    }
    onSubmit() {
        this.submitted = true;

        if (this.prosthesisTypeForm.invalid) {
            return;
        }
        this.loading = true;
        this.prosthesisTypeModel.id = this.prosthesisTypeId;
        this._fromService
            .saveProsthesisType(this.prosthesisTypeId, this.prosthesisTypeModel)
            .pipe()
            .subscribe(
                data => {
                    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/settings/prosthesistype/list';
                    this.router.navigateByUrl(this.returnUrl);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
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
