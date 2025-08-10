import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';

import { repeaterAnimation } from 'app/main/apps/invoice/invoice.animation';
import { CalenderViewService } from '../calendar-view/calendar-view.service';
import { CalenderViewModel } from '../calendar-view/calendar-view.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-calendar-view',
    templateUrl: './calendar-view.component.html',
    styleUrls: ['./calendar-view.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class CalenderViewComponent implements OnInit, OnDestroy {
    // Public
    public url = this.router.url;
    public urlLastValue: any;
    public druFromData:any;
    public sidebarToggleRef = false;
    public paymentSidebarToggle = false;
    public items = [{ itemId: '', itemName: '', itemQuantity: '', itemCost: '' }];
    public invoiceSelect: any;
    public invoiceSelected: any;
    public drugForm: UntypedFormGroup;
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public error = '';
    medicinBrands: any;
    medicinCategories: any;
    isEdit = false;
    drugId = 0;
    public calenderViewModel: CalenderViewModel = {
        id:0,
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
        medicine_Image:'',
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
        private _drugFormService: CalenderViewService, private _formBuilder: UntypedFormBuilder, private _route: ActivatedRoute, private _toastrService: ToastrService) {
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        const id = this._route.snapshot.paramMap.get('id');
        //if (id != undefined && id != null) {
        //    this.drugId = parseInt(id);
        //}
        //if (this.drugId > 0) {
        //    this.isEdit = true;

        //    this._drugFormService.onDrugChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
        //        this.drug = response;
        //        this.base64Image = this.drug.medicine_Image;
        //    });
        //}
        //this._drugFormService.onMedicinBrandChanged.subscribe(res => (this.medicinBrands = res));
        //this._drugFormService.onMedicinCategoriesChanged.subscribe(res => (this.medicinCategories = res));
        //this.drugForm = this._formBuilder.group({
        //    medicinecompany: ['', Validators.required],
        //    medicinetype: ['', Validators.required],
        //    basicsalt: ['', Validators.required],
        //    form: ['', Validators.required],
        //    dosage: ['', Validators.required],
        //    doseno: ['', Validators.required],
        //    details: ['', Validators.required],
        //    category: ['', Validators.required],
        //    brand: ['', Validators.required],
        //});
    }
    
    onCategorySelected(ob: any) {

    }
    onBrandSelected(ob: any) {

    }
    
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
