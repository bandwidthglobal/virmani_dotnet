import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';
import { User } from 'app/auth/models';

export class AddressFormModel {
  id?: any = 0;
  doctor_Id?: any = 0;
  address_R?: any = '';
  city_R?: any = '';
  zip_R?: any = null;
  country_R?: any = '';
  address_O?: any = '';
  city_O?: any = '';
  zip_O?: any = null;
  country_O?: any = '';
  address_Other?: any = '';
  city_Other?: any = '';
  zip_Other?: any = null;
  country_Other?: any = '';
  created_At?: any = new Date();
  updated_At?: any = new Date();
}

export class AddressForm extends FormGroup {

  readonly id = this.get('id') as FormControl;
  readonly doctor_Id = this.get('doctor_Id') as FormControl;
  readonly address_R = this.get('address_R') as FormControl;
  readonly city_R = this.get('city_R') as FormControl;
  readonly zip_R = this.get('zip_R') as FormControl;
  readonly country_R = this.get('country_R') as FormControl;
  readonly address_O = this.get('address_O') as FormControl;
  readonly city_O = this.get('city_O') as FormControl;
  readonly zip_O = this.get('zip_O') as FormControl;
  readonly country_O = this.get('country_O') as FormControl;
  readonly address_Other = this.get('address_Other') as FormControl;
  readonly city_Other = this.get('city_Other') as FormControl;
  readonly zip_Other = this.get('zip_Other') as FormControl;
  readonly country_Other = this.get('country_Other') as FormControl;
  readonly created_At = this.get('created_At') as FormControl;
  readonly updated_At = this.get('updated_At') as FormControl;

  constructor(
    readonly model: AddressFormModel,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    let currentUser: any = <User>JSON.parse(localStorage.getItem('currentUser'));
    super(
      fb.group(
        {
          id: [model?.id],
          doctor_Id: [model?.doctor_Id],
          address_R: [model?.address_R, [Validators.required]],
          city_R: [model?.city_R, [Validators.required]],
          zip_R: [model?.zip_R, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
          country_R: [model?.country_R, [Validators.required]],
          address_O: [model?.address_O],
          city_O: [model?.city_O],
          zip_O: [model?.zip_O, [Validators.minLength(6), Validators.maxLength(6)]],
          country_O: [model?.country_O],
          address_Other: [model?.address_Other],
          city_Other: [model?.city_Other],
          zip_Other: [model?.zip_Other, [Validators.minLength(6), Validators.maxLength(6)]],
          country_Other: [model?.country_Other],
          created_At: [model?.created_At],
          updated_At: [model?.updated_At],
        }, {
        validators: [vMODEL.FormTypeValidation],
      }
      ).controls
    );
  }
}
