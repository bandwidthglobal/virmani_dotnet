import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';
import { DrugListForm, DrugListModel } from './drug-list-form';
import { User } from 'app/auth/models';

export interface DrugFormModel {
    id?: any;
    medicine_Category?: any;
    medicine_Company?: any;
    brandname?: any;
    basic_Salt?: any;
    form?: any;
    dosage?: any;
    dose_No?: any;
    details?: any;
    description?: any;
    safety_Alerts?: any;
    bactrology?: any;
    note?: any;
    medicine_Type?: any;
    medicine_Category_Id?: any;
    medicine_Brand_Id?: any;
}

export class DrugForm extends FormGroup {
    readonly id = this.get('id') as FormControl;
    readonly user_Id = this.get('user_Id') as FormControl;
    readonly medicine_Category = this.get('medicine_Category') as FormControl;
    readonly medicine_Company = this.get('medicine_Company') as FormControl;
    readonly form = this.get('form') as FormControl;
    readonly dosage = this.get('dosage') as FormControl;
    readonly dose_No = this.get('dose_No') as FormControl;
    readonly details = this.get('details') as FormControl;
    readonly description = this.get('description') as FormControl;
    readonly safety_Alerts = this.get('safety_Alerts') as FormControl;
    readonly bactrology = this.get('bactrology') as FormArray;
    readonly note = this.get('note') as FormControl;
    readonly medicine_Type = this.get('medicine_Type') as FormControl;
    readonly medicine_Category_Id = this.get('medicine_Category_Id') as FormControl;
    readonly medicine_Brand_Id = this.get('medicine_Brand_Id') as FormArray;
    constructor(
        readonly model: DrugFormModel,
        readonly fb: FormBuilder = new FormBuilder()
    ) {
        let currentUser: any = <User>JSON.parse(localStorage.getItem('currentUser'));
        super(
            fb.group(
                {
                    id: [model?.id],
                    user_Id: [currentUser.id],
                    medicine_Company: [model?.medicine_Company, Validators.required],
                    medicine_Category_Id: [model?.medicine_Category_Id, Validators.required],
                    medicine_Category: [model?.medicine_Category],
                    form: [model?.form],
                    dosage: [model?.dosage],
                    dose_No: [model?.dose_No],
                    details: [model?.details],
                    description: [model?.description],
                    safety_Alerts: [model?.safety_Alerts],
                    bactrology: [model?.bactrology],
                    note: [model?.note],
                    medicine_Type: [model?.medicine_Type],
                    medicine_Brand_Id: [model?.medicine_Brand_Id],
                }, {
                validators: [vMODEL.FormTypeValidation],
            }
            ).controls
        );
    }
}
