import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PatientAddService } from 'app/main/clinic-admin/patient/patient-add/patient-add.service';
import { PatientAddModel } from './patient-add.model';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

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
  public loading = false;
  public submitted = false;
  public returnUrl: string;
  selectedImage: File | null = null;
  imagePreviewUrl: string | ArrayBuffer | null = null;

  private _unsubscribeAll: Subject<any>;
  public patient: PatientAddModel = {
    title: '',
    photo: null,
    name: '',
    guardian: '',
    sex: '',
    dob: null,
    age: null,
    weight: null,
    mobile: null,
    present_address: '',
    permanent_address: '',
    patientContacts: [{
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
      zip_Other: null,
      country_Other: '',
      physician: '',
      reffered_By: '',
      doctor_Name: '',
      phone: null,
      relationship_Type: '',
      history_Allergies: '',
      special_Notes: '',  
    }],
    insurance_loan: [],
  }

  base64Image: string = "";

  // Define the convertToBase64 method
  convertToBase64(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.base64Image = e.target.result;
      };
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
      reader.readAsDataURL(this.selectedImage);
    }
  }

  formData: any = {};

  getBalanceAmount: any = {};

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private http: HttpClient,
    private patientAddService: PatientAddService, private _formBuilder: UntypedFormBuilder, private _route: ActivatedRoute, private _toastrService: ToastrService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.addPatientForm = this.formBuilder.group({
      title: ['select'],
      name: ['', Validators.required],
      guardian: [''],
      sex: [''],
      dob: [null],
      age: [null],
      weight: [null],
      mobile: [null],
      present_address: [''],
      permanent_address: [''],
      patientContacts: {
        phone1: [null, Validators.required],
        phone2: [null],
        phone3: [null],
        phone4: [null],
        email: [''],
        email2: [''],
        address_R: [''],
        city_R: [''],
        zip_R: [''],
        country_R: [''],
        address_O: [''],
        city_O: [''],
        zip_O: [''],
        country_O: [''],
        address_Other: [''],
        city_Other: [''],
        zip_Other: [''],
        country_Other: [''],
        physician: [''],
        referred_by: [''],
        doctor_name: [''],
        phone_doctor: [null],
        relationship_type: [''],
        history_allergies: [''],
        special_Notes: [''],
      }
      
    });
  }

  get f() {
    return this.addPatientForm.controls;
  }

  cancel() {
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/patient/list';
    this.router.navigateByUrl(this.returnUrl);
  } 

  onSubmit() {
    this.submitted = true;
    debugger;
    const patientData = {
      name: this.addPatientForm.get('name').value,
      patientContacts: [{
        phone1: this.addPatientForm.get('patientContacts').value.phone1,
        // phone1: 6755463,
      }]
    }
    
    console.log(patientData);


        if (this.addPatientForm.invalid) {
            return;
        }
 
        this.loading = true;
        this.patientAddService
          .update(patientData)
          .pipe()
          // .subscribe(
          //     data => {
          //         this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/patient/list';
          //         this.router.navigateByUrl(this.returnUrl);
          //     },
          //     error => {
          //         this.error = error;
          //         this.loading = false;
          //     }
          // );

          this.patientAddService.update(patientData).subscribe(
            (response) => {
              // Handle the response here
              console.log('Patient data updated:', response);
              // Redirect or perform other actions as needed
              this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/patient/list';
              this.router.navigateByUrl(this.returnUrl);
            },
            (error) => {
              // Handle errors here
              console.error('Error updating patient data:', error);
              this.error = error;
              this.loading = false;
            }
          ); 
            
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

  // saveData() {
  //   const dataToSave = {
  //       'id': 0,
  //       'name': this.patient.name || '', 
  //       'guardian': this.patient.guardian || '',
  //       'sex': this.patient.sex || '',
  //       'dob': this.patient.dob || '',
  //       'age': this.patient.age || '',
  //       'weight': this.patient.weight || '',
  //       'mobile': this.patient.mobile || '',
  //       'present_address': this.patient.present_address || '',
  //       'permanent_address': this.patient.permanent_address || '',
  //       'patientContacts': this.patient.patientContacts.map(contact => ({
  //           'id': 0,
  //           'patient_Id': 0,
  //           'phone1': contact.phone1 || 0,
  //           'Address_O': contact.address_O || '',
  //           'Address_Other': contact.address_Other || '',
  //           'Address_R': contact.address_R || '',
  //           'City_O': contact.city_O || '',
  //           'City_Other': contact.city_Other || '',
  //           'City_R': contact.city_R || '',
  //           'Country_O': contact.country_O || '',
  //           'Country_Other': contact.country_Other || '',
  //           'Country_R': contact.country_R || '',
  //           'Doctor_Name': contact.doctor_Name || '',
  //           'Email': contact.email || '',
  //           'Email2': contact.email2 || '',
  //           'Medical_History_Allergies': contact.history_Allergies || '',
  //           'Phone': contact.phone || '',
  //           'Physician': contact.physician || '',
  //           'Reffered_By': contact.reffered_By || '',
  //           'Relationship_Type': contact.relationship_Type || '',
  //           'Special_Notes': contact.special_Notes || '',
  //           'Zip_O': contact.zip_O || '',
  //           'Zip_R': contact.zip_R || '',
  //       }))
  //   };

  //   // Make an HTTP POST request to save the data
  //   const apiUrl = '${environment.apiUrl}/Patient/Create'; 
  //   this.patientAddService.savePatient(dataToSave).subscribe(
  //       (response) => {
  //           // Handle the response here
  //           console.log('Data saved:', response);
  //       },
  //       (error) => {
  //           // Handle errors here
  //           console.error('Error:', error);
  //       }
  //   )
  // }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
};