import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as vMODEL from './validation';

export interface IContactsFormModel {
    id?: any;
    patient_Id?: any;
    phone1?: any;
    phone2?: any;
    phone3?: any;
    phone4?: any;
    email?: any;
    email2?: any;
    address_R?: any;
    city_R?: any;
    zip_R?: any;
    country_R?: any;
    address_O?: any;
    city_O?: any;
    zip_O?: any;
    country_O?: any;
    address_Other?: any;
    city_Other?: any;
    zip_Other?: any;
    country_Other?: any;
    physician?: any;
    reffered_By?: any;
    doctor_Name?: any;
    phone?: any;
    relationship_Type?: any;
    medical_History_Allergies?: any;
    special_Notes?: any;
    created_At?: any;
    updated_At?: any;
}

export class IContactsForm extends FormGroup {

    readonly id = this.get('id') as FormControl;
    readonly patient_Id = this.get('patient_Id') as FormControl;
    readonly phone1 = this.get('phone1') as FormControl;
    readonly phone2 = this.get('phone2') as FormControl;
    readonly phone3 = this.get('phone3') as FormControl;
    readonly phone4 = this.get('phone4') as FormControl;
    readonly email = this.get('email') as FormControl;
    readonly email2 = this.get('email2') as FormControl;
    readonly address_R = this.get('address_R') as FormControl;
    readonly city_R = this.get('city_R') as FormControl;
    readonly zip_R = this.get('zip_R') as FormControl;
    readonly country_R = this.get('country_R') as FormControl;
    readonly address_O = this.get('address_O') as FormControl;
    readonly city_O = this.get('city_O') as FormControl;
    readonly zip_O = this.get('zip_O') as FormControl;
    readonly country_O = this.get('country_O') as FormControl;
    readonly address_Other = this.get('address_Other') as FormControl;
    readonly city_Other = this.get('city_Other') as FormControl;
    readonly zip_Other = this.get('zip_Other') as FormControl;
    readonly country_Other = this.get('country_Other') as FormControl;
    readonly physician = this.get('physician') as FormControl;
    readonly reffered_By = this.get('reffered_By') as FormControl;
    readonly doctor_Name = this.get('doctor_Name') as FormControl;
    readonly phone = this.get('phone') as FormControl;
    readonly relationship_Type = this.get('relationship_Type') as FormControl;
    readonly medical_History_Allergies = this.get('medical_History_Allergies') as FormControl;
    readonly special_Notes = this.get('special_Notes') as FormControl;
    readonly created_At = this.get('created_At') as FormControl;
    readonly updated_At = this.get('updated_At') as FormControl;

    constructor(readonly model: IContactsFormModel, readonly fb: FormBuilder = new FormBuilder()) {
        super(
            fb.group({
                id: [model?.id],
                patient_Id: [model?.patient_Id],
                phone1: [model?.phone1, [Validators.minLength(10), Validators.maxLength(10), Validators.required]],
                phone2: [model?.phone2, [Validators.minLength(10), Validators.maxLength(10)]],
                phone3: [model?.phone3, [Validators.minLength(10), Validators.maxLength(10)]],
                phone4: [model?.phone4, [Validators.minLength(10), Validators.maxLength(10)]],
                email: [model?.email, Validators.email],
                email2: [model?.email2, Validators.email],
                address_R: [model?.address_R],
                city_R: [model?.city_R],
                zip_R: [model?.zip_R, [Validators.minLength(6), Validators.maxLength(6)]],
                country_R: [model?.country_R],
                address_O: [model?.address_O],
                city_O: [model?.city_O],
                zip_O: [model?.zip_O, [Validators.minLength(6), Validators.maxLength(6)]],
                country_O: [model?.country_O],
                address_Other: [model?.address_Other],
                city_Other: [model?.city_Other],
                zip_Other: [model?.zip_Other, [Validators.minLength(6), Validators.maxLength(6)]],
                country_Other: [model?.country_Other],
                physician: [model?.physician],
                reffered_By: [model?.reffered_By],
                doctor_Name: [model?.doctor_Name],
                phone: [model?.phone, [Validators.minLength(10), Validators.maxLength(10)]],
                relationship_Type: [model?.relationship_Type],
                medical_History_Allergies: [model?.medical_History_Allergies],
                special_Notes: [model?.special_Notes],
                created_At: [model?.created_At],
                updated_At: [model?.updated_At],
            }).controls
        );
    }
}