import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { CoreConfigService } from '@core/services/config.service';

import { PatientPreviewService } from 'app/main/clinic-admin/patient/patient-preview/patient-preview.service';
import { ActivatedRoute, Router } from '@angular/router';


import * as snippet from 'app/main/extensions/sweet-alerts/sweet-alerts.snippetcode';
@Component({
    selector: 'app-patient-appointments',
    templateUrl: './patient-appointments.component.html',
    /*styleUrls: ['./patient-appointments.component.scss'],*/
    encapsulation: ViewEncapsulation.None
})
export class PatientAppointmentsComponent implements OnInit, OnDestroy {
    // public
    public data: any;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    public selectedStatus = [];
    public searchValue = '';
    // decorator
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
    public _snippetCodeConfirmText = snippet.snippetCodeConfirmText;
    isOpen: boolean = true;
    /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     * @param {CalendarService} _calendarService
     * @param {InvoiceListService} _staffListService
     */
    constructor(private router: Router, private _patientListService: PatientPreviewService, private _coreConfigService: CoreConfigService, private _route: ActivatedRoute) {
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
            return d.doctor_Name.toLowerCase().indexOf(val) !== -1
                || d.slot_Time.toLowerCase().indexOf(val) !== -1
                || d.cause.toLowerCase().indexOf(val) !== -1
                || d.chair.toLowerCase().indexOf(val) !== -1
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
    getData() {
        this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
            // If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
            if (config.layout.animation === 'zoomIn') {
                setTimeout(() => {

                    this._patientListService.onAppointmentChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
                        this.data = response;
                        this.rows = this.data;
                        this.tempData = this.rows;
                        this.tempFilterData = this.rows;
                    });
                }, 450);
            } else {
                this._patientListService.onAppointmentChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
                    this.data = response;
                    this.rows = this.data;
                    this.tempData = this.rows;
                    this.tempFilterData = this.rows;
                    // debugger;
                });
            }
        });
    }


    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
