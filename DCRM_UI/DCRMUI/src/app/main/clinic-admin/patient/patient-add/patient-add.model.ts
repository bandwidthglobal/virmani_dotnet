export class PatientEditModel {
    medicine_Category: string = "";
    medicine_Company: string = "";
    brandname: string = "";
    basic_Salt: string = "";
    form: string = "";
    dosage: string = "";
    dose_No: string = "";
    details: string = "";
    description: string = "";
    safety_Alerts: string = "";
    bactrology: string = "";
    note: string = "";
    medicine_Type: string = "";
    medicine_Category_Id: string = "";
    medicine_Brand_Id: string = "";
}

export class PatientAddModel {
    title: string = "";
    photo: File;
    thumb: string;
    name: string = "";
    guardian: string = "";
    sex: string = "";
    dob: number = null;
    age: number = null;
    weight: number = null;
    mobile: number = null;
    present_address: string = "";
    permanent_address: string = "";
    insurance_loan?: myinsurance_loan_list[];
    patientContacts: patient_contacts[];
}

export class patient_contacts {
    phone1: number = null;
    phone2: number = null;
    phone3: number = null;
    phone4: number = null;
    email: string = "";
    email2: string = "";
    address_R: string = "";
    city_R: string = "";
    zip_R: string = "";
    country_R: string = "";
    address_O: string = "";
    city_O: string = "";
    zip_O: string = "";
    country_O: string = "";
    address_Other: string = "";
    city_Other: string = "";
    zip_Other: number = null;
    country_Other: string = "";
    physician: string = "";
    reffered_By: string = "";
    doctor_Name: string = "";
    phone: string = "";
    relationship_Type: string = "";
    history_Allergies: string = "";
    special_Notes: string = "";
}

export class myinsurance_loan_list {
    insurance_type: string = "";
    insurance_name: string = "";
    insurance_amount: number = null;
    insurance_balance_spent: number = null;
    insurance_balance_amount: number = null;

}
