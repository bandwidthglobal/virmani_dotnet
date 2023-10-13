import { Component, OnDestroy, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { repeaterAnimation } from 'app/main/forms/form-repeater/form-repeater.animation';
import { FormArray } from '@angular/forms';
import { PrescriptionForm, PrescriptionFormModel } from '../model/prescription-from';
import { validationMessages } from 'app/shared-common/pipes/error-message';
import { CommonValidationService } from 'app/shared-common/services/common-validation.service';
import { DrugListForm, DrugListModel } from '../model/drug-list-form';
import { PrescriptionFormService } from './prescription-form.service';

@Component({
    selector: 'app-prescription-form',
    templateUrl: './prescription-form.component.html',
    styleUrls: ['./prescription-form.component.scss'],
  animations: [repeaterAnimation],
  encapsulation: ViewEncapsulation.None
})

export class PrescriptionFormComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;

  loading: boolean = false;
  submitted: boolean = false;
  error: any = '';
  messages = validationMessages;
    formData?: PrescriptionForm;
    @Input() FormInput?: PrescriptionFormModel = {
    id: 0,
    user_Id: 0,
    created_At: new Date(),
  };
  @Input() FormAction?: 'add' | 'edit' = 'add';
  @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(
      private _prescriptionFormService: PrescriptionFormService,
    private _commonValidationService: CommonValidationService,
  ) {
    this._unsubscribeAll = new Subject();
  }

    ngOnInit(): void {
        alert('hi');
      this.formData = new PrescriptionForm(this.FormInput);
    if (this.FormAction === 'add') {
        this.addDrugList();
    } 
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  addDrugList(): void {
    const obj: DrugListModel = {
      id: 0,
      drug_Name: null,
    };
    const control = <FormArray>this.formData.controls['drugList'];
    control.push(new DrugListForm(obj));
  }

    removeDrugList(idx): void {
        const control = <FormArray>this.formData.controls['drugList'];
    control.removeAt(idx);
  }


  saveForm(): void {
    this.submitted = true;
    this._commonValidationService.validateAllFormFields(this.formData);
    if (this.formData.invalid) {
      // console.log('> invalidForm ---> ', this.formData);
      return;
    } else {
      const payload: any = this.formData.getRawValue();
      payload.dealerMaterialList.map(e => {
        e.material_Date = this._commonValidationService.dateFormat_Y_M_D(e.material_Date);
      });
      // console.log('> saveForm ---> ', payload);
      this.loading = true;
        this._prescriptionFormService.save(payload, this.FormAction).pipe(catchError((error) => {
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