import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';
import { User } from 'app/auth/models';

export class VaccinationFormModel {
  id?: any = 0;
  doctor_Id?: any = 0;
  vaccination_Type?: any = 0;
  vaccination_Date?: any = '';
  reminder_Date_For_Next?: any = '';
  remarks?: any = '';
  medical_History?: any = '';
  updated_At?: any = new Date();
}

export class VaccinationForm extends FormGroup {

  readonly id = this.get('id') as FormControl;
  readonly doctor_Id = this.get('doctor_Id') as FormControl;
  readonly vaccination_Type = this.get('vaccination_Type') as FormControl;
  readonly vaccination_Date = this.get('vaccination_Date') as FormControl;
  readonly reminder_Date_For_Next = this.get('reminder_Date_For_Next') as FormControl;
  readonly remarks = this.get('remarks') as FormControl;
  readonly medical_History = this.get('medical_History') as FormControl;
  readonly updated_At = this.get('updated_At') as FormControl;

  constructor(
    readonly model: VaccinationFormModel,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    let currentUser: any = <User>JSON.parse(localStorage.getItem('currentUser'));
    super(
      fb.group(
        {
          id: [model?.id],
          doctor_Id: [model?.doctor_Id],
          vaccination_Type: [model?.vaccination_Type, [Validators.required]],
          vaccination_Date: [model?.vaccination_Date, [Validators.required]],
          reminder_Date_For_Next: [model?.reminder_Date_For_Next, [Validators.required]],
          remarks: [model?.remarks],
          medical_History: [model?.medical_History],
          updated_At: [model?.updated_At],
        }, {
        validators: [vMODEL.FormTypeValidation],
      }
      ).controls
    );
  }
}
