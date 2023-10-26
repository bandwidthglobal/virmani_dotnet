import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';
import { User } from 'app/auth/models';
import { BankDetailForm, BankDetailFormModel } from './bank-detail-from';
import { InsuranceDetailForm, InsuranceDetailFormModel } from './insurance-detail-from';
import { VaccinationForm, VaccinationFormModel } from './vaccination-from';

export class StaffFormModel {

  id?: any = 0;
  user_Id?: any = 0;
  chamber_Id?: any = 0;
  thumb?: any = '';
  name?: any = '';
  user_Name?: any = '';
  email?: any = '';
  password?: any = '12345678';
  role?: any = '';
  slug?: any = '';
  designation?: any = '';
  status?: any = 1;
  department?: any = 0;
  father?: any = '';
  mother?: any = '';
  gender?: any = '';
  marital_Status?: any = '';
  blood_Group?: any = '';
  dob?: any = '';
  date_Of_Joining?: any = '';
  phone?: any = '';
  qualification?: any = '';
  work_Experience?: any = '';
  specialization?: any = '';
  note?: any = '';
  current_Address?: any = '';
  permanent_Address?: any = '';
  pan?: any = '';
  gst?: any = '';
  is_Deleted?: any = 0;
  created_At?: any = new Date();
  staffBankDetail?: any[] = [];
  staffInsuranceDetail?: any[] = [];
  staffVaccination?: any[] = [];
}

export class StaffForm extends FormGroup {

  readonly id = this.get('id') as FormControl;
  readonly user_Id = this.get('user_Id') as FormControl;
  readonly chamber_Id = this.get('chamber_Id') as FormControl;
  readonly thumb = this.get('thumb') as FormControl;
  readonly name = this.get('name') as FormControl;
  readonly user_Name = this.get('user_Name') as FormControl;
  readonly email = this.get('email') as FormControl;
  readonly password = this.get('password') as FormControl;
  readonly role = this.get('role') as FormControl;
  readonly slug = this.get('slug') as FormControl;
  readonly designation = this.get('designation') as FormControl;
  readonly _status = this.get('status') as FormControl;
  readonly department = this.get('department') as FormControl;
  readonly father = this.get('father') as FormControl;
  readonly mother = this.get('mother') as FormControl;
  readonly gender = this.get('gender') as FormControl;
  readonly marital_Status = this.get('marital_Status') as FormControl;
  readonly blood_Group = this.get('blood_Group') as FormControl;
  readonly dob = this.get('dob') as FormControl;
  readonly date_Of_Joining = this.get('date_Of_Joining') as FormControl;
  readonly phone = this.get('phone') as FormControl;
  readonly qualification = this.get('qualification') as FormControl;
  readonly work_Experience = this.get('work_Experience') as FormControl;
  readonly specialization = this.get('specialization') as FormControl;
  readonly note = this.get('note') as FormControl;
  readonly current_Address = this.get('current_Address') as FormControl;
  readonly permanent_Address = this.get('permanent_Address') as FormControl;
  readonly pan = this.get('pan') as FormControl;
  readonly gst = this.get('gst') as FormControl;
  readonly is_Deleted = this.get('is_Deleted') as FormControl;
  readonly created_At = this.get('created_At') as FormControl;

  readonly staffBankDetail = this.get('staffBankDetail') as FormArray;
  readonly staffInsuranceDetail = this.get('staffInsuranceDetail') as FormArray;
  readonly staffVaccination = this.get('staffVaccination') as FormArray;

  constructor(
    readonly model: StaffFormModel,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    let currentUser: any = <User>JSON.parse(localStorage.getItem('currentUser'));
    super(
      fb.group(
        {
          id: [model?.id],
          user_Id: [model?.user_Id],
          chamber_Id: [model?.chamber_Id],
          thumb: [model?.thumb],
          name: [model?.name, [Validators.required]],
          user_Name: [model?.user_Name],
          email: [model?.email, [Validators.required,Validators.email]],
          password: [model?.password, [Validators.minLength(8)]],
          role: [model?.role],
          slug: [model?.slug, [Validators.required]],
          designation: [model?.designation],
          status: [model?.status],
          department: [model?.department],
          father: [model?.father],
          mother: [model?.mother],
          gender: [model?.gender, [Validators.required]],
          marital_Status: [model?.marital_Status],
          blood_Group: [model?.blood_Group, [Validators.required]],
          dob: [model?.dob, [Validators.required]],
          date_Of_Joining: [model?.date_Of_Joining, [Validators.required]],
          phone: [model?.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
          qualification: [model?.qualification],
          work_Experience: [model?.work_Experience],
          specialization: [model?.specialization],
          note: [model?.note],
          current_Address: [model?.current_Address,[Validators.required]],
          permanent_Address: [model?.permanent_Address],
          pan: [model?.pan],
          gst: [model?.gst],
          is_Deleted: [model?.is_Deleted],
          created_At: [model?.created_At],
          staffBankDetail: fb.array([]),
          staffInsuranceDetail: fb.array([]),
          staffVaccination: fb.array([]),
        }, {
        validators: [vMODEL.FormTypeValidation],
      }
      ).controls
    );

    model?.staffBankDetail?.map((attr) => {
      this._staffBankDetail.push(new BankDetailForm(attr));
    });

    model?.staffInsuranceDetail?.map((attr) => {
      this._staffInsuranceDetail.push(new InsuranceDetailForm(attr));
    });

    model?.staffVaccination?.map((attr) => {
      this._staffVaccination.push(new VaccinationForm(attr));
    });
  }

  get _staffBankDetail(): any {
    return (this.controls.staffBankDetail as FormArray);
  }

  get _staffInsuranceDetail(): any {
    return (this.controls.staffInsuranceDetail as FormArray);
  }

  get _staffVaccination(): any {
    return (this.controls.staffVaccination as FormArray);
  }
}
