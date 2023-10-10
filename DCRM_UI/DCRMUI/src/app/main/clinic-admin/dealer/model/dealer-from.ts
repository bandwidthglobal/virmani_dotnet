import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';
import { BankDetailsForm, BankDetailsModel } from './bank-details-form';
import { MaterialListForm, MaterialListModel } from './material-list-form';
import { User } from 'app/auth/models';

export interface DealerFormModel {
  id?: any;
  user_Id?: any;
  company_Name?: any;
  ownName_1?: any;
  ownName_2?: any;
  phone1?: any;
  phone2?: any;
  email1?: any;
  email2?: any;
  address_R?: any;
  address_O?: any;
  city_R?: any;
  zip_R?: any;
  country_R?: any;
  city_O?: any;
  zip_O?: any;
  country_O?: any;
  staffName_1?: any;
  staffPhone_1?: any;
  staffEmail_1?: any;
  staffName_2?: any;
  staffPhone_2?: any;
  staffEmail_2?: any;
  staffName_3?: any;
  staffPhone_3?: any;
  staffEmail_3?: any;
  staffName_4?: any;
  staffPhone_4?: any;
  staffEmail_4?: any;
  gst_Number?: any;
  pan_Number?: any;
  thumb?: any;
  is_Deleted?: any;
  created_At?: any;
  updated_At?: any;
  dealerMaterialList?: MaterialListModel[];
  dealerBankDetailList?: BankDetailsModel[];
}

export class DealerForm extends FormGroup {
  readonly id = this.get('id') as FormControl;
  readonly user_Id = this.get('user_Id') as FormControl;
  readonly company_Name = this.get('company_Name') as FormControl;
  readonly ownName_1 = this.get('ownName_1') as FormControl;
  readonly ownName_2 = this.get('ownName_2') as FormControl;
  readonly phone1 = this.get('phone1') as FormControl;
  readonly phone2 = this.get('phone2') as FormControl;
  readonly email1 = this.get('email1') as FormControl;
  readonly email2 = this.get('email2') as FormControl;
  readonly address_R = this.get('address_R') as FormControl;
  readonly address_O = this.get('address_O') as FormControl;
  readonly city_R = this.get('city_R') as FormControl;
  readonly zip_R = this.get('zip_R') as FormControl;
  readonly country_R = this.get('country_R') as FormControl;
  readonly city_O = this.get('city_O') as FormControl;
  readonly zip_O = this.get('zip_O') as FormControl;
  readonly country_O = this.get('country_O') as FormControl;
  readonly staffName_1 = this.get('staffName_1') as FormControl;
  readonly staffPhone_1 = this.get('staffPhone_1') as FormControl;
  readonly staffEmail_1 = this.get('staffEmail_1') as FormControl;
  readonly staffName_2 = this.get('staffName_2') as FormControl;
  readonly staffPhone_2 = this.get('staffPhone_2') as FormControl;
  readonly staffEmail_2 = this.get('staffEmail_2') as FormControl;
  readonly staffName_3 = this.get('staffName_3') as FormControl;
  readonly staffPhone_3 = this.get('staffPhone_3') as FormControl;
  readonly staffEmail_3 = this.get('staffEmail_3') as FormControl;
  readonly staffName_4 = this.get('staffName_4') as FormControl;
  readonly staffPhone_4 = this.get('staffPhone_4') as FormControl;
  readonly staffEmail_4 = this.get('staffEmail_4') as FormControl;
  readonly gst_Number = this.get('gst_Number') as FormControl;
  readonly pan_Number = this.get('pan_Number') as FormControl;
  readonly thumb = this.get('thumb') as FormControl;
  readonly is_Deleted = this.get('is_Deleted') as FormControl;
  readonly created_At = this.get('created_At') as FormControl;
  readonly updated_At = this.get('updated_At') as FormControl;

  readonly dealerMaterialList = this.get('dealerMaterialList') as FormArray;
  readonly dealerBankDetailList = this.get('dealerBankDetailList') as FormArray;

  constructor(
    readonly model: DealerFormModel,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    let currentUser: any = <User>JSON.parse(localStorage.getItem('currentUser'));
    super(
      fb.group(
        {
          id: [model?.id],
          user_Id: [currentUser.id],
          company_Name: [model?.company_Name, Validators.required],
          ownName_1: [model?.ownName_1, Validators.required],
          ownName_2: [model?.ownName_2, Validators.required],
          phone1: [model?.phone1, [Validators.minLength(10), Validators.maxLength(10), Validators.required]],
          phone2: [model?.phone2, [Validators.minLength(10), Validators.maxLength(10), Validators.required]],
          email1: [model?.email1, [Validators.email, Validators.required]],
          email2: [model?.email2, [Validators.email, Validators.required]],
          address_R: [model?.address_R, Validators.required],
          address_O: [model?.address_O, Validators.required],
          city_R: [model?.city_R, Validators.required],
          zip_R: [model?.zip_R, [Validators.minLength(6), Validators.maxLength(6), Validators.required]],
          country_R: [model?.country_R, Validators.required],
          city_O: [model?.city_O, Validators.required],
          zip_O: [model?.zip_O, [Validators.minLength(6), Validators.maxLength(6), Validators.required]],
          country_O: [model?.country_O, Validators.required],
          staffName_1: [model?.staffName_1],
          staffPhone_1: [model?.staffPhone_1, [Validators.minLength(10), Validators.maxLength(10)]],
          staffEmail_1: [model?.staffEmail_1, Validators.email],
          staffName_2: [model?.staffName_2],
          staffPhone_2: [model?.staffPhone_2, [Validators.minLength(10), Validators.maxLength(10)]],
          staffEmail_2: [model?.staffEmail_2, Validators.email],
          staffName_3: [model?.staffName_3],
          staffPhone_3: [model?.staffPhone_3, [Validators.minLength(10), Validators.maxLength(10)]],
          staffEmail_3: [model?.staffEmail_3, Validators.email],
          staffName_4: [model?.staffName_4],
          staffPhone_4: [model?.staffPhone_4, [Validators.minLength(10), Validators.maxLength(10)]],
          staffEmail_4: [model?.staffEmail_4, Validators.email],
          gst_Number: [model?.gst_Number, Validators.required],
          pan_Number: [model?.pan_Number, Validators.required],
          thumb: [model?.thumb],
          is_Deleted: [model?.is_Deleted],
          created_At: [model?.created_At],
          updated_At: [model?.updated_At],
          dealerMaterialList: fb.array([]),
          dealerBankDetailList: fb.array([]),
        }, {
        validators: [vMODEL.FormTypeValidation],
      }
      ).controls
    );

    model?.dealerMaterialList?.map((attr) => {
      this._dealerMaterialList.push(new MaterialListForm(attr));
    });

    model?.dealerBankDetailList?.map((attr) => {
      this._dealerBankDetailList.push(new BankDetailsForm(attr));
    });
  }

  get _dealerMaterialList(): any {
    return (this.controls.dealerMaterialList as FormArray);
  }

  get _dealerBankDetailList(): any {
    return (this.controls.dealerBankDetailList as FormArray);
  }
}
