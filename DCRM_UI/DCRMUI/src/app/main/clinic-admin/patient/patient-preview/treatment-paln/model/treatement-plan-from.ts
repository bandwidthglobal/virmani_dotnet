import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';

export class ITreatmentPlanFormModel {

  id?: any = 0;
  date?: any = new Date();
  doctor?: any = 0;
  job?: any = '';
  jobId?: any = 0;
  type?: any = '';
  status?: any = 0;
  patientId?: any = 0;
  amount?: any = 0;
  courtesy?: any = 0;
  estimated_Amount?: any = 0;
  printToothName?: any = '';
  individualToothWrk?: any = '';
  completedDate?: any = '';
  sittingStatus?: any = 0;
  treatmentStatus?: any = 0;
  teeth_id?: any = '';
  milk_teeth?: any = false;
  teeth_Number_Note?: any = '';
  toth_Note?: any = '';
  createdAt?: any = new Date();
  updatedAt?: any = new Date();
  note_Status?: any = '';
  ord?: any = '';
  rmd?: any = '';
  treatment_Notes?: any = '';
  estimated_total?: any = 0;
}

export class ITreatmentPlanForm extends FormGroup {

  readonly id = this.get('id') as FormControl;
  readonly date = this.get('date') as FormControl;
  readonly doctor = this.get('doctor') as FormControl;
  readonly job = this.get('job') as FormControl;
  readonly jobId = this.get('jobId') as FormControl;
  readonly type = this.get('type') as FormControl;
  readonly _status = this.get('status') as FormControl;
  readonly patientId = this.get('patientId') as FormControl;
  readonly amount = this.get('amount') as FormControl;
  readonly courtesy = this.get('courtesy') as FormControl;
  readonly estimated_Amount = this.get('estimated_Amount') as FormControl;
  readonly printToothName = this.get('printToothName') as FormControl;
  readonly individualToothWrk = this.get('individualToothWrk') as FormControl;
  readonly completedDate = this.get('completedDate') as FormControl;
  readonly sittingStatus = this.get('sittingStatus') as FormControl;
  readonly treatmentStatus = this.get('treatmentStatus') as FormControl;
  readonly teeth_id = this.get('teeth_id') as FormControl;
  readonly milk_teeth = this.get('milk_teeth') as FormControl;
  readonly teeth_Number_Note = this.get('teeth_Number_Note') as FormControl;
  readonly toth_Note = this.get('toth_Note') as FormControl;
  readonly createdAt = this.get('createdAt') as FormControl;
  readonly updatedAt = this.get('updatedAt') as FormControl;
  readonly note_Status = this.get('note_Status') as FormControl;
  readonly ord = this.get('ord') as FormControl;
  readonly rmd = this.get('rmd') as FormControl;
  readonly treatment_Notes = this.get('treatment_Notes') as FormControl;
  readonly estimated_total = this.get('treatment_Notes') as FormControl;

  constructor(
    readonly model: ITreatmentPlanFormModel,
    readonly fb: FormBuilder = new FormBuilder()
  ) {
    super(
      fb.group(
        {
          id: [model?.id],
          date: [model?.date],
          doctor: [model?.doctor],
          job: [model?.job, [Validators.required]],
          jobId: [model?.jobId],
          type: [model?.type, [Validators.required]],
          status: [model?.status],
          patientId: [model?.patientId, [Validators.required]],
          amount: [model?.amount],
          courtesy: [model?.courtesy],
          estimated_Amount: [model?.estimated_Amount],
          printToothName: [model?.printToothName],
          individualToothWrk: [model?.individualToothWrk],
          completedDate: [model?.completedDate],
          sittingStatus: [model?.sittingStatus],
          treatmentStatus: [model?.treatmentStatus],
          teeth_id: [model?.teeth_id],
          milk_teeth: [model?.milk_teeth],
          teeth_Number_Note: [model?.teeth_Number_Note],
          toth_Note: [model?.toth_Note],
          createdAt: [model?.createdAt],
          updatedAt: [model?.updatedAt],
          note_Status: [model?.note_Status],
          ord: [model?.ord],
          rmd: [model?.rmd],
          treatment_Notes: [model?.treatment_Notes, [Validators.required]],
          estimated_total: [model?.estimated_total],
        }, {
        validators: [vMODEL.FormTypeValidation],
      }
      ).controls
    );
  }
}