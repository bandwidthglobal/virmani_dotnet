import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';

export interface WorkDoneFormModel {
    id?: any;
    doctor_Id?: any;
    treatment_Id ?: any;
    estimated_Amount?: any;
    current_Work_Amt?: any;
    discount?: any;
    total_Amt?: any;
    workdone_Status?: any;
}

export class WorkDoneForm extends FormGroup {
    readonly id = this.get('id') as FormControl;
    readonly doctor_Id = this.get('doctor_Id') as FormControl;
    readonly treatment_Id = this.get('treatment_Id') as FormControl;
    readonly estimated_Amount = this.get('estimated_Amount') as FormControl;
    readonly current_Work_Amt = this.get('current_Work_Amt') as FormControl;
    readonly discount = this.get('discount') as FormControl;
    readonly total_Amt = this.get('total_Amt') as FormControl;
    readonly workdone_Status = this.get('workdone_Status') as FormControl;
    constructor(
        readonly model: WorkDoneFormModel,
        readonly fb: FormBuilder = new FormBuilder()
    ) {
        super(
            fb.group(
                {
                    id: [model?.id],
                    doctor_Id: [model?.doctor_Id],
                    treatment_Id: [model?.treatment_Id],
                    estimated_Amount: [model?.estimated_Amount],
                    current_Work_Amt: [model?.current_Work_Amt, Validators.required],
                    discount: [model?.discount],
                    total_Amt: [model?.total_Amt],
                    workdone_Status: [model?.workdone_Status, Validators.required],
                }, {
                validators: [vMODEL.FormTypeValidation],
            }
            ).controls
        );
    }
}
