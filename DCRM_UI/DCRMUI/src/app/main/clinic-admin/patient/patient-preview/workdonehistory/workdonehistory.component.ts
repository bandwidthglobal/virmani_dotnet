import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation, Input, ElementRef } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { catchError,  } from 'rxjs/operators';
import { WorkDoneFormModel } from '../treatment-paln/workdone-from';
import { CoreConfigService } from '@core/services/config.service';

import { PatientPreviewService } from 'app/main/clinic-admin/patient/patient-preview/patient-preview.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
    selector: 'app-workdonehistory',
    templateUrl: './workdonehistory.component.html',
    styleUrls: ['./workdonehistory.component.scss'],

    encapsulation: ViewEncapsulation.None
})
export class WorkdoneHistoryComponent implements OnInit {
    // Public
    // public
    public data: any;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    public selectedStatus = [];
    public searchValue = '';
    isSaved: boolean = false;
    workdoneStatus = 0;
    public submitted = false;
    doctors: Array<any> = [];
    job: any;
    toothNumber: any;
    workdoneid: any;
    treatmentId: any = 0;
    public currentAmount = 0;


    // decorator
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('workdoneModal', { static: false }) workdoneModal: ElementRef;//RECEIVE
    public returnUrl: string;
    public loading = false;
    public error = '';
   
    // private
    private tempData = [];
    private _unsubscribeAll: Subject<any>;
    public rows;
    public workdoneForm: UntypedFormGroup;

    public workdone: WorkDoneFormModel = {
        id: 0,
        doctor_Id: '',
        current_Work_Amt: '',
        discount: 0,
        realized_Treatment_Cost: 0,
        total_Amt: 0,
        workdone_Status: 0,
        estimated_Amount: '',
        workdone_Notes: ''
    }
    receiveElm: HTMLElement;
    public tempFilterData;
    public previousStatusFilter = '';
    isOpen: boolean = true;
    isWorkdonesave : boolean = true;
    paymentData: any;
    treatmentData: any;

