import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { CoreConfigService } from '@core/services/config.service';
import { PatientPreviewService } from 'app/main/clinic-admin/patient/patient-preview/patient-preview.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { MatDialog } from '@angular/material/dialog';
import { TreatmentPlanFormComponent } from './form-page/treatment-plan-form.component';
import Swal from 'sweetalert2';
import { WorkDoneForm, WorkDoneFormModel } from './workdone-from';
import { CommonValidationService } from '../../../../../shared-common/services/common-validation.service';


@Component({
    selector: 'app-treatment-paln',
    templateUrl: './treatment-paln.component.html',
    styleUrls: ['./treatment-paln.component.scss'],
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
    public submitted = false;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    public returnUrl: string;
    public loading = false;
    public error = '';
    public totalAmount = 0;
    public currentAmount = 0;
    private tempData = [];
    private _unsubscribeAll: Subject<any>;
    public rows;
    public tempFilterData;
    public previousStatusFilter = '';
    treatmentId: any = 0;
    doctors: Array<any> = [];
    isOpen: boolean = true;
    @Input() apiData?: any = '';
    @Input() DiagnosisData?: any = '';
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('workdoneModal', { static: false }) workdoneModal: ElementRef;//RECEIVE
    receiveElm: HTMLElement;
    workDoneFormData?: WorkDoneForm;
    @Input() ReceiveFormInput?: WorkDoneFormModel = {
        id: 0,
        discount: 0,
        total_Amt: 0,
        doctor_Id:''
    };

    constructor(
        private router: Router,
        private _patientListService: PatientPreviewService,
        private _coreConfigService: CoreConfigService,
        private _route: ActivatedRoute,
        private _matDialog: MatDialog
        , private _commonValidationService: CommonValidationService
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

    ngAfterViewInit(): void {
        this.receiveElm = this.workdoneModal.nativeElement as HTMLElement;
    }
    addWorkDone(treatmentid,estamount ) {
        this.getDoctors();
        this.treatmentId = treatmentid;
        this.workDoneFormData = new WorkDoneForm(this.ReceiveFormInput);
        this.workDoneFormData.estimated_Amount.setValue(estamount);
        this.receiveElm.classList.add('show');
        this.receiveElm.style.width = '100vw';
    }
    close(): void {
        this.receiveElm.classList.remove('show');
        this.receiveElm.classList.remove('show');
        setTimeout(() => {
            this.receiveElm.style.width = '0';
        }, 75);
    }
    getDoctors() {
        this._patientListService.getDoctors().pipe().subscribe((response) => {
            this.doctors = response;
        });
    }

    chngCurrentwork(ev) {
        this.currentAmount = parseInt(ev.target.value)
        this.workDoneFormData.total_Amt.setValue(this.currentAmount);
    }
    chngDiscount(ev) {
        var discount = parseInt(ev.target.value)
        
       if (this.currentAmount > 0 && discount > 0) {
            this.workDoneFormData.total_Amt.setValue(this.currentAmount - discount);
        }
        
    }

    saveWorkDoneForm() {
        this.submitted = true;
        this._commonValidationService.validateAllFormFields(this.workDoneFormData);
        if (this.workDoneFormData.invalid) {
            debugger;
            return;
        }
        const payload: any = this.workDoneFormData.getRawValue();
        payload.treatment_Id = this.treatmentId;
        debugger;
        this.loading = true;
        this._patientListService.saveWorkDone(payload).pipe(catchError((error) => {
            this.loading = false;
            this.error = error;
            this.callBackEvent.emit({
                status: 'failure',
                data: error,
            });
            return '';
        })).subscribe((response) => {
            this.receiveElm.classList.remove('show');
            this.receiveElm.classList.remove('show');
            setTimeout(() => {
                this.receiveElm.style.width = '0';
            }, 75);
            this.loading = false;
            this.callBackEvent.emit({
                status: 'failure',
                data: response,
            });
        });
        //this.loading = true;
    }
    ngOnInit(): void {
        
        this.getData();
        this.workDoneFormData = new WorkDoneForm(this.ReceiveFormInput);
    }
    
    getData() {
        this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
            // If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
            if (config.layout.animation === 'zoomIn') {
                setTimeout(() => {
                    this._patientListService.onTreatmentChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
                        this.data = response;
                        debugger;
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

    delete(id, patientId) {
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
                this._patientListService
                    .deleteTreatment(id)
                    .pipe()
                    .subscribe(
                        data => {
                            this._patientListService.refreshTreatmentList(patientId).subscribe(response => {
                                this.data = response;
                                this.rows = this.data;
                                this.tempData = this.rows;
                                this.tempFilterData = this.rows;
                            })
                        },
                        error => {
                            this.error = error;

                        }
                    );
            }
        })

    }
   
    showTreatmentForm: boolean = false;
    openComplaintForm() {
        this.showTreatmentForm = !this.showTreatmentForm;
    }

    returnPage() {
        this.showTreatmentForm = false;
        this.getData();
    }


    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}