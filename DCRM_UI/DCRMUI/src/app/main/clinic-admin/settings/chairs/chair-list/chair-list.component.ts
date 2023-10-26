import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { CoreConfigService } from '@core/services/config.service';

import { ChairListService } from 'app/main/clinic-admin/settings/chairs/chair-list/chair-list.service';

@Component({
    selector: 'app-chair-list',
    templateUrl: './chair-list.component.html',
    styleUrls: ['./chair-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ChairListComponent implements OnInit, OnDestroy {
    // public
    public data: any;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    public selectStatus: any = [
        { name: 'All', value: '' },
        { name: 'Downloaded', value: 'Downloaded' },
        { name: 'Draft', value: 'Draft' },
        { name: 'Paid', value: 'Paid' },
        { name: 'Partial Payment', value: 'Partial Payment' },
        { name: 'Past Due', value: 'Past Due' },
        { name: 'Sent', value: 'Sent' }
    ];

    public selectedStatus = [];
    public searchValue = '';

    // decorator
    @ViewChild(DatatableComponent) table: DatatableComponent;

    // private
    private tempData = [];
    private _unsubscribeAll: Subject<any>;
    public rows;
    public tempFilterData;
    public previousStatusFilter = '';

    /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     * @param {CalendarService} _calendarService
     * @param {InvoiceListService} _invoiceListService
     */
    constructor(private _chairListService: ChairListService, private _coreConfigService: CoreConfigService) {
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
        this.selectedStatus = this.selectStatus[0];
        const val = event.target.value.toLowerCase();
        const temp = this.tempData.filter(function (d) {
            return d.name.toLowerCase().indexOf(val) !== -1 ||
                d.doctorName.toLowerCase().indexOf(val) !== -1 ||
                d.status.toLowerCase().indexOf(val) !== -1 ||
                !val;
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

    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------
    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe config change
        this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
            // If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
            if (config.layout.animation === 'zoomIn') {
                setTimeout(() => {
                    this._chairListService.onChairListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
                        this.data = response;
                        this.rows = this.data;
                        this.tempData = this.rows;
                        this.tempFilterData = this.rows;
                    });
                }, 450);
            } else {
                this._chairListService.onChairListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
                    this.data = response;
                    this.rows = this.data;
                    this.tempData = this.rows;
                    debugger;
                    this.tempFilterData = this.rows;
                });
            }
        });
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
