import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

export interface BankDetailsModel {
    id?: any;
    dealer_Id?: any;
    bank_Name?: any;
    bank_Account_Number?: any;
    ifsc_Code?: any;
    remarks?: any;
    updated_At?: any;
}

export class BankDetailsForm extends FormGroup {

    readonly id = this.get('id') as FormControl;
    readonly dealer_Id = this.get('dealer_Id') as FormControl;
    readonly bank_Name = this.get('bank_Name') as FormControl;
    readonly bank_Account_Number = this.get('bank_Account_Number') as FormControl;
    readonly ifsc_Code = this.get('ifsc_Code') as FormControl;
    readonly remarks = this.get('remarks') as FormControl;
    readonly updated_At = this.get('updated_At') as FormControl;

    constructor(readonly model: BankDetailsModel, readonly fb: FormBuilder = new FormBuilder()) {
        super(
            fb.group({
                id: [model?.id],
                dealer_Id: [model?.dealer_Id],
                bank_Name: [model?.bank_Name],
                bank_Account_Number: [model?.bank_Account_Number],
                ifsc_Code: [model?.ifsc_Code],
                remarks: [model?.remarks],
                updated_At: [model?.updated_At],
            }).controls
        );
    }
}