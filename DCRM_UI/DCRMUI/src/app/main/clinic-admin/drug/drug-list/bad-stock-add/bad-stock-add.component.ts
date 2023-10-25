import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { repeaterAnimation } from 'app/main/apps/invoice/invoice.animation';
import { DrugListService } from 'app/main/clinic-admin/drug/drug-list/drug-list.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { validationMessages } from 'app/shared-common/pipes/error-message';
import { BadStockForm, BadStockFormModel } from './bad-stock-from-model';
import { CommonValidationService } from '../../../../../shared-common/services/common-validation.service';

@Component({
    selector: 'app-bad-stock-add',
    templateUrl: './bad-stock-add.component.html',
    styleUrls: ['./bad-stock-add.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class BadStockAddComponent implements OnInit, OnDestroy {
    // Public

    public url = this.router.url;

    public urlLastValue;
    public apiData;
    public sidebarToggleRef = false;
    public paymentSidebarToggle = false;
    public invoiceSelect;
    public invoiceSelected;
    public addDrugForm: UntypedFormGroup;
    public loading = false;
    public returnUrl: string;
    submitted: boolean = false;
    public error = '';
    bachNoData: any;
    formData?: BadStockForm;
    @Input() FormInput?: BadStockFormModel = {
        id: 0,
        is_Deleted: 0,
        pharmacy_Id:0
    };
    @Output('parentModalClose') parentFun: EventEmitter<any> = new EventEmitter();
    @Input() drugId; 
    selectedBatchId = '';
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {Router} router
     * @param {InvoiceEditService} _invoiceEditService
     * @param {CoreSidebarService} _coreSidebarService
     */
    constructor(
        private router: Router,
        private _drugListService: DrugListService, private _commonValidationService: CommonValidationService,) {
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.formData = new BadStockForm(this.FormInput);
        this.getBatch();
    }
    getBatch() {
        this._drugListService.getDrugStockList(this.drugId).subscribe(res => {
            this.bachNoData = res;
            this.formData.batch_No.setValue('');
        })
    }
    close() {
        this.parentFun.emit();
    }

    getBatchId(evt) {
        let expiry_Date = '';
        this.selectedBatchId = evt.target.value;
        this.bachNoData.forEach(function (item) {
            if (evt.target.value == item.id) {
                expiry_Date = item.expiry_Date;
            }
        });
        this.formData.expiry_Date.setValue(expiry_Date);
    }
    saveForm(): void {
        this.submitted = true;
        this._commonValidationService.validateAllFormFields(this.formData);
        if (this.formData.invalid) {
            return;
        } else {
            let payload: any = this.formData.getRawValue();
            let selectedBatchId = this.selectedBatchId;
            this.bachNoData.forEach(function (value) {
                if (selectedBatchId == value.id) {
                    payload.pharmacy_Id = value.medicine_Id;
                }
            });
            this.loading = true;
            this._drugListService.addBadStock(payload).pipe(catchError((error) => {
                this.loading = false;
                this.error = error;
                return '';
            })).subscribe((response) => {
                this.loading = false;
                this.parentFun.emit();
            });
        }
    }
    
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
