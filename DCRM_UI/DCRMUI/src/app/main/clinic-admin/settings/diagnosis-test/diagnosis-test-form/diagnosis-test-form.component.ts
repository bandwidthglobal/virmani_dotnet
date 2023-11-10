import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { repeaterAnimation } from 'app/main/forms/form-repeater/form-repeater.animation';
import { DiagnosisTestFormService } from 'app/main/clinic-admin/settings/diagnosis-test/diagnosis-test-form/diagnosis-test-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DiagnosisTestFormModel } from './diagnosis-test-form.model';

@Component({
    selector: 'app-diagnosis-test-form',
    templateUrl: './diagnosis-test-form.component.html',
    styleUrls: ['./diagnosis-test-form.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class DiagnosisTestFormComponent implements OnInit, OnDestroy {
    // public
    public apiData;
    public sidebarToggleRef = false;
    public invoiceSelect;
    public invoiceSelected;
    isEdit = false;
    diagnosisId = 0;
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public error = '';
    doctorNameList: any;
    public diagnosisForm: UntypedFormGroup;
    public  diagnosisModel: DiagnosisTestFormModel = {
        id: 0,
        user_Id: 0,
        name: "",
        details: "",
    }

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {InvoiceAddService} _invoiceAddService
     * @param {CoreSidebarService} _coreSidebarService
     */
    constructor(private _fromService: DiagnosisTestFormService, private _coreSidebarService: CoreSidebarService, private route: ActivatedRoute
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
        this.diagnosisForm = this._formBuilder.group({
            id: [0],
            user_Id: [0],
            name: ['', Validators.required],
            details: [''],
        });
        const id = this.route.snapshot.paramMap.get('id');
        if (id != undefined && id != null) {
            this.diagnosisId = parseInt(id);
        }
        if (this.diagnosisId > 0) {
            debugger;
            this.isEdit = true;
            this._fromService.get(this.diagnosisId).subscribe(response => {
                this.apiData = response;
                this.diagnosisModel.id = this.apiData.id;
                this.diagnosisModel.user_Id = this.apiData.uuser_Id;
                this.diagnosisModel.name = this.apiData.name;
                this.diagnosisModel.details = this.apiData.details;
            })
        }
    }
   
    get f() {
        return this.diagnosisForm.controls;
    }
    onSubmit() {
        this.submitted = true;

        if (this.diagnosisForm.invalid) {
            return;
        }
        this.loading = true;
        this.diagnosisModel.id = this.diagnosisId;
        debugger;
        this._fromService
            .save(this.diagnosisId, this.diagnosisModel)
            .pipe()
            .subscribe(
                data => {
                    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/settings/diagnosistests/list';
                    this.router.navigateByUrl(this.returnUrl);
                },
                error => {
                    debugger;
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
