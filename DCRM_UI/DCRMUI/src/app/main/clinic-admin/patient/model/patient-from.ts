import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';
import { IInsuranceLoanForm, IInsuranceLoanFormModel } from './insurance-loans-form';
import { IContactsForm, IContactsFormModel } from './contacts-form';
import { User } from 'app/auth/models';

export interface IPatientFormModel {
  id?: any;
  chamber_Id?: any;
  user_Id?: any;
  mr_Number?: any;
  name?: any;
  user_name?: any;
  slug?: any;
  thumb?: any;
  email?: any;
  age?: any;
  dob?: any;
  weight?: any;
  sex?: any;
  mobile?: any;
  password?: any;
  title?: any;
  guardian?: any;
  role?: any;
  verify_Code?: any;
  present_Address?: any;
  permanent_Address?: any;
  is_Delete?: any;
  created_At?: any;
  patientContacts?: IContactsFormModel[];
  patientInsuranceLoans?: IInsuranceLoanFormModel[];
  patientScans?: any[];
  patientTests?: any[];
}

export class IPatientForm extends FormGroup {
  readonly id = this.get('id') as FormControl;
  readonly chamber_Id = this.get('chamber_Id') as FormControl;
  readonly user_Id = this.get('user_Id') as FormControl;
  readonly mr_Number = this.get('mr_Number') as FormControl;
  readonly name = this.get('name') as FormControl;
  readonly user_name = this.get('user_name') as FormControl;
  readonly slug = this.get('slug') as FormControl;
  readonly thumb = this.get('thumb') as FormControl;
  readonly email = this.get('email') as FormControl;
  readonly age = this.get('age') as FormControl;
  readonly dob = this.get('age') as FormControl;
  readonly weight = this.get('weight') as FormControl;
  readonly sex = this.get('sex') as FormControl;
  readonly mobile = this.get('mobile') as FormControl;
  readonly password = this.get('password') as FormControl;
  readonly title = this.get('title') as FormControl;
  readonly guardian = this.get('guardian') as FormControl;
  readonly role = this.get('role') as FormControl;
  readonly verify_Code = this.get('verify_Code') as FormControl;
  readonly present_Address = this.get('present_Address') as FormControl;
  readonly permanent_Address = this.get('permanent_Address') as FormControl;
  readonly is_Delete = this.get('is_Delete') as FormControl;
  readonly created_At = this.get('created_At') as FormControl;
  readonly patientContacts = this.get('patientContacts') as FormArray;
  readonly patientInsuranceLoans = this.get('patientInsuranceLoans') as FormArray;
  readonly patientScans = this.get('patientScans') as FormArray;
  readonly patientTests = this.get('patientTests') as FormArray;

  constructor(
    readonly model: IPatientFormModel,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    let currentUser: any = <User>JSON.parse(localStorage.getItem('currentUser'));
    super(
      fb.group(
        {
          id: [model?.id],
          chamber_Id: [model?.chamber_Id],
          user_Id: [currentUser.id],
          mr_Number: [model?.mr_Number],
          name: [model?.name, Validators.required],
          user_name: [model?.user_name],
          slug: [model?.slug],
          thumb: [model?.thumb],
          email: [model?.email, Validators.email],
          age: [model?.age],
          dob: [model?.dob],
          weight: [model?.weight],
          sex: [model?.sex],
          mobile: [model?.mobile, [Validators.minLength(10), Validators.maxLength(10)]],
          password: [model?.password],
          title: [model?.title, Validators.required],
          guardian: [model?.guardian],
          role: [model?.role],
          verify_Code: [model?.verify_Code],
          present_Address: [model?.present_Address],
          permanent_Address: [model?.permanent_Address],
          is_Delete: [model?.is_Delete],
          created_At: [model?.created_At],
          patientContacts: fb.array([]),
          patientInsuranceLoans: fb.array([]),
          patientScans: fb.array([]),
          patientTests: fb.array([]),
        }, {
        validators: [vMODEL.FormTypeValidation],
      }
      ).controls
    );

    model?.patientContacts?.map((attr) => {
      this._patientContacts.push(new IContactsForm(attr));
    });

    model?.patientInsuranceLoans?.map((attr) => {
      this._patientInsuranceLoans.push(new IInsuranceLoanForm(attr));
    });

    // model?.patientScans?.map((attr) => {
    //   this._patientScans.push(new IContactsForm(attr));
    // });

    // model?.patientTests?.map((attr) => {
    //   this._patientTests.push(new IContactsForm(attr));
    // });
  }

  get _patientContacts(): any {
    return (this.controls.patientContacts as FormArray);
  }

  get _patientInsuranceLoans(): any {
    return (this.controls.patientInsuranceLoans as FormArray);
  }

  // get _patientScans(): any {
  //   return (this.controls.patientScans as FormArray);
  // }

  // get _patientTests(): any {
  //   return (this.controls.patientTests as FormArray);
  // }
}
