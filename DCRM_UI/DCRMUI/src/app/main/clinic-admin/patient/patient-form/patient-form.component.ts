import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { validationMessages } from "app/shared-common/pipes/error-message";
import { IPatientForm, IPatientFormModel } from "../model/patient-from";
import { ToastrService } from "ngx-toastr";
import { PatientFormService } from "./patient-form.service";
import { CommonValidationService } from "app/shared-common/services/common-validation.service";
import { IContactsForm, IContactsFormModel } from "../model/contacts-form";
import { FormArray } from "@angular/forms";
import { IInsuranceLoanForm, IInsuranceLoanFormModel } from "../model/insurance-loans-form";
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-patient-form',
    templateUrl: './patient-form.component.html',
    styleUrls: ['./patient-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PatientFormComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;

    pageTitle?: string;
    loading: boolean = false;
    submitted: boolean = false;
    error: any = '';
    messages = validationMessages;
    formData?: IPatientForm;
    @Input() FormInput?: IPatientFormModel = {
        id: 0,
        user_Id: 0,
        is_Delete: 0,
        created_At: new Date(),
    };
    @Input() FormAction?: 'add' | 'edit' = 'add';
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();

    ITitleList: Array<any> = [
        { id: 'Mr', text: 'Mr' },
        { id: 'Mrs', text: 'Mrs' },
        { id: 'Miss', text: 'Miss' },
        { id: 'Ms', text: 'Ms' },
        { id: 'Mx', text: 'Mx' },
        { id: 'Sir', text: 'Sir' },
        { id: 'Dr', text: 'Dr' },
    ];

    IGender: Array<any> = [
        { id: 'Male', text: 'Male' },
        { id: 'Female', text: 'Female' },
    ];

    IReferList: Array<any> = [
        { id: 'Doctor', text: 'Doctor' },
        { id: 'Patient', text: 'Patient' },
        { id: 'Staff', text: 'Staff' },
        { id: 'Other', text: 'Other' },
    ];

    IInsureType: Array<any> = [
        { id: 'Insurance', text: 'Insurance' },
        { id: 'Loan', text: 'Loan' },
    ];

    constructor(
        private _toastrService: ToastrService,
        private _patientFormService: PatientFormService,
        private _commonValidationService: CommonValidationService,
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.formData = new IPatientForm(this.FormInput);
        if (this.FormAction === 'add') {
            this.pageTitle = 'Add Patient';
            this.addContactDetails();
            this.addInsuranceLoan();
        } else {
            this.pageTitle = 'Edit Patient';
            this.base64Image = this.FormInput.thumb;
        }
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    addContactDetails(): void {
        const obj: IContactsFormModel = {
            id: 0,
            patient_Id: 0,
            created_At: new Date(),
            updated_At: new Date(),
        };
        const control = <FormArray>this.formData.controls['patientContacts'];
        control.push(new IContactsForm(obj));
    }

    removeContactDetails(idx): void {
        const control = <FormArray>this.formData.controls['patientContacts'];
        control.removeAt(idx);
    }

    addInsuranceLoan(): void {
        const obj: IInsuranceLoanFormModel = {
            id: 0,
            patients_Id: 0,
            amount: "0",
            balance_Spent: "0",
            balance_Amount: "0",
            created_At: new Date(),
            updated_At: new Date(),
        };
        const control = <FormArray>this.formData.controls['patientInsuranceLoans'];
        control.push(new IInsuranceLoanForm(obj));
    }

    removeInsuranceLoan(idx): void {
        const control = <FormArray>this.formData.controls['patientInsuranceLoans'];
        control.removeAt(idx);
    }

    files: any;
    base64Image: string | ArrayBuffer | null = null;
    // imagePreviewUrl: string | ArrayBuffer | null = null;
    convertToBase64(event: any) {
        const file = event.target.files[0];
        this.files = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.base64Image = e.target.result;
            };
            // reader.onload = (e: any) => {
            //   this.imagePreviewUrl = e.target.result;
            //   this.base64Image = e.target.result;
            // };
            reader.readAsDataURL(file);
            //reader.readAsDataURL(this.selectedImage);
        }
    }

    saveForm(): void {
        this.submitted = true;
        this._commonValidationService.validateAllFormFields(this.formData);
        if (this.formData.invalid) {
            // console.log('> invalidForm ---> ', this.formData);
            return;
        } else {
            const payload: any = this.formData.getRawValue();
            payload.thumb = this.base64Image;
            // console.log('> saveForm ---> ', payload);
            payload.patientInsuranceLoans.map(e => {
                e.amount = e.amount.toString();
                e.balance_Spent = e.balance_Spent.toString();
                e.balance_Amount = e.balance_Amount.toString();
            });
            this.loading = true;
            debugger;

            this._patientFormService.save(payload, this.FormAction).pipe(catchError((error) => {
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