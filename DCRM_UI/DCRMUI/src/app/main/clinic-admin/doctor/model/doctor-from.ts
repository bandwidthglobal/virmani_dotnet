import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';
import { User } from 'app/auth/models';
import { BankDetailForm, BankDetailFormModel } from './bank-detail-from';
import { InsuranceDetailForm, InsuranceDetailFormModel } from './insurance-detail-from';
import { VaccinationForm, VaccinationFormModel } from './vaccination-from';
import { AddressForm } from './address-from';

export class DoctorFormModel {

  id?: any = 0;
  user_Id?: any = 0;
  thumb?: any = '';
  name?: any = '';
  gender?: any = '';
  dob?: any = '';
  age?: any = '';
  marital_Status?: any = '';
  blood_Group?: any = '';
  qualification?: any = '';
  email?: any = '';
  email2?: any = null;
  password?: any = '12345678';
  role?: any = 'doctor';
  speciality?: any = '';
  phone1?: any = '';
  phone2?: any = '';
  phone3?: any = '';
  phone4?: any = '';
  pan_Number?: any = '';
  gst_Number?: any = '';
  is_Delete?: any = 0;
  created_At?: any = new Date();
  updated_At?: any = new Date();

  doctorBankDetailList?: any[] = [];
  doctorInsuranceDetailList?: any[] = [];
  doctorsVaccinationList?: any[] = [];
  doctorsAddressList?: any[] = [];
}

export class DoctorForm extends FormGroup {

  readonly id = this.get('id') as FormControl;
  readonly user_Id = this.get('user_Id') as FormControl;
  readonly thumb = this.get('thumb') as FormControl;
  readonly name = this.get('name') as FormControl;
  readonly gender = this.get('gender') as FormControl;
  readonly dob = this.get('dob') as FormControl;
  readonly age = this.get('age') as FormControl;
  readonly marital_Status = this.get('marital_Status') as FormControl;
  readonly blood_Group = this.get('blood_Group') as FormControl;
  readonly qualification = this.get('qualification') as FormControl;
  readonly email = this.get('email') as FormControl;
  readonly email2 = this.get('email2') as FormControl;
  readonly password = this.get('password') as FormControl;
  readonly role = this.get('role') as FormControl;
  readonly speciality = this.get('speciality') as FormControl;
  readonly phone1 = this.get('phone1') as FormControl;
  readonly phone2 = this.get('phone2') as FormControl;
  readonly phone3 = this.get('phone3') as FormControl;
  readonly phone4 = this.get('phone4') as FormControl;
  readonly pan_Number = this.get('pan_Number') as FormControl;
  readonly gst_Number = this.get('gst_Number') as FormControl;
  readonly is_Delete = this.get('is_Delete') as FormControl;
  readonly created_At = this.get('created_At') as FormControl;
  readonly updated_At = this.get('updated_At') as FormControl;

  readonly doctorBankDetailList = this.get('doctorBankDetailList') as FormArray;
  readonly doctorInsuranceDetailList = this.get('doctorInsuranceDetailList') as FormArray;
  readonly doctorsVaccinationList = this.get('doctorsVaccinationList') as FormArray;
  readonly doctorsAddressList = this.get('doctorsAddressList') as FormArray;

  constructor(
    readonly model: DoctorFormModel,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    let currentUser: any = <User>JSON.parse(localStorage.getItem('currentUser'));
    super(
      fb.group(
        {
          id: [model?.id],
          user_Id: [model?.user_Id],
          thumb: [model?.thumb],
          name: [model?.name, [Validators.required]],
          gender: [model?.gender, [Validators.required]],
          dob: [model?.dob, [Validators.required]],
          age: [model?.age, [Validators.required]],
          marital_Status: [model?.marital_Status],
          blood_Group: [model?.blood_Group, [Validators.required]],
          qualification: [model?.qualification],
          email: [model?.email, [Validators.required, Validators.email]],
          email2: [model?.email2, [Validators.email]],
          password: [model?.password, [Validators.minLength(8)]],
          role: [model?.role],
          speciality: [model?.speciality],
          phone1: [model?.phone1, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
          phone2: [model?.phone2, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
          phone3: [model?.phone3, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
          phone4: [model?.phone4, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
          pan_Number: [model?.pan_Number],
          gst_Number: [model?.gst_Number],
          is_Delete: [model?.is_Delete],
          created_At: [model?.created_At],
          updated_At: [model?.updated_At],

          doctorBankDetailList: fb.array([]),
          doctorInsuranceDetailList: fb.array([]),
          doctorsVaccinationList: fb.array([]),
          doctorsAddressList: fb.array([]),
        }, {
        validators: [vMODEL.FormTypeValidation],
      }
      ).controls
    );

    model?.doctorBankDetailList?.map((attr) => {
      this._doctorBankDetailList.push(new BankDetailForm(attr));
    });

    model?.doctorInsuranceDetailList?.map((attr) => {
      this._doctorInsuranceDetailList.push(new InsuranceDetailForm(attr));
    });

    model?.doctorsVaccinationList?.map((attr) => {
      this._doctorsVaccinationList.push(new VaccinationForm(attr));
    });

    model?.doctorsAddressList?.map((attr) => {
      this._doctorsAddressList.push(new AddressForm(attr));
    });
  }

  get _doctorBankDetailList(): any {
    return (this.controls.doctorBankDetailList as FormArray);
  }

  get _doctorInsuranceDetailList(): any {
    return (this.controls.doctorInsuranceDetailList as FormArray);
  }

  get _doctorsVaccinationList(): any {
    return (this.controls.doctorsVaccinationList as FormArray);
  }

  get _doctorsAddressList(): any {
    return (this.controls.doctorsAddressList as FormArray);
  }
}
