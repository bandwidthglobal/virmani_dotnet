import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';

export interface DrugListModel {
    id?: any;
    drug_Name?: any;
}

export class DrugListForm extends FormGroup {

    readonly id = this.get('id') as FormControl;
    readonly drug_Name = this.get('drug_Name') as FormControl;
    constructor(readonly model: DrugListModel, readonly fb: FormBuilder = new FormBuilder()) {
        super(
            fb.group({
                id: [model?.id],
                drug_Name: [model?.drug_Name, Validators.required],
            }).controls
        );
    }
}