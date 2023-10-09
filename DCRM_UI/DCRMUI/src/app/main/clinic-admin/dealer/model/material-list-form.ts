import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';

export interface MaterialListModel {
    id?: any;
    dealer_Id?: any;
    material_Name?: any;
    material_Cost?: any;
    material_Date?: any;
}

export class MaterialListForm extends FormGroup {

    readonly id = this.get('id') as FormControl;
    readonly dealer_Id = this.get('dealer_Id') as FormControl;
    readonly material_Name = this.get('material_Name') as FormControl;
    readonly material_Cost = this.get('material_Cost') as FormControl;
    readonly material_Date = this.get('material_Date') as FormControl;

    constructor(readonly model: MaterialListModel, readonly fb: FormBuilder = new FormBuilder()) {
        super(
            fb.group({
                id: [model?.id],
                dealer_Id: [model?.dealer_Id],
                material_Name: [model?.material_Name, Validators.required],
                material_Cost: [model?.material_Cost],
                material_Date: [model?.material_Date],
            }).controls
        );
    }
}