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
import { ReportService } from 'app/main/clinic-admin/report/report-list.service';
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
    amountDue: any;
    receiveRows: any;
    isOpen: boolean = true;
    isPaymentReceiveList = false;
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('receiveModal', { static: false }) receiveModal: ElementRef;//RECEIVE
    receiveElm: HTMLElement;
    @ViewChild('viewModal', { static: false }) viewModal: ElementRef;//VIEW
    viewElm: HTMLElement;
    receiveFormData?: ReceiveForm;
    @Input() ReceiveFormInput?: ReceiveFormModel = {
        id: 0,
        payment_History_Id: 0,
        payment_Type: 'Cash'
    };
    paymentDetailsList: any;
    public workDoneData: any = {
        toothName: "", workDoneDate: "", treatementCode: "", doctorName: "",
        patientName: "", noteDiagnosis: "", totalAmount: "", paidAmount: "", balance:""
    };    workdoneElm: any;
    isNoData: boolean;
    /**
     * Constructor
     *
     * @param {CoreSidebarService} _coreSidebarService
     * @param {CalendarService} _calendarService
     */
    constructor(private router: Router, private _patientListService: PatientPreviewService,
        private _reportService: ReportService,
        private _coreConfigService: CoreConfigService, private _route: ActivatedRoute, private _commonValidationService: CommonValidationService) {
        this._unsubscribeAll = new Subject();
        document.title = "Patient-Payments";
    }
    ngAfterViewInit(): void {
        this.receiveElm = this.receiveModal.nativeElement as HTMLElement;
        this.viewElm = this.viewModal.nativeElement as HTMLElement;
    }
    // Public Methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * filterUpdate
     *
     * @param event
     */
    filterUpdate(event: { target: { value: string; }; }) {

        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.tempData.filter(function (d) {
            return d.id.toString().indexOf(val) !== -1
                || d.doctorName.toLowerCase().indexOf(val) !== -1
                || d.toothCode.toLowerCase().indexOf(val) !== -1
                || d.toothName.toLowerCase().indexOf(val) !== -1
                || d.date.toLowerCase().indexOf(val) !== -1
                || d.description.toLowerCase().indexOf(val) !== -1
                || d.remainingEstimate.toString().indexOf(val) !== -1
                || d.debitAmount.toString().indexOf(val) !== -1
                || d.creditAmount.toString().indexOf(val) !== -1
                || d.balance.toString().indexOf(val) !== -1
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
    filterByStatus(event: { value: any; }) {
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
    filterRows(statusFilter: string): any[] {
        // Reset search on select change
        this.searchValue = '';

        statusFilter = statusFilter.toLowerCase();

        return this.tempData.filter(row => {
            const isPartialNameMatch = row.invoiceStatus.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
            return isPartialNameMatch;
        });
    }
    getWorkDoneData(id: any) {
        this._reportService.getWorkDone(id).subscribe(res => {
            this.workDoneData = res;
            this.paymentDetailsList = res.paymentDetailsList;
            if (res.paymentDetailsList.length==0) {
                this.isNoData = true;
            }
            this.viewElm.classList.add('show');
            this.viewElm.style.display = 'block';
            this.viewElm.style.width = '100vw';
        })
    }
    ngOnInit(): void {
        
        this.patientId = this._route.snapshot.paramMap.get('id');
        this.getData();
        this.receiveFormData = new ReceiveForm(this.ReceiveFormInput);
    }
    getData() {
        this.loading = true;
        this._patientListService.getPaymentList(this.patientId).subscribe(response => {
            this.data = response;
            this.rows = this.data;
            this.tempData = this.rows;
            this.tempFilterData = this.rows;
            this.loading = false;
        });
    }
    addReceive(id: any, patientId: any, balance: any) {
        this.isPaymentReceiveList = false;
        this.amountDue = balance;
        this.receiveFormData = new ReceiveForm(this.ReceiveFormInput);
        this.receiveFormData.price.setValue(balance);
        this.paymentId = id;
        this.patientId = patientId;
        this.receiveElm.classList.add('show');
        this.receiveElm.style.width = '100vw';
    }
    close(): void {
        this.error = '';
        this.receiveElm.classList.remove('show');
        this.receiveElm.classList.remove('show');
        setTimeout(() => {
            this.receiveElm.style.width = '0';
        }, 75);
    }
    closeView(): void {
        this.error = '';
        this.viewElm.classList.remove('show');
        this.viewElm.classList.remove('show');
        setTimeout(() => {
            this.viewElm.style.width = '0';
        }, 75);
    }
    printDiv() {
        const printContent = document.getElementById("printDiv");
        const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
        WindowPrt.document.write(printContent.innerHTML);
        WindowPrt.document.close();
        WindowPrt.focus();
        WindowPrt.print();
    }
    saveReceiveForm() {
        this.submitted = true;
        this._commonValidationService.validateAllFormFields(this.receiveFormData);
        if (this.receiveFormData.price.value=='') {
            this.error = "Please enter valid price";
            return false;
        }
        if (this.receiveFormData.invalid) {
            return;
        }
        if (this.receiveFormData.price.value > this.amountDue) {
            this.error = "Price should not be greater than amount due.";
            return false;
        }
        this.error = '';
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
   
    getPaymentReceives(id: any) {
        this.isPaymentReceiveList = true;
        this.getWorkDoneData(id);
        // this._patientListService.getPaymentReceives(id).subscribe(resp => {
        //     this.receiveRows = resp;
        //     this.receiveElm.classList.add('show');
        //     this.receiveElm.style.width = '100vw';
            // this.viewElm.classList.add('show');
            // this.viewElm.style.width = '100vw';
        //});
    }
    deletePayment(id: any) {
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
