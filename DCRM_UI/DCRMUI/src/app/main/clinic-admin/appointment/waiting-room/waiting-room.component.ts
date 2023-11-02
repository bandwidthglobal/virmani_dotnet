import { Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { repeaterAnimation } from 'app/main/apps/invoice/invoice.animation';
import { WaitingRoomService } from '../waiting-room/waiting-room.service';
import { WaitingRoomModel } from '../waiting-room/waiting-room.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { CoreConfigService } from '../../../../../@core/services/config.service';

@Component({
    selector: 'app-waiting-room',
    templateUrl: './waiting-room.component.html',
    styleUrls: ['./waiting-room.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class WaitingRoomComponent implements OnInit, OnDestroy {
    public data: any;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
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
    display: string = "none";
    isOpen: boolean = true;
    @ViewChild('myTable') table1;
    // Private
    //private _formBuilder: any;

    /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     * @param {CalendarService} _calendarService
     * @param {InvoiceListService} _staffListService
     */
    constructor(private router: Router, private _appointmentListService: WaitingRoomService, private _coreConfigService: CoreConfigService, private _route: ActivatedRoute) {
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
            return d.serial_Id.toString().toLowerCase().indexOf(val) !== -1
                || d.patient_Name.toLowerCase().indexOf(val) !== -1
                || d.doctor_Name.toLowerCase().indexOf(val) !== -1
                || d.start_Time.toLowerCase().indexOf(val) !== -1
                || d.end_Time.toLowerCase().indexOf(val) !== -1
                || d.cause.toLowerCase().indexOf(val) !== -1
                || d.chair.toString().toLowerCase().indexOf(val) !== -1
                || d.slot_Time.toLowerCase().indexOf(val) !== -1
                || !val;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
        this.table1.offset = 0;
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

        this._appointmentListService.getWatingRoom().subscribe(response => {
            this.data = response;
            this.rows = this.data;
            this.tempData = this.rows;
            this.tempFilterData = this.rows;
            this.table.offset = 0;
            debugger;
        });

        //this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
        //    // If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
        //    if (config.layout.animation === 'zoomIn') {
        //        setTimeout(() => {

        //            this._appointmentListService.onAppointmentListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
        //                this.data = response;
        //                this.rows = this.data;
        //                this.tempData = this.rows;
        //                this.tempFilterData = this.rows;
        //            });
        //        }, 450);
        //    } else {
        //        this._appointmentListService.onAppointmentListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
        //            this.data = response;
        //            this.rows = this.data;
        //            this.tempData = this.rows;
        //            this.tempFilterData = this.rows;
        //        });
        //    }
        //});
    }
    ngAfterViewInit() {
        this.table.bodyComponent.updatePage = function (direction: string): void {
            debugger;
            let offset = this.indexes.first / this.pageSize;

            if (direction === 'up') {
                offset = Math.ceil(offset);
            } else if (direction === 'down') {
                offset = Math.floor(offset);
            }

            if (direction !== undefined && !isNaN(offset)) {
                this.page.emit({ offset });
            }
        }
    }
    changeAppointmentStatus(evnt, id) {
        this._appointmentListService.ChangeAppointmentStatus(id, evnt.target.value).subscribe(res => {
            this.getData();
        });
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
