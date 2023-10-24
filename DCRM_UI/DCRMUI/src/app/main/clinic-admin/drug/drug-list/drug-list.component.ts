import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ViewEncapsulation, EventEmitter, Output } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { CoreConfigService } from '@core/services/config.service';

import { DrugListService } from 'app/main/clinic-admin/drug/drug-list/drug-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BeforeOpenEvent } from '@sweetalert2/ngx-sweetalert2';
import { BadStockAddComponent } from 'app/main/clinic-admin/drug/drug-list/bad-stock-add/bad-stock-add.component';
import Swal from 'sweetalert2';

import * as snippet from 'app/main/extensions/sweet-alerts/sweet-alerts.snippetcode';
@Component({
    selector: 'app-drug-list',
    templateUrl: './drug-list.component.html',
    styleUrls: ['./drug-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DrugListComponent implements OnInit, OnDestroy {
    // public
    public data: any;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    public searchValue = '';
    // decorator
    @ViewChild('myModal') modal: BadStockAddComponent;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    public returnUrl: string;
    public loading = false;
    public error = '';
    // private
    private tempData = [];
    private _unsubscribeAll: Subject<any>;
    public rows;
    public tempFilterData;
    public previousStatusFilter = '';
    display: string = "none";
    public _snippetCodeConfirmText = snippet.snippetCodeConfirmText;
    isBad: boolean = false;
    isStock: boolean = false;
    @ViewChild('receiveModal', { static: false }) receiveModal: ElementRef;
    @Output() someEvent = new EventEmitter<string>();
    receiveElm: HTMLElement;
    drugId: any;
    /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     * @param {CalendarService} _calendarService
     * @param {InvoiceListService} _staffListService
     */
    constructor(private router: Router, private _drugListService: DrugListService, private _coreConfigService: CoreConfigService, private _route: ActivatedRoute) {
        this._unsubscribeAll = new Subject();
    }

    // Public Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * filterUpdate
     *
     * @param event
     */
    filterUpdate(event) {
        const val = event.target.value.toLowerCase();
        // filter our data
        const temp = this.tempData.filter(function (d) {
            return d.medicine_Type.toLowerCase().indexOf(val) !== -1
                || d.medicine_Company.toLowerCase().indexOf(val) !== -1
                || d.form.toLowerCase().indexOf(val) !== -1
                || !val;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }

    /**
     * Filter By Roles
     *
     * @param event
     */
    filterByStatus(event) {
        const filter = event ? event.value : '';
        this.previousStatusFilter = filter;
        this.tempFilterData = this.filterRows(filter);
        this.rows = this.tempFilterData;
    }

    /**
     * Filter Rows
     *
     * @param statusFilter
     */
    filterRows(statusFilter): any[] {
        // Reset search on select change
        this.searchValue = '';

        statusFilter = statusFilter.toLowerCase();

        return this.tempData.filter(row => {
            const isPartialNameMatch = row.invoiceStatus.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
            return isPartialNameMatch;
        });
    }
    ngOnInit(): void {
        this.getData();
    }
    parentFun() { alert('parent component function.'); }
    getData() {

        this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
            // If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
            if (config.layout.animation === 'zoomIn') {
                setTimeout(() => {

                    this._drugListService.onDrugListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
                        this.data = response;
                        this.rows = this.data;
                        this.tempData = this.rows;
                        this.tempFilterData = this.rows;
                    });
                }, 450);
            } else {
                this._drugListService.onDrugListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
                    this.data = response;
                    this.rows = this.data;
                    this.tempData = this.rows;
                    this.tempFilterData = this.rows;
                });
            }
        });
    }
    delete(id) {
        let rowIndex = -1;
        this.tempData.forEach((currentValue, index) => {
            if (currentValue.id == id) {
                rowIndex = index
            }
        });
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                this._drugListService
                    .delete(id)
                    .pipe()
                    .subscribe(
                        data => {
                            delete this.tempData[rowIndex];
                            var temp = [];
                            this.tempData.forEach((currentValue, index) => {
                                temp.push(currentValue);
                            });
                            this.rows = temp;
                        },
                        error => {
                            this.error = error;

                        }
                    );
            }
        })
       
    }
    ngAfterViewInit(): void {
        this.receiveElm = this.receiveModal.nativeElement as HTMLElement;
    }
    addBadStock(id) {
        this.isBad = true;
        this.isStock = false;
        this.drugId = id;
        this.receiveElm.classList.add('show');
        this.receiveElm.style.width = '100vw';
    }
    addStock(id) {
        this.isBad = false;
        this.isStock = true;
        this.drugId = id;
        this.receiveElm.classList.add('show');
        this.receiveElm.style.width = '100vw';
    }
    close() {
        this.isBad = false;
        this.isStock = false;
        this.receiveElm.classList.remove('show');
        this.receiveElm.style.width = '0';
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
