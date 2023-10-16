import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';
import { User } from 'app/auth/models';

export class IAppointmentFormModel {
  currentUser: any = <User>JSON.parse(localStorage.getItem('currentUser'));
  id?: any = 0;
  chamber_Id?: any = 0;
  user_Id?: any = this.currentUser.id;
  doctor_Id?: any = 0;
  doctor_Name?: any;
  chair?: any;
  number_Of_Slot?: any;
  slot_Time?: any = '15';
  cause?: any;
  extra_Notes?: any;
  prescription_Id?: any = 0;
  date?: any = new Date();
  start_Time?: any;
  end_Time?: any;
  meeting_Notes?: any;
  files?: any;
  type?: any = 'Offline';
  p_type?: any = 'Old Patient';
  serial_Id?: any = 0;
  status?: any = 0;
  appointment_Status?: any = 0;
  is_Start?: any = 0;
  is_Delete?: any = 0;
  created_At?: any = new Date();

  patient_Id?: any;
  patient_name?: any;
  email?: any;
  phone?: any;
  age?: any;
  weight?: any;
  gender?: any;
}

export class IAppointmentForm extends FormGroup {
  readonly id = this.get('id') as FormControl;
  readonly chamber_Id = this.get('chamber_Id') as FormControl;
  readonly user_Id = this.get('user_Id') as FormControl;
  readonly doctor_Id = this.get('doctor_Id') as FormControl;
  readonly doctor_Name = this.get('doctor_Name') as FormControl;
  readonly chair = this.get('chair') as FormControl;
  readonly number_Of_Slot = this.get('number_Of_Slot') as FormControl;
  readonly slot_Time = this.get('slot_Time') as FormControl;
  readonly cause = this.get('cause') as FormControl;
  readonly extra_Notes = this.get('extra_Notes') as FormControl;
  readonly prescription_Id = this.get('prescription_Id') as FormControl;
  readonly date = this.get('date') as FormControl;
  readonly start_Time = this.get('start_Time') as FormControl;
  readonly end_Time = this.get('end_Time') as FormControl;
  readonly meeting_Notes = this.get('meeting_Notes') as FormControl;
  readonly files = this.get('files') as FormControl;
  readonly type = this.get('type') as FormControl;
  readonly p_type = this.get('type') as FormControl;
  readonly serial_Id = this.get('serial_Id') as FormControl;
  readonly _status = this.get('status') as FormControl;
  readonly appointment_Status = this.get('appointment_Status') as FormControl;
  readonly is_Start = this.get('is_Start') as FormControl;
  readonly is_Delete = this.get('is_Delete') as FormControl;
  readonly created_At = this.get('created_At') as FormControl;

  readonly patient_Id = this.get('patient_Id') as FormControl;
  readonly patient_name = this.get('patient_name') as FormControl;
  readonly email = this.get('email') as FormControl;
  readonly phone = this.get('phone') as FormControl;
  readonly age = this.get('age') as FormControl;
  readonly weight = this.get('weight') as FormControl;
  readonly gender = this.get('gender') as FormControl;

  constructor(
    readonly model: IAppointmentFormModel,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group(
        {
          id: [model?.id],
          chamber_Id: [model?.chamber_Id],
          user_Id: [model?.user_Id],
          doctor_Id: [model?.doctor_Id, [Validators.required]],
          doctor_Name: [model?.doctor_Name],
          chair: [model?.chair, [Validators.required]],
          number_Of_Slot: [model?.number_Of_Slot],
          slot_Time: [model?.slot_Time, [Validators.required]],
          cause: [model?.cause],
          extra_Notes: [model?.extra_Notes],
          prescription_Id: [model?.prescription_Id],
          date: [model?.date, [Validators.required]],
          start_Time: [model?.start_Time, [Validators.required]],
          end_Time: [model?.end_Time],
          meeting_Notes: [model?.meeting_Notes],
          files: [model?.files],
          type: [model?.type],
          p_type: [model?.p_type],
          serial_Id: [model?.serial_Id],
          status: [model?.status],
          appointment_Status: [model?.appointment_Status],
          is_Start: [model?.is_Start],
          is_Delete: [model?.is_Delete],
          created_At: [model?.created_At],

          patient_Id: [model?.patient_Id],
          patient_name: [model?.patient_name],
          email: [model?.email, [Validators.email]],
          phone: [model?.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
          age: [model?.age],
          weight: [model?.weight],
          gender: [model?.gender],
        }, {
        validators: [vMODEL.FormTypeValidation],
      }
      ).controls
    );
  }
}