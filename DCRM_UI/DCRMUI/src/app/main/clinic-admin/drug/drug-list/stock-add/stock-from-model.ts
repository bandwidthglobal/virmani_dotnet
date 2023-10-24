import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';
export interface StockFormModel {
    id?: any;
    medicine_Id?: any;
    inward_Date?: any;
    expiry_Date?: any;
    batch_No?: any;
    packing_Qty?: any;
    purchase_Rate_Packing?: any;
    quantity?: any;
    mrp?: any;
    sale_Rate?: any;
    available_Quantity?: any;
    amount?: any;
    is_Deleted?: any;
    created_At?: any;
    updated_At?: any;
}

export class StockForm extends FormGroup {
    readonly id = this.get('id') as FormControl;
    readonly medicine_Id = this.get('medicine_Id') as FormControl;
    readonly inward_Date = this.get('inward_Date') as FormControl;
    readonly expiry_Date = this.get('expiry_Date') as FormControl;
    readonly batch_No = this.get('batch_No') as FormControl;
    readonly amount = this.get('amount') as FormControl;
    readonly packing_Qty = this.get('packing_Qty') as FormControl;
    readonly purchase_Rate_Packing = this.get('purchase_Rate_Packing') as FormControl;
    readonly quantity = this.get('quantity') as FormControl;
    readonly mrp = this.get('mrp') as FormControl;
    readonly sale_Rate = this.get('sale_Rate') as FormControl;
    readonly available_Quantity = this.get('available_Quantity') as FormControl;
    readonly is_Deleted = this.get('is_Deleted') as FormControl;
    readonly created_At = this.get('created_At') as FormControl;
    readonly updated_At = this.get('updated_At') as FormControl;
    constructor(
        readonly model: StockFormModel,
        readonly fb: FormBuilder = new FormBuilder()
    ) 
     {
        super(
            fb.group(
                {
                    id: [model?.id],
                    medicine_Id: [model?.medicine_Id],
                    inward_Date: [model?.inward_Date, Validators.required],
                    expiry_Date: [model?.expiry_Date, Validators.required],
                    batch_No: [model?.batch_No, [Validators.required]],
                    packing_Qty: [model?.packing_Qty, [Validators.required]],
                    mrp: [model?.mrp],
                    sale_Rate: [model?.sale_Rate, [Validators.required]],
                }, {
                validators: [vMODEL.FormTypeValidation],
            }
            ).controls
        );
    }
}
