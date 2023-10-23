import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { repeaterAnimation } from 'app/main/apps/invoice/invoice.animation';
import { DrugListService } from 'app/main/clinic-admin/drug/drug-list/drug-list.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-stock-add',
    templateUrl: './stock-add.component.html',
    styleUrls: ['./stock-add.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class StockAddComponent implements OnInit, OnDestroy {
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
    @Output('parentModalClose') parentFun: EventEmitter<any> = new EventEmitter();
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
        private _drugAddService: DrugListService, private _formBuilder: UntypedFormBuilder, private _route: ActivatedRoute, private _toastrService: ToastrService) {
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

    }
    close() {
        this.parentFun.emit();
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
    
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
