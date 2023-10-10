import { Component, OnDestroy, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { repeaterAnimation } from 'app/main/forms/form-repeater/form-repeater.animation';
import { FormArray } from '@angular/forms';
import { DealerForm, DealerFormModel } from '../model/dealer-from';
import { validationMessages } from 'app/shared-common/pipes/error-message';
import { CommonValidationService } from 'app/shared-common/services/common-validation.service';
import { BankDetailsForm, BankDetailsModel } from '../model/bank-details-form';
import { MaterialListForm, MaterialListModel } from '../model/material-list-form';
import { DealerFormService } from './dealer-form.service';

@Component({
  selector: 'app-dealer-form',
  templateUrl: './dealer-form.component.html',
  styleUrls: ['./dealer-form.component.scss'],
  animations: [repeaterAnimation],
  encapsulation: ViewEncapsulation.None
})

export class DealerFormComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  loading: boolean = false;
  submitted: boolean = false;
  error: any = '';
  messages = validationMessages;
  formData?: DealerForm;
  @Input() FormInput?: DealerFormModel = {
    id: 0,
    user_Id: 0,
    is_Deleted: 0,
    created_At: new Date(),
    updated_At: new Date(),
  };
  @Input() FormAction?: 'add' | 'edit' = 'add';
  @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _dealerFormService: DealerFormService,
    private _commonValidationService: CommonValidationService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.formData = new DealerForm(this.FormInput);
    if (this.FormAction === 'add') {
      this.addBankDetails();
      this.addMaterialList();
    } else {
      this.base64Image = this.FormInput.thumb;
      this.FormInput?.dealerMaterialList.map(e => {
        e.material_Date = this._commonValidationService.dateFormat_Y_M_D(e.material_Date);
      });
    }
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  addBankDetails(): void {
    const obj: BankDetailsModel = {
      id: 0,
      dealer_Id: 0,
      bank_Name: null,
      bank_Account_Number: null,
      ifsc_Code: null,
      remarks: null,
      updated_At: new Date(),
    };
    const control = <FormArray>this.formData.controls['dealerBankDetailList'];
    control.push(new BankDetailsForm(obj));
  }

  removeBankDetails(idx): void {
    const control = <FormArray>this.formData.controls['dealerBankDetailList'];
    control.removeAt(idx);
  }

  addMaterialList(): void {
    const obj: MaterialListModel = {
      id: 0,
      dealer_Id: 0,
      material_Name: null,
      material_Cost: 0,
      material_Date: new Date(),
    };
    const control = <FormArray>this.formData.controls['dealerMaterialList'];
    control.push(new MaterialListForm(obj));
  }

  removeMaterialList(idx): void {
    const control = <FormArray>this.formData.controls['dealerMaterialList'];
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
      payload.dealerMaterialList.map(e => {
        e.material_Date = this._commonValidationService.dateFormat_Y_M_D(e.material_Date);
      });
      // console.log('> saveForm ---> ', payload);
      this.loading = true;
      this._dealerFormService.save(payload, this.FormAction).pipe(catchError((error) => {
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
}