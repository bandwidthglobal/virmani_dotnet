import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';
import { User } from 'app/auth/models';

export class InsuranceDetailFormModel {
  id?: any = 0;
  staff_Id?: any = 0;
  insurance?: any = '';
  insurance_Date?: any = '';
  renewal_Date?: any = '';
  amount_Insured?: any = 0;
  amount_Paid?: any = 0;
  allow_Notifications?: any = 0;
  remarks?: any = '';
  updated_At?: any = new Date();
}

export class InsuranceDetailForm extends FormGroup {

  readonly id = this.get('id') as FormControl;
  readonly staff_Id = this.get('staff_Id') as FormControl;
  readonly insurance = this.get('insurance') as FormControl;
  readonly insurance_Date = this.get('insurance_Date') as FormControl;
  readonly renewal_Date = this.get('renewal_Date') as FormControl;
  readonly amount_Insured = this.get('amount_Insured') as FormControl;
  readonly amount_Paid = this.get('amount_Paid') as FormControl;
  readonly allow_Notifications = this.get('allow_Notifications') as FormControl;
  readonly remarks = this.get('remarks') as FormControl;
  readonly updated_At = this.get('updated_At') as FormControl;

  constructor(
    readonly model: InsuranceDetailFormModel,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    let currentUser: any = <User>JSON.parse(localStorage.getItem('currentUser'));
    super(
      fb.group(
        {
          id: [model?.id],
          staff_Id: [model?.staff_Id],
          insurance: [model?.insurance, [Validators.required]],
          insurance_Date: [model?.insurance_Date, [Validators.required]],
          renewal_Date: [model?.renewal_Date, [Validators.required]],
          amount_Insured: [model?.amount_Insured],
          amount_Paid: [model?.amount_Paid],
          allow_Notifications: [model?.allow_Notifications],
          remarks: [model?.remarks],
          updated_At: [model?.updated_At],
        }, {
        validators: [vMODEL.FormTypeValidation],
      }
      ).controls
    );
  }
}
