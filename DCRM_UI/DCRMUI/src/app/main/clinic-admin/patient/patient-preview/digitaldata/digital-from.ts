import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';
import { User } from 'app/auth/models';

export interface DigitalDataFormModel {
    scan_Name?: any;
    type?: any;
    patient_Id?: 0;
    report?: any;
    report_file?: any;
}
export class DigitalDataForm extends FormGroup {
    readonly patient_Id = this.get('patient_Id') as FormControl;
    readonly type = this.get('type') as FormControl;
    readonly scan_Name = this.get('scan_Name') as FormControl;
    readonly report_File = this.get('report_File') as FormControl;
    constructor(
        readonly model: DigitalDataFormModel,
        readonly fb: FormBuilder = new FormBuilder()
    ) {
        

        super(
            fb.group(
                {
                    
                    scan_Name: [model?.scan_Name, Validators.required],
                    type: [model?.type, Validators.required],
                }, {
                validators: [vMODEL.FormTypeValidation],
            }
            ).controls
        );
    }
}
