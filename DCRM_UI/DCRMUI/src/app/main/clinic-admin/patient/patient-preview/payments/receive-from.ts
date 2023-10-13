import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';

export interface ReceiveFormModel {
    id?: any;
    price?: any;
    payment_Type ?: any;
    description?: any;
    payment_History_Id: any;
}

export class ReceiveForm extends FormGroup {
    readonly id = this.get('id') as FormControl;
    readonly price = this.get('price') as FormControl;
    readonly payment_Type = this.get('payment_Type') as FormControl;
    readonly description = this.get('description') as FormControl;
    readonly payment_History_Id = this.get('payment_History_Id') as FormControl;
    constructor(
        readonly model: ReceiveFormModel,
        readonly fb: FormBuilder = new FormBuilder()
    ) {
        super(
            fb.group(
                {
                    id: [model?.id],
                    price: [model?.price, Validators.required],
                    payment_Type: [model?.payment_Type, Validators.required],
                    payment_History_Id: [model?.payment_History_Id],
                    description: [model?.description],
                }, {
                validators: [vMODEL.FormTypeValidation],
            }
            ).controls
        );
    }
}
