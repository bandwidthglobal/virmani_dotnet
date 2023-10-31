import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation, ElementRef, Output, EventEmitter, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CoreConfigService } from '@core/services/config.service';
import { PatientPreviewService } from 'app/main/clinic-admin/patient/patient-preview/patient-preview.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { ReceiveForm, ReceiveFormModel } from './receive-from';
import { CommonValidationService } from '../../../../../shared-common/services/common-validation.service';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['./payments.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PaymentsComponent implements OnInit {
    submitted: boolean = false;
    public calendarRef = [];
    public tempRef = [];
    public checkAll = true;
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
    public paymentId: any = '';
    public patientId: any = '';
    private tempData = [];
    private _unsubscribeAll: Subject<any>;
    public rows;
    public tempFilterData;
    public previousStatusFilter = '';
    receiveRows: any;
    isOpen: boolean = true;
    isPaymentReceiveList = false;
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('receiveModal', { static: false }) receiveModal: ElementRef;//RECEIVE
    receiveElm: HTMLElement;
    receiveFormData?: ReceiveForm;
    @Input() ReceiveFormInput?: ReceiveFormModel = {
        id: 0,
        payment_History_Id: 0,
        payment_Type: ''
    };
    /**
     * Constructor
     *
     * @param {CoreSidebarService} _coreSidebarService
     * @param {CalendarService} _calendarService
     */
    constructor(private router: Router, private _patientListService: PatientPreviewService,
        private _coreConfigService: CoreConfigService, private _route: ActivatedRoute, private _commonValidationService: CommonValidationService) {
        this._unsubscribeAll = new Subject();
    }
    ngAfterViewInit(): void {
        this.receiveElm = this.receiveModal.nativeElement as HTMLElement;
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
            return d.mr_Number.toLowerCase().indexOf(val) !== -1
                || d.name.toLowerCase().indexOf(val) !== -1
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
        this.receiveFormData = new ReceiveForm(this.ReceiveFormInput);
    }
    getData() {
        this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {

            if (config.layout.animation === 'zoomIn') {
                setTimeout(() => {

                    this._patientListService.onPaymentChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
                        this.data = response;
                        this.rows = this.data;
                        this.tempData = this.rows;
                        this.tempFilterData = this.rows;
                    });
                }, 450);
            } else {
                this._patientListService.onPaymentChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
                    this.data = response;
                    this.rows = this.data;
                    this.tempData = this.rows;
                    this.tempFilterData = this.rows;
                    debugger;
                });
            }
        });
    }
    addReceive(id, patientId) {
        this.isPaymentReceiveList = false;
        this.receiveFormData = new ReceiveForm(this.ReceiveFormInput);
        this.paymentId = id;
        this.patientId = patientId;
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
    saveReceiveForm() {
        this.submitted = true;

        this._commonValidationService.validateAllFormFields(this.receiveFormData);

        if (this.receiveFormData.invalid) {
            return;
        }
        const payload: any = this.receiveFormData.getRawValue();
        payload.payment_History_Id = this.paymentId;

        this.loading = true;
        this._patientListService.savePayment(payload).pipe(catchError((error) => {
            this.loading = false;
            this.error = error;
            this.callBackEvent.emit({
                status: 'failure',
                data: error,
            });
            return '';
        })).subscribe((response) => {
            this.getPayments();
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
        this.loading = true;
    }
    getPayments() {
        this._patientListService.getPayments(this.patientId).subscribe(resp => {

            this.data = resp;
            this.rows = this.data;
            this.tempData = this.rows;
            this.tempFilterData = this.rows;
            debugger;
        });
    }
    getPaymentReceives(id) {
        this.isPaymentReceiveList = true;
        this._patientListService.getPaymentReceives(id).subscribe(resp => {
            this.receiveRows = resp;
            this.receiveElm.classList.add('show');
            this.receiveElm.style.width = '100vw';
        });
    }
    deletePayment(id) {
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
                this._patientListService
                    .deleteWorkDone(id)
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
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
