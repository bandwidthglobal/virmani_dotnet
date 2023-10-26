import { Component, OnDestroy, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { repeaterAnimation } from 'app/main/forms/form-repeater/form-repeater.animation';
import { FormArray } from '@angular/forms';
import { validationMessages } from 'app/shared-common/pipes/error-message';
import { CommonValidationService } from 'app/shared-common/services/common-validation.service';
import { DoctorFormService } from './doctor-form.service';
import { VaccinationForm, VaccinationFormModel } from '../model/vaccination-from';
import { BankDetailForm, BankDetailFormModel } from '../model/bank-detail-from';
import { InsuranceDetailForm, InsuranceDetailFormModel } from '../model/insurance-detail-from';
import { DoctorForm, DoctorFormModel } from '../model/doctor-from';
import { AddressForm, AddressFormModel } from '../model/address-from';

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.scss'],
  animations: [repeaterAnimation],
  encapsulation: ViewEncapsulation.None
})

export class DoctorFormComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  loading: boolean = false;
  submitted: boolean = false;
  error: any = '';
  messages = validationMessages;
  formData?: DoctorForm;
  @Input() FormInput?: any = new DoctorFormModel();
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
    private _doctorFormService: DoctorFormService,
    private _commonValidationService: CommonValidationService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    if (this.FormAction === 'add') {
      this.pageTitle = 'Add Doctor';
      this.formData = new DoctorForm(this.FormInput);
      this.addVaccinationDetails();
      this.addBankDetails();
      this.addInsuranceDetails();
      this.addAddressDetails();
    } else {
      this.pageTitle = 'Edit Doctor';
      this.base64Image = this.FormInput.thumb;

      this.FormInput.dob = this._commonValidationService.dateFormat_Y_M_D(this.FormInput.dob);
      this.FormInput.date_Of_Joining = this._commonValidationService.dateFormat_Y_M_D(this.FormInput.date_Of_Joining);

      this.FormInput.doctorsVaccinationList.map(e => {
        e.vaccination_Date = this._commonValidationService.dateFormat_Y_M_D(e.vaccination_Date);
        e.reminder_Date_For_Next = this._commonValidationService.dateFormat_Y_M_D(e.reminder_Date_For_Next);
      });
      this.FormInput.doctorInsuranceDetailList.map(e => {
        e.insurance_Date = this._commonValidationService.dateFormat_Y_M_D(e.insurance_Date);
        e.renewal_Date = this._commonValidationService.dateFormat_Y_M_D(e.renewal_Date);
      });

      this.formData = new DoctorForm(this.FormInput);
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
      console.log('> invalidForm ---> ', this.formData);
      return;
    } else {
      const payload: any = this.formData.getRawValue();
      payload.thumb = this.base64Image;
      payload.dob = this._commonValidationService.dateFormat_Y_M_D(payload.dob);
      payload.doctorsVaccinationList.map(e => {
        e.vaccination_Date = this._commonValidationService.dateFormat_Y_M_D(e.vaccination_Date);
        e.reminder_Date_For_Next = this._commonValidationService.dateFormat_Y_M_D(e.reminder_Date_For_Next);
      });
      payload.doctorInsuranceDetailList.map(e => {
        e.insurance_Date = this._commonValidationService.dateFormat_Y_M_D(e.insurance_Date);
        e.renewal_Date = this._commonValidationService.dateFormat_Y_M_D(e.renewal_Date);
      });
      // console.log('> saveForm ---> ', payload);
      this.loading = true;
      this._doctorFormService.save(payload, this.FormAction).pipe(catchError((error) => {
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
    const control = <FormArray>this.formData.controls['doctorsVaccinationList'];
    control.push(new VaccinationForm(obj));
  }

  removeVaccinationDetails(idx): void {
    const control = <FormArray>this.formData.controls['doctorsVaccinationList'];
    control.removeAt(idx);
  }

  addBankDetails(): void {
    const obj: any = new BankDetailFormModel();
    const control = <FormArray>this.formData.controls['doctorBankDetailList'];
    control.push(new BankDetailForm(obj));
  }

  removeBankDetails(idx): void {
    const control = <FormArray>this.formData.controls['doctorBankDetailList'];
    control.removeAt(idx);
  }

  addInsuranceDetails(): void {
    const obj: any = new InsuranceDetailFormModel();
    const control = <FormArray>this.formData.controls['doctorInsuranceDetailList'];
    control.push(new InsuranceDetailForm(obj));
  }

  removeInsuranceDetails(idx): void {
    const control = <FormArray>this.formData.controls['doctorInsuranceDetailList'];
    control.removeAt(idx);
  }

  addAddressDetails(): void {
    const obj: any = new AddressFormModel();
    const control = <FormArray>this.formData.controls['doctorsAddressList'];
    control.push(new AddressForm(obj));
  }

  removeAddressDetails(idx): void {
    const control = <FormArray>this.formData.controls['doctorsAddressList'];
    control.removeAt(idx);
  }
}