import { Component, Inject, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { validationMessages } from "app/shared-common/pipes/error-message";
import { ToastrService } from "ngx-toastr";
import { CommonValidationService } from "app/shared-common/services/common-validation.service";
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ITreatmentPlanForm, ITreatmentPlanFormModel } from "../model/treatement-plan-from";
import { TreatmentPalnFormService } from "./treatment-plan-form.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { DomSanitizer } from '@angular/platform-browser';

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
    @Input() DiagnosisData?: any = '';


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
    Teeth: Array<any> = [];
    TeethCategory: Array<any> = [];
    constructor(
        private _toastrService: ToastrService,
        private _treatmentPalnFormService: TreatmentPalnFormService,
        private _commonValidationService: CommonValidationService,
        private doms: DomSanitizer
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
        this._treatmentPalnFormService.getTeethCategory().pipe().subscribe((response) => {
            this.TeethCategory = response;
            this.setTeethCategories();
        });
        this._treatmentPalnFormService.getTeeth(this.formData.teeth_id.value).pipe().subscribe((response) => {
            this.Teeth = response;
        });

        this.formData.get('teeth_id').valueChanges.subscribe((teeth_id) => {
            // alert(teeth_id);
            this._treatmentPalnFormService.getTeeth(teeth_id).pipe().subscribe((response) => {
                this.Teeth = response;
            });
            if (teeth_id == 3) {
                this.categoryID = 'continents2';
            } else if (teeth_id == 4) {
                this.categoryID = 'continents1';
            } else if (teeth_id == 5) {
                this.categoryID = 'continents3';
            } else if (teeth_id == 7) {
                this.categoryID = 'continents1_teeth';
            } else if (teeth_id == 8) {
                this.categoryID = 'continents2_teeth';
            } else if (teeth_id == 9) {
                this.categoryID = 'continents3_teeth';
            }
        });

        this.formData.get('milk_teeth').valueChanges.subscribe((milk_teeth) => {
            this.setTeethCategories();
            if (milk_teeth) {
                this.formData.patchValue({ teeth_id: 7 });
            }
            let teeth_id = this.formData.get('teeth_id').value;
            if (teeth_id == 3) {
                this.categoryID = 'continents2';
            } else if (teeth_id == 4) {
                this.categoryID = 'continents1';
            } else if (teeth_id == 5) {
                this.categoryID = 'continents3';
            } else if (teeth_id == 7) {
                this.categoryID = 'continents1_teeth';
            } else if (teeth_id == 8) {
                this.categoryID = 'continents2_teeth';
            } else if (teeth_id == 9) {
                this.categoryID = 'continents3_teeth';
            }
        });
    }
    categoryID: string = 'continents1';
    ITeethCategory: Array<any> = [];
    setTeethCategories() {
        let milk_teeth: any = this.formData.get('milk_teeth').value;
        if (milk_teeth) {
            this.ITeethCategory = this.TeethCategory.filter(f => f.teeth_Category_Name.includes('Milk'));
            console.log('> setTeethCategories if ---> ', this.ITeethCategory);
        } else {
            this.ITeethCategory = this.TeethCategory.filter(f => !f.teeth_Category_Name.includes('Milk'));
            console.log('> setTeethCategories else ---> ', this.ITeethCategory);
        }
    }

    removeQoutes(background) {
        background.replaceAll('"', '');
        background.toString();
        return background;
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    setJobName(event) {
        this.formData.patchValue({ job: event.job_name });
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

    getRecord_teechinfo(id, teeth_note, image) {
        // console.log('> id ---> ', id);
        // console.log('> teeth_note ---> ', teeth_note);
        // console.log('> image ---> ', image);
        let img = image.split('.');
        let str = '(' + img[0] + ') ' + teeth_note;
        console.log('> str ---> ', str);
        this.setToothNumber(str);
    }

    toothNumber: any = [];
    setToothNumber(str) {
        this.toothNumber.push(str);
        console.log('> toothNumber ---> ', this.toothNumber);
    }

    removeToothNumber(idx) {
        this.toothNumber.splice(idx, 1);
    }
};