import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { repeaterAnimation } from 'app/main/apps/invoice/invoice.animation';
import { DrugAddService } from 'app/main/clinic-admin/drug/drug-add/drug-add.service';
import { DrugAddModel } from '../drug-add/drug-add.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-drug-add',
    templateUrl: './drug-add.component.html',
    styleUrls: ['./drug-add.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class DrugAddComponent implements OnInit, OnDestroy {
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
    public drug: DrugAddModel = {
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
        private _drugAddService: DrugAddService, private _formBuilder: UntypedFormBuilder, private _route: ActivatedRoute, private _toastrService: ToastrService) {
        this._unsubscribeAll = new Subject();
    }
    addItem() {
        this.items.push({
            itemId: '',
            itemName: '',
            itemQuantity: '',
            itemCost: ''
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

    /**
     * On init
     */
    ngOnInit(): void {

        this._drugAddService.onMedicinBrandChanged.subscribe(res => (this.medicinBrands = res));
        this._drugAddService.onMedicinCategoriesChanged.subscribe(res => (this.medicinCategories = res));
        this.addDrugForm = this._formBuilder.group({
            medicinecompany: ['', Validators.required],
            medicinetype: ['', Validators.required],
            basicsalt: ['', Validators.required],
            form: ['', Validators.required],
            dosage: ['', Validators.required],
            doseno: ['', Validators.required],
            details: ['', Validators.required],
            category: ['', Validators.required],
            brand: ['', Validators.required],
        });
    }
    get f() {
        return this.addDrugForm.controls;
    }
    onCategorySelected(ob) {

    }
    onBrandSelected(ob) {

    }
    cancel() {
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/drug/list';
        this.router.navigateByUrl(this.returnUrl);
    }
    onSubmit() {
        this.submitted = true;

        if (this.addDrugForm.invalid) {
            return;
        }

        this.loading = true;
        this._drugAddService
            .update(this.drug)
            .pipe()
            .subscribe(
                data => {
                    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/drug/list';
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
