import { Component, Inject, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { validationMessages } from "app/shared-common/pipes/error-message";
import { ToastrService } from "ngx-toastr";
import { CommonValidationService } from "app/shared-common/services/common-validation.service";
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITreatmentPlanForm, ITreatmentPlanFormModel } from "../model/treatement-plan-from";
import { TreatmentPalnFormService } from "./treatment-plan-form.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: 'app-treatment-plan-form',
    templateUrl: './treatment-plan-form.component.html',
    styleUrls: ['./treatment-plan-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TreatmentPlanFormComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;

    pageTitle?: string;
    loading: boolean = false;
    submitted: boolean = false;
    error: any = '';
    messages = validationMessages;
    formData?: ITreatmentPlanForm;
    @Input() FormInput?: any = new ITreatmentPlanFormModel();
    @Input() FormAction?: 'add' | 'edit' = 'add';
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();
    @Input() apiData?: any = '';

    ITeethList: Array<any> = [
        {
            id: 1,
            teeth: 'Palmer-Zsigmondy',
        },
        {
            id: 2,
            teeth: 'FDI',
        },
        {
            id: 3,
            teeth: 'Universal',
        },
    ];

    ITreatmentType: Array<any> = [
        {
            text: 'Chief Complaint',
            value: 'Chief Complaint'
        },
        {
            text: 'Other Findings',
            value: 'Other Findings'
        },
        {
            text: 'Existing',
            value: 'Existing'
        },
    ];
    IDoctors: Array<any> = [];
    constructor(
        private _toastrService: ToastrService,
        private _treatmentPalnFormService: TreatmentPalnFormService,
        private _commonValidationService: CommonValidationService,
        // @Inject(MAT_DIALOG_DATA) public data: any,
        // public matDialogRef: MatDialogRef<TreatmentPlanFormComponent>
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.formData = new ITreatmentPlanForm(this.FormInput);
        this.formData.patchValue({ patientId: this.apiData.id });
        if (this.FormAction === 'add') {
            this.pageTitle = 'Create New';
        } else {
            this.pageTitle = 'Edit';
        }
        this._treatmentPalnFormService.getIDoctors().pipe().subscribe((response) => {
            this.IDoctors = response;
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    saveForm(): void {
        this.submitted = true;
        this._commonValidationService.validateAllFormFields(this.formData);
        if (this.formData.invalid) {
            console.log('> invalidForm ---> ', this.formData);
            return;
        } else {
            const payload: any = this.formData.getRawValue();
            payload.ord = payload.ord ? payload.ord : '';
            payload.rmd = payload.rmd ? payload.rmd : '';
            payload.courtesy = payload.courtesy ? payload.courtesy.toString() : '';
            // console.log('> saveForm ---> ', payload);
            this.loading = true;
            this._treatmentPalnFormService.save(payload, this.FormAction).pipe(catchError((error) => {
                // console.log('> error ---> ', error);
                this.loading = false;
                this.error = error;
                this.callBackEvent.emit({
                    status: 'failure',
                    data: error,
                    page: this.FormAction,
                });
                return '';
            })).subscribe((response) => {
                // console.log('> save ---> ', response);
                this.loading = false;
                this.callBackEvent.emit({
                    status: 'failure',
                    data: response,
                    page: this.FormAction,
                });
            });
        }
    }
};