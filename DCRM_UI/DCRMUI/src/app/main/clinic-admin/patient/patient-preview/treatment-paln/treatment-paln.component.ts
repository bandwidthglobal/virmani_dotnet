import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CoreConfigService } from '@core/services/config.service';
import { PatientPreviewService } from 'app/main/clinic-admin/patient/patient-preview/patient-preview.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { MatDialog } from '@angular/material/dialog';
import { TreatmentPlanFormComponent } from './form-page/treatment-plan-form.component';


@Component({
    selector: 'app-treatment-paln',
    templateUrl: './treatment-paln.component.html',
    encapsulation: ViewEncapsulation.None
})

export class TreatmentPalnComponent implements OnInit {

    public calendarRef = [];
    public tempRef = [];
    public checkAll = true;
    public data: any;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    public selectedStatus = [];
    public searchValue = '';

    @ViewChild(DatatableComponent) table: DatatableComponent;
    public returnUrl: string;
    public loading = false;
    public error = '';

    private tempData = [];
    private _unsubscribeAll: Subject<any>;
    public rows;
    public tempFilterData;
    public previousStatusFilter = '';
    isOpen: boolean = true;
    @Input() apiData?: any = '';
    @Input() DiagnosisData?: any = '';


    constructor(
        private router: Router,
        private _patientListService: PatientPreviewService,
        private _coreConfigService: CoreConfigService,
        private _route: ActivatedRoute,
        private _matDialog: MatDialog,
    ) {
        this._unsubscribeAll = new Subject();
    }

    filterUpdate(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.tempData.filter(function (d) {
            return d.doctorName.toLowerCase().indexOf(val) !== -1
                || d.type.toLowerCase().indexOf(val) !== -1
                || d.treatmentStatus.toLowerCase().indexOf(val) !== -1
                || d.teethNumber.toLowerCase().indexOf(val) !== -1
                || d.date.toLowerCase().indexOf(val) !== -1
                || !val;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }

    filterByStatus(event) {
        const filter = event ? event.value : '';
        this.previousStatusFilter = filter;
        this.tempFilterData = this.filterRows(filter);
        this.rows = this.tempFilterData;
    }

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
                    this._patientListService.onTreatmentChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
                        this.data = response;
                        this.rows = this.data;
                        this.tempData = this.rows;
                        this.tempFilterData = this.rows;
                    });
                }, 450);
            } else {
                this._patientListService.onTreatmentChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
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

    showTreatmentForm: boolean = false;
    openComplaintForm() {
        this.showTreatmentForm = !this.showTreatmentForm;
        // const dialogRef = this._matDialog.open(TreatmentPlanFormComponent, {
        //     autoFocus: false,
        // });

        // dialogRef.afterClosed().subscribe(({ status, data }) => {
        //     console.log("> status ---> ", status);
        //     console.log("> data ---> ", data);
        // });
    }

    returnPage() {
        this.showTreatmentForm = false;
        this.getData();
    }
}