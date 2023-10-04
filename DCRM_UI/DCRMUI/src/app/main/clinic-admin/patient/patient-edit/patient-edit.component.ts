import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { repeaterAnimation } from 'app/main/apps/invoice/invoice.animation';
import { PatientEditService } from 'app/main/clinic-admin/patient/patient-edit/patient-edit.service';
import { PatientAddModel } from '../patient-add/patient-add.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-patient-edit',
    templateUrl: './patient-edit.component.html',
    styleUrls: ['./patient-edit.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class PatientEditComponent implements OnInit, OnDestroy {
  editPatientForm: FormGroup;
    // Public
    public url = this.router.url;
    public urlLastValue;
    public apiData;
    public sidebarToggleRef = false;
    public paymentSidebarToggle = false;
    public addPatientForm: UntypedFormGroup;
    public items = [{ itemType: '', itemName: '', itemAmount: '', itemSpent: '', itemBalance: ''}];
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public error = '';
    imagePreviewUrl: string | ArrayBuffer | null = null;
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
    // Private
    private _unsubscribeAll: Subject<any>;
    //private _formBuilder: any;

    /**
     * Constructor
     *
     * @param {Router} router
     * @param {InvoiceEditService} _invoiceEditService
     * @param {CoreSidebarService} _coreSidebarService
     */
    constructor(
        private router: Router,
        private _patientEditService: PatientEditService, private _formBuilder: UntypedFormBuilder, private _route: ActivatedRoute, private _toastrService: ToastrService) {
        this._unsubscribeAll = new Subject();
    }
    addNewItem() {
        this.items.push({
            itemType: '',
            itemName: '',
            itemAmount: '',
            itemBalance: '',
            itemSpent: '',
        });
    }
    deleteItem(id) {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items.indexOf(this.items[i]) === id) {
                this.items.splice(i, 1);
                break;
            }
        }
    }

    
    base64Image: string = "";
    selectedImage: File | null = null;

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

    /**
     * On init
     */
    ngOnInit(): void {

        // this._patientEditService.onMedicinBrandChanged.subscribe(res => (this.medicinBrands = res));
        // this._patientEditService.onMedicinCategoriesChanged.subscribe(res => (this.medicinCategories = res));
        this.addPatientForm = this._formBuilder.group({
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
        this._patientEditService.onPatientEditChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
             this.patient = response;
        });
    }
    get f() {
      return this.addPatientForm.controls;
    }
    onCategorySelected(ob) {

    }
    onBrandSelected(ob) {

    }
    cancel() {
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/patient/list';
        this.router.navigateByUrl(this.returnUrl);
    }
    onSubmit() {
        this.submitted = true;
       
        if (this.addPatientForm.invalid) {
            return;
        }
       
        this.loading = true;
        this._patientEditService
            .update(this.patient)
            .pipe()
            .subscribe(
                data => {
                    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/patient/list';
                    this.router.navigateByUrl(this.returnUrl);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
