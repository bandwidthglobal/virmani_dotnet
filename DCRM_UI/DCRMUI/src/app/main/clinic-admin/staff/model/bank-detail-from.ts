import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';
import { User } from 'app/auth/models';

export class BankDetailFormModel {
  id?: any = 0;
  staff_Id?: any = 0;
  bank_Name?: any = '';
  bank_Account_Number?: any = 0;
  ifsc_Code?: any = '';
  remarks?: any = '';
  updated_At?: any = new Date();
}

export class BankDetailForm extends FormGroup {

  readonly id = this.get('id') as FormControl;
  readonly staff_Id = this.get('staff_Id') as FormControl;
  readonly bank_Name = this.get('bank_Name') as FormControl;
  readonly bank_Account_Number = this.get('bank_Account_Number') as FormControl;
  readonly ifsc_Code = this.get('ifsc_Code') as FormControl;
  readonly remarks = this.get('remarks') as FormControl;
  readonly updated_At = this.get('updated_At') as FormControl;

  constructor(
    readonly model: BankDetailFormModel,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    let currentUser: any = <User>JSON.parse(localStorage.getItem('currentUser'));
    super(
      fb.group(
        {
          id: [model?.id],
          staff_Id: [model?.staff_Id],
          bank_Name: [model?.bank_Name, [Validators.required]],
          bank_Account_Number: [model?.bank_Account_Number, [Validators.required]],
          ifsc_Code: [model?.ifsc_Code, [Validators.required]],
          remarks: [model?.remarks],
          updated_At: [model?.updated_At],
        }, {
        validators: [vMODEL.FormTypeValidation],
      }
      ).controls
    );
  }
}
