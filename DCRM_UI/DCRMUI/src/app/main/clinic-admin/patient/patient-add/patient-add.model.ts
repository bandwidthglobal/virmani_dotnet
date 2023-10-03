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
    title: string;
    name: string;
    guardian: string;;
    sex: string;
    dob: number;
    age: number;
    weight: number;
    present_address: string;
    permanent_address: string;
    phone1: number;
    phone2: number;
    phone3: number;
    phone4: number;
    email: string;
    email2: string;
    address_R: string;
    city_R: string;
    zip_R: string;
    country_R: string;
    address_O: string;
    city_O: string;
    zip_O: string;
    country_O: string;
    address_Other: string;
    city_Other: string;
    zip_Other: string;
    country_Other: string;
    physician: string;
    referred_by: string;
    doctor_name: string;
    phone_doctor: number;
    relationship_type: string;
    history_allergies: string;
    special_notes: string;
    insurance_loan?: myinsurance_loan_list[];
}

export class myinsurance_loan_list {
    insurance_type: string;
    insurance_name: string;
    insurance_amount: number;
    insurance_balance_spent: number;
    insurance_balance_amount: number;

}
