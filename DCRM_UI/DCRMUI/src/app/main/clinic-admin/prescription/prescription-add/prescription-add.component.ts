import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { repeaterAnimation } from 'app/main/clinic-admin/prescription/prescription.animation';
import { PrescriptionAddService } from 'app/main/clinic-admin/prescription/prescription-add/prescription-add.service';
import { PrescriptionAddModel } from '../prescription-add/prescription-add.model';
import { CommonValidationService } from 'app/shared-common/services/common-validation.service';
import { FormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { validationMessages } from '../../../../shared-common/pipes/error-message';
import { PrescriptionForm, PrescriptionFormModel } from '../model/prescription-from';
import { DrugListForm, DrugListModel } from '../model/drug-list-form';
import { IPatientForm, IPatientFormModel } from "../../patient/model/patient-from";
import { IContactsForm, IContactsFormModel } from "../../patient/model/contacts-form";
import { DrugForm, DrugFormModel } from "../model/drug-from";
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Component({
    selector: 'app-prescription-add',
    templateUrl: './prescription-add.component.html',
    styleUrls: ['./prescription-add.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class PrescriptionAddComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any>;
    loading: boolean = false;
    submitted: boolean = false;
    error: any = '';
    patientList: any;
    drugList: any;
    drugRowGroup: any;
    medicinCategoryList: any;
    messages = validationMessages;
    formData?: PrescriptionForm;
    patientFromData?: IPatientForm;
    drugFromData?: DrugForm;
    @Input() FormInput?: PrescriptionFormModel = {
        id: 0,
        user_Id: 0,
        created_At: new Date(),
        patient_Id: '',
        drug_Id: '',
        next_Duration: '',
        next_Time: '',
    };
    @Input() PatientFormInput?: IPatientFormModel = {
        id: 0,
        user_Id: 0,
        created_At: new Date(),
        title: ' ',
        sex: ''
    };
    @Input() DrugFormInput?: DrugFormModel = {
        id: 0,
        medicine_Category_Id: ''
    };
    medicine_Type?: any;
    medicine_Company?: any;
    form?: any;
    dosage?: any;
    details?: any;
    description: any;
    userName: any;
    userEmail: any;
    chamberName: any;
    chamberTitle: any;
    drugIdes: any = [];
    drugId: any = '';
    chamber_Id: any = '';
    @Input() FormAction?: 'add' | 'edit' = 'add';
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('patientModal', { static: false }) patientModal: ElementRef;
    elm: HTMLElement;
    @ViewChild('drugModal', { static: false }) drugModal: ElementRef;
    elm1: HTMLElement;
    drugDetails1: any = [{ index: '', id: '', medicine_Type: '', medicine_Company: '', form: '', dosage: '', description: '', details: '' }];
    public drugItems = [{ id: '', medicine_Type: '', medicine_Company: '', form: '', dosage: '', description: '', details: '' }];
    public drugitem = {
        id: '', medicine_Type: '', medicine_Company: '', form: '', dosage: '', description: '', details: ''
    };
    /**
     * Constructor
     *
     * @param {Router} router
     * @param {InvoiceEditService} _invoiceEditService
     * @param {CoreSidebarService} _coreSidebarService
     */
    constructor(
        private router: Router,
        private _prescriptionAddService: PrescriptionAddService, private _formBuilder: UntypedFormBuilder,
        private _router: Router, private _toastrService: ToastrService, private _commonValidationService: CommonValidationService) {
        this._unsubscribeAll = new Subject();
    }


    /**
     * On init
     */
    ngOnInit(): void {
        this.getUserChamber();
        this.getPatients();
        this.getDrugs();
        this.formData = new PrescriptionForm(this.FormInput);
        this.patientFromData = new IPatientForm(this.PatientFormInput);
        this.drugFromData = new DrugForm(this.DrugFormInput);
    }
    ngAfterViewInit(): void {
        this.elm = this.patientModal.nativeElement as HTMLElement;
        this.elm1 = this.drugModal.nativeElement as HTMLElement;
    }
    addDrugList(): void {
        const obj: DrugListModel = {
            id: 0,
            drug_Name: null,
        };
        const control = <FormArray>this.formData.controls['drugList'];
        control.push(new DrugListForm(obj));
    }
    getUserChamber() {
        this._prescriptionAddService.getUserChamber().subscribe(resp => {
            if (resp != undefined) {
                debugger;
                this.userName = resp.name;
                this.userEmail = resp.email;
                this.chamberName = resp.chamberName;
                this.chamberTitle = resp.chamberTitle;
                this.chamber_Id = resp.chamber_Id;
            }
        });

    }
    removeDrugList(idx): void {
        const control = <FormArray>this.formData.controls['drugList'];
        control.removeAt(idx);
    }

    addPatient() {
        this.elm.classList.add('show');
        this.elm.style.width = '100vw';
    }
    addDrug() {
        this.getDrugCategories();
        this.elm1.classList.add('show');
        this.elm1.style.width = '100vw';
    }
    getDrugDetails(id) {
        this.drugId = id;
        var drugDetails = this.drugList.find(x => x.id == id);
        if (drugDetails != undefined) {
            this.medicine_Type = drugDetails.medicine_Type;
            this.medicine_Company = drugDetails.medicine_Company;
            this.form = drugDetails.form;
            this.dosage = drugDetails.dosage;
            this.details = drugDetails.details;
            this.description = drugDetails.description;
        }

    }

    getDrugId(id, index) {
        var drugDetails1 = this.drugList.find(x => x.id == id);
        if (drugDetails1 != undefined) {
            this.drugIdes.push(id);

            this.drugDetails1.push({
                id: id,
                index: index,
                medicine_Company: drugDetails1.medicine_Type,
                medicine_Type: drugDetails1.medicine_Company,
                form: drugDetails1.form,
                description: drugDetails1.dosage,
                details: drugDetails1.details,
                dosage: drugDetails1.description
            });
        }
        else {
            this.drugIdes.splice(index, 1);
        }
    }

    getPatients() {
        this._prescriptionAddService.getPatients().subscribe(resp => {
            this.patientList = resp;
        });
    }
    getDrugs() {
        this._prescriptionAddService.getDrugs().subscribe(resp => {
            this.drugList = resp;
        });
    }
    getDrugCategories() {
        this._prescriptionAddService.getDrugCategories().subscribe(resp => {
            this.medicinCategoryList = resp;
        });
    }
    cancel() {
        //this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/drug/list';
        //this.router.navigateByUrl(this.returnUrl);
    }
    saveForm() {
        this.submitted = true;
        var drugIds = this.drugDetails1;
        var ids = '';
        if (this.drugId != '') {
            ids = this.drugId;
        }
        for (let index = 0; index < drugIds.length; index++) {
            const element = drugIds[index];
            if (element.id != '') {
                if (ids == '') {
                    ids = element.id;
                }
                else {
                    ids = ids + "," + element.id;
                }
            }
        }

        this._commonValidationService.validateAllFormFields(this.formData);

        if (this.formData.invalid) {
            return;
        }
        const payload: any = this.formData.getRawValue();
        payload.drug_Id = ids;
        payload.chamber_Id = this.chamber_Id
        debugger;
        this.loading = true;
        this._prescriptionAddService.save(payload).pipe(catchError((error) => {
            this.loading = false;
            this.error = error;
            this.callBackEvent.emit({
                status: 'failure',
                data: error,
            });
            return '';
        })).subscribe((response) => {
            this.loading = false;
            this._router.navigate(['/admin/prescription/list']);
            this.callBackEvent.emit({
                status: 'failure',
                data: response,
              
            });
        });
        //this.loading = true;

    }
    savePatientForm() {
        this.submitted = true;
       
        this._commonValidationService.validateAllFormFields(this.patientFromData);
        debugger;
        if (this.patientFromData.invalid) {
            return;
        }
        const payload: any = this.patientFromData.getRawValue();
        const obj: IContactsFormModel = {
            phone1: payload.mobile,
        };
        payload.patientContacts.push(obj);
        this.loading = true;
        this._prescriptionAddService.savePatient(payload).pipe(catchError((error) => {
            this.loading = false;
            this.error = error;
            this.callBackEvent.emit({
                status: 'failure',
                data: error,
                page: this.FormAction,
            });
            return '';
        })).subscribe((response) => {
            this.getPatients()
            this.elm.classList.remove('show');
            setTimeout(() => {
                this.elm.style.width = '0';
            }, 75);
            
        });
    }
    saveDrugForm() {
        this.submitted = true;
        this._commonValidationService.validateAllFormFields(this.drugFromData);
        if (this.drugFromData.invalid) {
            return;
        }

        const payload: any = this.drugFromData.getRawValue();
       
        this.loading = true;
        this._prescriptionAddService.saveDrug(payload).pipe(catchError((error) => {
            this.loading = false;
            this.error = error;
            this.callBackEvent.emit({
                status: 'failure',
                data: error,
                page: this.FormAction,
            });
            return '';
        })).subscribe((response) => {
            this.getDrugs()
            this.elm1.classList.remove('show');
            setTimeout(() => {
                this.elm.style.width = '0';
            }, 75);
            this.callBackEvent.emit({
                status: 'failure',
                data: response,
                page: this.FormAction,
            });
        });

    }
    close(): void {
        this.elm.classList.remove('show');
        this.elm1.classList.remove('show');
        setTimeout(() => {
            this.elm.style.width = '0';
        }, 75);
        setTimeout(() => {
            this.elm1.style.width = '0';
        }, 75);
    }

    addItem() {
        this.drugItems.push({
            id: '',
            medicine_Company: '',
            medicine_Type: '',
            form: '',
            description: '',
            details: '',
            dosage: ''
        });
    }

    /**
     * DeleteItem
     *
     * @param id
     */
    deleteItem(id) {
        for (let i = 0; i < this.drugItems.length; i++) {
            if (this.drugItems.indexOf(this.drugItems[i]) === id) {
                this.drugItems.splice(i, 1);
                this.drugIdes.poup(id);
                break;
            }
        }
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
