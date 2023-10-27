import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { repeaterAnimation } from 'app/main/clinic-admin/patient/patient.animation';
import { PatientPreviewService } from 'app/main/clinic-admin/patient/patient-preview/patient-preview.service';
import { PatientEditModel } from '../patient-add/patient-add.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-patient-preview',
    templateUrl: './patient-preview.component.html',
    styleUrls: ['./patient-preview.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class PatientPreviewComponent implements OnInit, OnDestroy {
    // Public
    public url = this.router.url;
    public urlLastValue;
    public apiData;
    public sidebarToggleRef = false;
    public paymentSidebarToggle = false;
    public items = [{ itemId: '', itemName: '', itemQuantity: '', itemCost: '' }];
    public invoiceSelect;
    public invoiceSelected;
    public addDrugForm: UntypedFormGroup;
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public error = '';
    medicinBrands: any;
    medicinCategories: any;
    public brandName: string = "";
    public category: string = "";
    public drug: PatientEditModel = {
        medicine_Category: "",
        medicine_Company: "",
        brandname: "",
        basic_Salt: "",
        form: "",
        dosage: "",
        dose_No: "",
        details: "",
        description: "",
        safety_Alerts: "",
        bactrology: "",
        note: "",
        medicine_Type: "",
        medicine_Category_Id: "",
        medicine_Brand_Id: "",
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
        private _patientPreviewService: PatientPreviewService, private _formBuilder: UntypedFormBuilder, private _route: ActivatedRoute, private _toastrService: ToastrService) {
        this._unsubscribeAll = new Subject();
    }

    public DiagnosisData;
    ngOnInit(): void {
        this._patientPreviewService.onPatientChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.apiData = response;
            // debugger;
        });
        this._patientPreviewService.onDiagnosisData.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.DiagnosisData = response;
            // debugger;
        });
    }

    onTabChange(obj) { }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
