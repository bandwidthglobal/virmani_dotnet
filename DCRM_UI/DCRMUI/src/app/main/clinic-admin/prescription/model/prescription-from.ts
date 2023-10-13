import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';
import { DrugListForm, DrugListModel } from './drug-list-form';
import { User } from 'app/auth/models';

export interface PrescriptionFormModel {
    id?: any;
    user_Id?: any;
    chamber_Id?: any;
    patient_Id?: any;
    drug_Id?: any;
    next_Duration?: any;
    next_Time?: any;
    check_Report?: any;
    feedback?: any;
    created_At?: any;
    drugList?: DrugListModel[];
}

export class PrescriptionForm extends FormGroup {
    readonly id = this.get('id') as FormControl;
    readonly user_Id = this.get('user_Id') as FormControl;
    readonly chamber_Id = this.get('chamber_Id') as FormControl;
    readonly patient_Id = this.get('patient_Id') as FormControl;
    readonly drug_Id = this.get('drug_Id') as FormControl;
    readonly next_Duration = this.get('next_Duration') as FormControl;
    readonly next_Time = this.get('next_Time') as FormControl;
    readonly check_Report = this.get('check_Report') as FormControl;
    readonly feedback = this.get('feedback') as FormControl;
    readonly created_At = this.get('created_At') as FormControl;
    readonly drugList = this.get('druglList') as FormArray;
    constructor(
        readonly model: PrescriptionFormModel,
        readonly fb: FormBuilder = new FormBuilder()
    ) {
        let currentUser: any = <User>JSON.parse(localStorage.getItem('currentUser'));
        super(
            fb.group(
                {
                    id: [model?.id],
                    user_Id: [currentUser.id],
                    drug_Id: [model?.drug_Id, Validators.required],
                    patient_Id: [model?.patient_Id, Validators.required],
                    next_Time: [model?.next_Time, Validators.required],
                    next_Duration: [model?.next_Duration, Validators.required],
                    drugList: fb.array([])
                }, {
                validators: [vMODEL.FormTypeValidation],
            }
            ).controls
        );

        model?.drugList?.map((attr) => {
            this._drugList.push(new DrugListForm(attr));
        });
    }

    get _drugList(): any {
        return (this.controls.dealerMaterialList as FormArray);
    }
}
