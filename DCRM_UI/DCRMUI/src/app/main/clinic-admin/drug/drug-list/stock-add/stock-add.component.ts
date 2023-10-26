//import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
//import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { validationMessages } from 'app/shared-common/pipes/error-message';
import { CommonValidationService } from 'app/shared-common/services/common-validation.service';
import { StockForm, StockFormModel } from '../stock-add/stock-from-model';
import { DrugListService } from '../drug-list.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-stock-add',
    templateUrl: './stock-add.component.html',
    styleUrls: ['./stock-add.component.scss'],
   
    encapsulation: ViewEncapsulation.None
})
export class StockAddComponent implements OnInit, OnDestroy {
    // Public

    public url = this.router.url;
    loading: boolean = false;
    submitted: boolean = false;
    error: any = '';
    messages = validationMessages;
    formData?: StockForm;
    public addStockForm: UntypedFormGroup;
    @Input() FormInput?: StockFormModel = {
        id: 0,
        is_Deleted: 0,
        batch_No: '',
        created_At: new Date(),
        updated_At: new Date(),
    };
    @Output('parentModalClose') parentFun: EventEmitter<any> = new EventEmitter();
    // Private
    private _unsubscribeAll: Subject<any>;
    @Input() drugId; 
    public stockModel: StockFormModel = {
        id: 0,
        medicine_Id: "",
        inward_Date: "",
        expiry_Date: "",
        batch_No: "",
        packing_Qty: "",
        purchase_Rate_Packing: "",
        quantity: "",
        mrp: "",
        sale_Rate: "",
        available_Quantity: "",
        amount: "",
        is_Deleted: 0,
        created_At: new Date(),
        updated_At: new Date(),
    }
    get formControl() {
        return this.addStockForm.controls;
    }
    /**
     * Constructor
     *
     * @param {Router} router
     * @param {InvoiceEditService} _invoiceEditService
     * @param {CoreSidebarService} _coreSidebarService
     */
    constructor(
        private router: Router,
        private _commonValidationService: CommonValidationService, private _drugListService: DrugListService, private _formBuilder: UntypedFormBuilder) {
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.addStockForm = this._formBuilder.group({
            inward_Date: ['', Validators.required],
            expiryDate: ['', Validators.required],
            batchNo: ['', [Validators.required]],
            packingQty: ['', [Validators.required]],
            mrp: ['', [Validators.required]],
            saleRate: ['', [Validators.required]],
            quantity: ['', [Validators.required]],
            amount: [''],
            purchaseRatePacking: [''],
        });
    }
    close() {
        this.parentFun.emit();
    }
   
    
    onSubmit(): void {
        this.submitted = true;
        if (this.addStockForm.invalid) {
            return;
        }
       
        this.stockModel.medicine_Id = this.drugId;
        this._drugListService.addStock(this.stockModel).pipe(catchError((error) => {
            this.loading = false;
            this.error = error;
            return '';
        })).subscribe((response) => {
            this.loading = false;
            this.parentFun.emit();
        });
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