    /**
     * Constructor
     *
     * @param {CoreConfigService} _coreConfigService
     * @param {CalendarService} _calendarService
     * @param {InvoiceListService} _staffListService
     */
    constructor(private router: Router, private _patientListService: PatientPreviewService, private _coreConfigService: CoreConfigService, private _route: ActivatedRoute, private _formBuilder: UntypedFormBuilder) {
        this._unsubscribeAll = new Subject();
        document.title = "Patient -WorkdoneHistory";
    }
    ngAfterViewInit(): void {
        this.receiveElm = this.workdoneModal.nativeElement as HTMLElement;
    }
    // Public Methods
    // -----------------------------------------------------------------------------------------------------
    toggleExpand(row: any): void {
        row.expanded = !row.expanded;
    }
    
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
                || d.date.toLowerCase().indexOf(val) !== -1
                || d.toothName.toLowerCase().indexOf(val) !== -1
                || d.treatmentCode.toLowerCase().indexOf(val) !== -1
                || d.doctorName.toLowerCase().indexOf(val) !== -1
                || d.notesdiagnosis.toLowerCase().indexOf(val) !== -1
                || d.workdoneStatus.toLowerCase().indexOf(val) !== -1
                || d.amtDueCurrentWork.toString().indexOf(val) !== -1
                || !val;
        });

        // update the rows
        this.rows = temp;
        // Whenever the filter changes, always go back to the first page
        this.table.offset = 0;
    }
    printDiv() {
        const printContent = document.getElementById("printDiv");
        const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
        WindowPrt.document.write(printContent.innerHTML);
        WindowPrt.document.close();
        WindowPrt.focus();
        WindowPrt.print();
    }
    addWorkDone(treatmentid: any, estamount: any, toothNumber: any, job: any, doctorName: any,  doctor:any ,workdones:any, treatment_Status:any) {
        this.getDoctors();
        this.treatment.doctor_Id = doctor;
        this.treatmentId = treatmentid;
        this.workdone.estimated_Amount = estamount;
        this.workdone.doctor_Id = doctor;
        this.workdone.workdone_Status = treatment_Status;
        // this.workdone.realized_Treatment_Cost = workdones.length > 0 ? workdones[workdones.length-1].totalAmt: 0;
        this.toothNumber = toothNumber;
        this.job = job;
        this.workdoneForm.controls.current_Work_Amt.setValue(this.rows.find(x=>x.id === this.treatmentId).amtDueCurrentWork);
        this.workdoneForm.controls.discount.setValue(this.rows.find(x=>x.id === this.treatmentId).discount);
        this.workdoneForm.controls.workdone_Notes.setValue(this.paymentData.find(x=>x.workdoneId === this.treatmentId).description);
        this.workdoneForm.controls.total_Amt.setValue(this.workdoneForm.controls.current_Work_Amt.value - this.workdoneForm.controls.discount.value);
        this.workdoneForm.controls.realized_Treatment_Cost.setValue(workdones.length > 0 ? workdones[workdones.length-1].totalAmt: 0);
        this.receiveElm.classList.add('show');
        this.receiveElm.style.width = '100vw';
    }
    treatment: any = { sitting_Status: 0, id: 0, job: '', type: '', teeth_id: '' }
    
    chamgeStatus(status: number) {
        this.workdoneStatus = status;
    }
    get f() {
        return this.workdoneForm.controls;
    }
    getDoctors() {
        this._patientListService.getDoctors().pipe().subscribe((response) => {
            this.doctors = response;
        });
    }
    getTreatmentList() {
        this.loading = true;
        this._patientListService.getTreatmentPalnList(this.patientId).subscribe(response => {
            this.treatmentData = response;
        });
    }
    saveAndShowMessage() {
        this.isSaved = true;
        setTimeout(() => {
          this.isSaved = false;
        }, 5000);
      }
      
    saveWorkDoneForm() {
        this.submitted = true;
        if (this.workdoneForm.invalid) {

            return;
        }
        this.workdone.workdone_Status = this.workdoneStatus;
        this.workdone.treatment_Id = this.treatmentId;
        this.loading = true;
        this._patientListService.saveWorkDone(this.workdone).pipe(catchError((error) => {
            this.loading = false;
            this.error = error;
            return '';
        })).subscribe((response) => {
            this.workdoneid = response;
            this.workdoneForm.controls.doctor_Id.disable();
            this.workdoneForm.controls.discount.disable();
            this.workdoneForm.controls.current_Work_Amt.disable();
            this.workdoneForm.controls.total_Amt.disable();
            this.workdoneForm.controls.workdone_Status.disable();
            this.workdoneForm.controls.workdone_Notes.disable();

            //this.receiveElm.classList.remove('show');
            //this.receiveElm.classList.remove('show');
            //setTimeout(() => {
            //    this.receiveElm.style.width = '0';
            //}, 75);
            this.isWorkdonesave = true;
            this.loading = false;
        
        });
        //this.loading = true;
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
    patientId: any = 0;
    ngOnInit(): void {
        this.workdoneForm = this._formBuilder.group({
            doctor_Id: ['', Validators.required],
            current_Work_Amt: ['', Validators.required],
            discount: [''],
            total_Amt: [''],
            estimated_Amount: [''],
            realized_Treatment_Cost:[''],
            workdone_Status: [''],
            workdone_Notes: [''],
        });
        this.patientId = this._route.snapshot.paramMap.get('id');
        this.getPaymentData();
        this.getTreatmentList();      
        this.getData();
    }
    getData() {
        this.loading = true;
        this._patientListService.getWorkDoneHistoryList(this.patientId).subscribe(response => {
            this.data = response;
            this.rows = this.data;
            this.tempData = this.rows;
            this.tempFilterData = this.rows;
            this.loading = false;
        })

    }
    getPaymentData() {
        this.loading = true;
        this._patientListService.getPaymentList(this.patientId).subscribe(response => {
            this.paymentData = response;
           
        });
    }
    close(): void {
        this.receiveElm.classList.remove('show');
        setTimeout(() => {
            this.receiveElm.style.width = '0';
        }, 75);
    }

    chngCurrentwork(ev: { target: { value: string; }; }) {
        this.currentAmount = parseInt(ev.target.value)
        if (this.workdone.discount == 0) {
            this.workdone.total_Amt = this.currentAmount;
        }
        else {
            this.workdone.total_Amt = this.currentAmount - this.workdone.discount;
        }
    }
    chngDiscount(ev: { target: { value: string; }; }) {
        var discount = parseInt(ev.target.value)

        if (this.currentAmount > 0 && discount > 0) {
            this.workdone.total_Amt = this.currentAmount - discount;
        }
    }
    delete(id: any) {
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
                            this.getData();
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
