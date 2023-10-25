import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';
export interface BadStockFormModel {
    id?: any;
    pharmacy_Id?: any;
    outward_Date?: any;
    expiry_Date?: any;
    batch_No?: any;
    quantity?: any;
    note?: any;
    is_Deleted?: any;
}

export class BadStockForm extends FormGroup {
    readonly id = this.get('id') as FormControl;
    readonly pharmacy_Id = this.get('pharmacy_Id') as FormControl;
    readonly outward_Date = this.get('outward_Date') as FormControl;
    public expiry_Date = this.get('expiry_Date') as FormControl;
    readonly batch_No = this.get('batch_No') as FormControl;
    readonly quantity = this.get('quantity') as FormControl;
    readonly note = this.get('note') as FormControl;
    readonly is_Deleted = this.get('is_Deleted') as FormControl;
    constructor(
        readonly model: BadStockFormModel,
        readonly fb: FormBuilder = new FormBuilder()
    ) {
        super(
            fb.group(
                {
                    id: [model?.id],
                    batch_No: [model?.batch_No, [Validators.required]],
                    pharmacy_Id: [model?.pharmacy_Id],
                    outward_Date: [model?.outward_Date, Validators.required],
                    expiry_Date: [model?.expiry_Date, Validators.required],
                    quantity: [model?.quantity, [Validators.required]],
                    note: [model?.note],

                }, {
                validators: [vMODEL.FormTypeValidation],
            }
            ).controls
        );
    }
}
