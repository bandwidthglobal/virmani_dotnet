import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PatientAddService } from 'app/main/clinic-admin/patient/patient-add/patient-add.service';
import { PatientAddModel } from './patient-add.model';


@Component({
  selector: 'app-patient-add',
  templateUrl: './patient-add.component.html',
  styleUrls: ['./patient-add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientAddComponent implements OnInit, OnDestroy {
  public addPatientForm: FormGroup;
  public error: string = '';
  public insuranceLoanItems: any[] = [];

  private _unsubscribeAll: Subject<any>;
  public patient: PatientAddModel = {
    title: '',
    name: '',
    guardian: '',
    sex: '',
    dob: null,
    age: null,
    weight: null,
    present_address: '',
    permanent_address: '',
    phone1: null,
    phone2: null,
    phone3: null,
    phone4: null,
    email: '',
    email2: '',
    address_R: '',
    city_R: '',
    zip_R: '',
    country_R: '',
    address_O: '',
    city_O: '',
    zip_O: '',
    country_O: '',
    address_Other: '',
    city_Other: '',
    zip_Other: '',
    country_Other: '',
    physician: '',
    referred_by: '',
    doctor_name: '',
    phone_doctor: 123,
    relationship_type: '',
    history_allergies: '',
    special_notes: '',
    // insurance_loan: ,
  }

  formData: any = {};

  getBalanceAmount: any = {};

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private patientAddService: PatientAddService
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  onSubmit(): void {
    // Handle form submission here
  }

  items: any[] = [];

  addNewItem() {
    this.items.push({
      type: '',
      name: '',
      amount: null,
      balance_spent: null,
      balance_amount: null
    });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  private initForm(): void {
    this.addPatientForm = this.formBuilder.group({
      title: ['select'],
      name: ['', Validators.required],
      guardian: [''],
      sex: [''],
      dob: [null],
      age: [null],
      weight: [null],
      // Add more form controls as needed
    });
  }


  saveData() {
    // Define the data you want to save (replace with your actual data)
    const dataToSave = {
        'id': 0,
        'name': 'Test1236',
        'Chamber_Id': '',
        'Mr_Number': '',
        'email': 'abc@abc.com',
        'patientContacts': [
            {
                'id': 0,
                'patient_Id': 0,
                "phone1": 8565432126,
                'Address_O': '',
                'Address_Other': '',
                'Address_R': '',
                'City_O': '',
                'City_Other': '',
                'City_R': '',
                'Country_O': '',
                'Country_Other': '',
                'Country_R': '',
                'Doctor_Name': '',
                'Email': '',
                'Email2': '',
                'Medical_History_Allergies': '',
                'Phone': '',
                'Physician': '',
                'Reffered_By': '',
                'Relationship_Type': '',
                'Special_Notes': '',
                'Zip_O': '',
                'Zip_R': '',
            }
            
        ]
      // Define your data properties here
    };

    // Make an HTTP POST request to save the data
    const apiUrl = '${environment.apiUrl}/Patient/Create'; 
    this.patientAddService.savePatient(dataToSave).subscribe(
      (response) => {
        // Handle a successful response from the server
        console.log('Data saved successfully:', response);
        // You can perform additional actions here if needed
      },
      (error) => {
        // Handle any errors that occur during the HTTP request
        console.error('Error saving data:', error);
        // You can display an error message to the user or perform error handling
      }
    );
  }
}
