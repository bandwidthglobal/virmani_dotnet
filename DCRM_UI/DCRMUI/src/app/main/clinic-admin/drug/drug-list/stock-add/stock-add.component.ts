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
    @Input() FormInput?: StockFormModel = {
        id: 0,
        is_Deleted: 0,
        created_At: new Date(),
        updated_At: new Date(),
    };
    @Output('parentModalClose') parentFun: EventEmitter<any> = new EventEmitter();
    // Private
    private _unsubscribeAll: Subject<any>;
    @Input() drugId; 
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
        private _commonValidationService: CommonValidationService, private _drugListService: DrugListService) {
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this.formData = new StockForm(this.FormInput);
    }
    close() {
        this.parentFun.emit();
    }
   
    
    saveForm(): void {
        this.submitted = true;
        this._commonValidationService.validateAllFormFields(this.formData);
        alert(this.drugId);
        if (this.formData.invalid) {
            // console.log('> invalidForm ---> ', this.formData);
            return;
        } else {
            let payload: any = this.formData.getRawValue();
            payload.medicine_Id = this.drugId;
            debugger;
            this._drugListService.addStock(payload).pipe(catchError((error) => {
                this.loading = false;
                this.error = error;
                return '';
            })).subscribe((response) => {
                this.loading = false;
            });
        }
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
