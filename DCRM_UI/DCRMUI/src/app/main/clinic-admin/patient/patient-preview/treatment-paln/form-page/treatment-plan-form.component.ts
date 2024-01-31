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
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-treatment-plan-form',
    templateUrl: './treatment-plan-form.component.html',
    styleUrls: ['./treatment-plan-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class TreatmentPlanFormComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    returnUrl: string;
    pageTitle?: string;
    loading: boolean = false;
    submitted: boolean = false;
    error: any = '';
    treatmentStatus = 0;
    messages = validationMessages;
    formData?: ITreatmentPlanForm;
    @Input() FormInput?: any = new ITreatmentPlanFormModel();
    @Input() FormAction?: 'add' | 'edit' = 'add';
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();
    @Input() apiData?: any = '';
    @Input() DiagnosisData?: any = '';
    @Input() TreatmentId?: any = 0;


    ITeethList: Array<any> = [
        {
            id: 1,
            teeth: 'Palmer-Zsigmondy',
        },
        {
            id: 2,
            teeth: 'FDI1',
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
        private router: Router, private _route: ActivatedRoute
    ) {
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.formData = new ITreatmentPlanForm(this.FormInput);
        this.formData.patchValue({ patientId: this.apiData.id });
        if (this.TreatmentId == 0) {
            this.pageTitle = 'Create New';
        }
        else {
            this.pageTitle = 'Edit';
            this._treatmentPalnFormService.getTreatment(this.TreatmentId).pipe().subscribe((response) => {
               
                this.formData.id.setValue(response.id);
                this.formData.doctor.setValue(response.doctor);
                this.formData.job.setValue(response.job);
                this.formData.jobId.setValue(response.jobId);
                this.formData.type.setValue(response.type);
                this.formData.toth_Note.setValue(response.tothNot);
                this.formData.teeth_id.setValue(response.teeth_id);
                var toothNumbers = response.teeth_Number_Note.split(',');
                for (var i = 0; i < toothNumbers.length; i++) {
                    this.toothNumber.push(toothNumbers[i]);
                }
                this.formData.treatment_Notes.setValue(response.tothNot);
                this.formData.estimated_Amount.setValue(response.estimated_Amount);
                
            });
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
        //this.formData.get('estimated_Amount').valueChanges.subscribe((amount) => {

        //});
        this.formData.get('teeth_id').valueChanges.subscribe((teeth_id) => {
           
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
        this.formData.teeth_id.setValue(4);
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
    changeTreatmentStatus(status) {
        this.formData.treatmentStatus.setValue(status);
    }
    setJobName(event) {

        this.formData.patchValue({ job: event.job_name, jobId: event.jon_id });
    }
    Cancel() {
        window.location.reload();
    }
    saveForm(): void {
        this.submitted = true;
        let toothNumber = '';
        for (var i = 0; i < this.toothNumber.length; i++) {
            if (toothNumber == '') {
                toothNumber = this.toothNumber[i];
            }
            else {
                toothNumber = toothNumber + ',' + this.toothNumber[i];
            }
        }
        this._commonValidationService.validateAllFormFields(this.formData);
        if (this.formData.invalid) {
            console.log('> invalidForm ---> ', this.formData);
            return;
        } else {
            this.loading = true;
            const payload: any = this.formData.getRawValue();
            debugger;
            payload.ord = payload.ord ? payload.ord : '';
            payload.rmd = payload.rmd ? payload.rmd : '';
            payload.courtesy = payload.courtesy ? payload.courtesy.toString() : '';
            payload.teeth_Number_Note = toothNumber;
            if (payload.id != undefined && payload.id != '' && payload.id != 0 && payload.id>0) {
                this.FormAction = "edit";
            }
            this.loading = true;
            this._treatmentPalnFormService.save(payload, this.FormAction).pipe(catchError((error) => {
                this.loading = false;
                this.error = error;
                this.callBackEvent.emit({
                    status: 'failure',
                    data: error,
                    page: this.FormAction,
                });
                return '';
            })).subscribe((response) => {

                this.loading = false;
                this.callBackEvent.emit({
                    status: 'failure',
                    data: response,
                    page: this.FormAction,
                });
            });
        }
    }

    getRecord_teechinfo(id, teeth_note, teeth_Number) {

        //let img = image.split('.');
        let str = '(' + teeth_Number + ') ' + teeth_note;
        console.log('> str ---> ', str);
        this.setToothNumber(str);
    }

    toothNumber: any = [];
    setToothNumber(str) {
        this.toothNumber.push(str);
        console.log('> toothNumber ---> ', this.toothNumber);
    }

    redirect() {
        const returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/patient/preview';
        this.router.navigateByUrl(returnUrl);
    }
    removeToothNumber(idx) {
        this.toothNumber.splice(idx, 1);
    }
};