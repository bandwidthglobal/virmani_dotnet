import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';

export interface IInsuranceLoanFormModel {
    id?: any;
    patients_Id?: any;
    type?: any;
    name?: any;
    amount?: any;
    balance_Spent?: any;
    balance_Amount?: any;
    created_At?: any;
    updated_At?: any;
}

export class IInsuranceLoanForm extends FormGroup {

    readonly id = this.get('id') as FormControl;
    readonly patients_Id = this.get('patients_Id') as FormControl;
    readonly type = this.get('type') as FormControl;
    readonly name = this.get('name') as FormControl;
    readonly amount = this.get('amount') as FormControl;
    readonly balance_Spent = this.get('balance_Spent') as FormControl;
    readonly balance_Amount = this.get('balance_Amount') as FormControl;
    readonly created_At = this.get('created_At') as FormControl;
    readonly updated_At = this.get('updated_At') as FormControl;

    constructor(readonly model: IInsuranceLoanFormModel, readonly fb: FormBuilder = new FormBuilder()) {
        super(
            fb.group({
                id: [model?.id],
                patients_Id: [model?.patients_Id],
                type: [model?.type, Validators.required],
                name: [model?.name, Validators.required],
                amount: [model?.amount],
                balance_Spent: [model?.balance_Spent],
                balance_Amount: [model?.balance_Amount],
                created_At: [model?.created_At],
                updated_At: [model?.updated_At],
            }).controls
        );
    }
}