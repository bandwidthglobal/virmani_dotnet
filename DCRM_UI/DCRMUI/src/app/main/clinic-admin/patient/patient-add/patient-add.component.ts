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
    public addPatientForm: UntypedFormGroup;
    public error: string = '';
    public insuranceLoanItems: any[] = [];
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    selectedImage: File | null = null;
    imagePreviewUrl: string | ArrayBuffer | null = null;
    formData: any = {};
    getBalanceAmount: any = {};
    private _unsubscribeAll: Subject<any>;
    public patient: PatientAddModel = {
        title: '',
        photo: null,
        name: '',
        guardian: '',
        sex: '',
        dob: null,
        age: null,
        thumb: '',

        weight: null,
        mobile: null,
        present_address: '',
        permanent_address: '',
        patientContacts: [{
            phone1: 0,
            phone2: 0,
            phone3: 0,
            phone4: 0,
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
            zip_Other: 0,
            country_Other: '',
            physician: '',
            reffered_By: '',
            doctor_Name: '',
            phone: '',
            relationship_Type: '',
            history_Allergies: '',
            special_Notes: '',
        }],
        insurance_loan: [],
    }
    files: any;
    base64Image: string = "";
    convertToBase64(event: any) {
        const file = event.target.files[0];
        this.files = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.base64Image = e.target.result;
            };
            reader.onload = (e: any) => {
                this.imagePreviewUrl = e.target.result;
                this.base64Image = e.target.result;
            };
            reader.readAsDataURL(file);
            //reader.readAsDataURL(this.selectedImage);
        }
    }



    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private httpClient: HttpClient,
        private http: HttpClient,
        private patientAddService: PatientAddService, private _formBuilder: UntypedFormBuilder, private _route: ActivatedRoute, private _toastrService: ToastrService) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {

        this.addPatientForm = this._formBuilder.group({
            name: ['', Validators.required],
            phone1: ['0', Validators.required]
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
        if (this.addPatientForm.invalid) {
            return;
        }
        if (this.base64Image != undefined && this.base64Image != '') {
            this.patient.thumb = this.base64Image.split(',')[1];
        }
        this.loading = true;
        this.patientAddService
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

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
};