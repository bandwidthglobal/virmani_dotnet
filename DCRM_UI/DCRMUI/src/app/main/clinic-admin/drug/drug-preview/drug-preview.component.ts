import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { repeaterAnimation } from 'app/main/clinic-admin/drug/drug.animation';
import { DrugPreviewService } from 'app/main/clinic-admin/drug/drug-preview/drug-preview.service';
import { DrugAddModel } from '../drug-add/drug-add.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-drug-preview',
    templateUrl: './drug-preview.component.html',
    styleUrls: ['./drug-preview.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class DrugPreviewComponent implements OnInit, OnDestroy {
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
   public drug: any;
    //public drug: DrugAddModel = {
    //    medicine_Category: "",
    //    medicine_Company: "",
    //    brandname: "",
    //    basic_Salt: "",
    //    form: "",
    //    dosage: "",
    //    dose_No: "",
    //    details: "",
    //    description: "",
    //    safety_Alerts: "",
    //    bactrology: "",
    //    note: "",
    //    medicine_Type: "",
    //    medicine_Category_Id: "",
    //    medicine_Brand_Id: "",
    //}
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
        private _drugPreviewService: DrugPreviewService, private _formBuilder: UntypedFormBuilder, private _route: ActivatedRoute, private _toastrService: ToastrService) {
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this._drugPreviewService.onMedicinBrandChanged.subscribe(res => (this.medicinBrands = res));
        this._drugPreviewService.onMedicinCategoriesChanged.subscribe(res => (this.medicinCategories = res));
        this._drugPreviewService.onDrugEditChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.drug = response;
            debugger;
            this.medicinBrands.forEach((currentValue, index) => {
                if (currentValue.id == this.drug.medicine_Brand_Id) {
                    this.brandName = currentValue.medicine_Brand;
                }
            });
            this.medicinCategories.forEach((currentValue, index) => {
                if (currentValue.id == this.drug.medicine_Category_Id) {
                    this.category = currentValue.medicine_Category;
                }
            });
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
