import { Component, OnDestroy, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { repeaterAnimation } from 'app/main/forms/form-repeater/form-repeater.animation';
import { FormArray } from '@angular/forms';
import { validationMessages } from 'app/shared-common/pipes/error-message';
import { CommonValidationService } from 'app/shared-common/services/common-validation.service';
import { StaffFormService } from './staff-form.service';
import { StaffForm, StaffFormModel } from '../model/staff-from';
import { VaccinationForm, VaccinationFormModel } from '../model/vaccination-from';
import { BankDetailForm, BankDetailFormModel } from '../model/bank-detail-from';
import { InsuranceDetailForm, InsuranceDetailFormModel } from '../model/insurance-detail-from';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss'],
  animations: [repeaterAnimation],
  encapsulation: ViewEncapsulation.None
})

export class StaffFormComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  loading: boolean = false;
  submitted: boolean = false;
  error: any = '';
  messages = validationMessages;
  formData?: StaffForm;
  @Input() FormInput?: any = new StaffFormModel();
  @Input() FormAction?: 'add' | 'edit' = 'add';
  @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();

  pageTitle?: string = '';

  ITitlte: Array<any> = [
    { id: 'Mr', name: 'Mr' },
    { id: 'Mrs', name: 'Mrs' },
    { id: 'Miss', name: 'Miss' },
    { id: 'Ms', name: 'Ms' },
    { id: 'Mx', name: 'Mx' },
    { id: 'Sir', name: 'Sir' },
    { id: 'Dr', name: 'Dr' },
  ];

  IGender: Array<any> = [
    { id: 'Male', name: 'Male' },
    { id: 'Female', name: 'Female' },
  ];

  IMStatus: Array<any> = [
    { id: 'Single', name: 'Single' },
    { id: 'Married', name: 'Married' },
    { id: 'Widowed', name: 'Widowed' },
    { id: 'Seperated', name: 'Seperated' },
    { id: 'Not Specified', name: 'Not Specified' },
  ];

  IBloodGroup: Array<any> = [
    { id: 'O+', name: 'O+' },
    { id: 'A+', name: 'A+' },
    { id: 'B+', name: 'B+' },
    { id: 'AB+', name: 'AB+' },
    { id: 'O-', name: 'O-' },
    { id: 'A-', name: 'A-' },
    { id: 'B-', name: 'B-' },
    { id: 'AB-', name: 'AB-' },
  ];

  IDesignation: Array<any> = [
    { id: 'Community Dentistry', name: 'Community Dentistry' },
    { id: 'Conservative / Endodontics  ', name: 'Conservative / Endodontics  ' },
    { id: 'General Dentistry', name: 'General Dentistry' },
    { id: 'Oral &amp; Maxillofacial Surgery', name: 'Oral &amp; Maxillofacial Surgery' },
    { id: 'Oral Medicine &amp; Radiology', name: 'Oral Medicine &amp; Radiology' },
    { id: 'Oral Pathology &amp; Microbiology', name: 'Oral Pathology &amp; Microbiology' },
    { id: 'Orthodontics', name: 'Orthodontics' },
    { id: 'Paedodontics  ', name: 'Paedodontics  ' },
    { id: 'Periodontics  ', name: 'Periodontics  ' },
    { id: 'Prosthetics', name: 'Prosthetics' },
  ];

  constructor(
    private _staffFormService: StaffFormService,
    private _commonValidationService: CommonValidationService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    if (this.FormAction === 'add') {
      this.pageTitle = 'Add Staff';
      this.formData = new StaffForm(this.FormInput);
      this.addVaccinationDetails();
      this.addBankDetails();
      this.addInsuranceDetails();
    } else {
      this.pageTitle = 'Edit Staff';
      this.base64Image = this.FormInput.thumb;

      this.FormInput.dob = this._commonValidationService.dateFormat_Y_M_D(this.FormInput.dob);
      this.FormInput.date_Of_Joining = this._commonValidationService.dateFormat_Y_M_D(this.FormInput.date_Of_Joining);

      this.FormInput.staffVaccination.map(e => {
        e.vaccination_Date = this._commonValidationService.dateFormat_Y_M_D(e.vaccination_Date);
        e.reminder_Date_For_Next = this._commonValidationService.dateFormat_Y_M_D(e.reminder_Date_For_Next);
      });
      this.FormInput.staffInsuranceDetail.map(e => {
        e.insurance_Date = this._commonValidationService.dateFormat_Y_M_D(e.insurance_Date);
        e.renewal_Date = this._commonValidationService.dateFormat_Y_M_D(e.renewal_Date);
      });

      this.formData = new StaffForm(this.FormInput);
      console.log('> Edit ---> ', this.formData.value);
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
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
      payload.dob = this._commonValidationService.dateFormat_Y_M_D(payload.dob);
      payload.date_Of_Joining = this._commonValidationService.dateFormat_Y_M_D(payload.date_Of_Joining);
      payload.staffVaccination.map(e => {
        e.vaccination_Date = this._commonValidationService.dateFormat_Y_M_D(e.vaccination_Date);
        e.reminder_Date_For_Next = this._commonValidationService.dateFormat_Y_M_D(e.reminder_Date_For_Next);
      });
      payload.staffInsuranceDetail.map(e => {
        e.insurance_Date = this._commonValidationService.dateFormat_Y_M_D(e.insurance_Date);
        e.renewal_Date = this._commonValidationService.dateFormat_Y_M_D(e.renewal_Date);
      });
      // console.log('> saveForm ---> ', payload);
      this.loading = true;
      this._staffFormService.save(payload, this.FormAction).pipe(catchError((error) => {
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

  addVaccinationDetails(): void {
    const obj: any = new VaccinationFormModel();
    const control = <FormArray>this.formData.controls['staffVaccination'];
    control.push(new VaccinationForm(obj));
  }

  removeVaccinationDetails(idx): void {
    const control = <FormArray>this.formData.controls['staffVaccination'];
    control.removeAt(idx);
  }

  addBankDetails(): void {
    const obj: BankDetailFormModel = {
      id: 0,
      staff_Id: 0,
      bank_Name: '',
      bank_Account_Number: 0,
      ifsc_Code: '',
      remarks: '',
      updated_At: new Date(),
    };
    const control = <FormArray>this.formData.controls['staffBankDetail'];
    control.push(new BankDetailForm(obj));
  }

  removeBankDetails(idx): void {
    const control = <FormArray>this.formData.controls['staffBankDetail'];
    control.removeAt(idx);
  }

  addInsuranceDetails(): void {
    const obj: InsuranceDetailFormModel = {
      id: 0,
      staff_Id: 0,
      insurance: '',
      insurance_Date: '',
      renewal_Date: '',
      amount_Insured: 0,
      amount_Paid: 0,
      allow_Notifications: 0,
      remarks: '',
      updated_At: new Date(),
    };
    const control = <FormArray>this.formData.controls['staffInsuranceDetail'];
    control.push(new InsuranceDetailForm(obj));
  }

  removeInsuranceDetails(idx): void {
    const control = <FormArray>this.formData.controls['staffInsuranceDetail'];
    control.removeAt(idx);
  }
}