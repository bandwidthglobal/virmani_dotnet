import { Component, OnDestroy, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from '@core/services/config.service';
import { PatientPreviewService } from 'app/main/clinic-admin/patient/patient-preview/patient-preview.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { DigitalDataService } from '../digitaldata/digitaldata.service';
import Swal from 'sweetalert2';
import { validationMessages } from 'app/shared-common/pipes/error-message';
import { CommonValidationService } from 'app/shared-common/services/common-validation.service';
import { catchError } from 'rxjs/operators';
import { DigitalDataForm, DigitalDataFormModel } from './digital-from';

@Component({
    selector: 'app-digitaldata',
    templateUrl: './digitaldata.component.html',
    styleUrls: ['./digitaldata.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DigitaldataComponent implements OnInit, OnDestroy {
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
    // private
    apiData: any;
    private tempData = [];
    private _unsubscribeAll: Subject<any>;
    public rows;
    public tempFilterData;
    public previousStatusFilter = '';
    public patientId = 0;
    /*loading: boolean = false;*/
    submitted: boolean = false;
    // error: any = '';
    messages = validationMessages;
    formData?: DigitalDataForm;
    @Input() FormInput?: DigitalDataFormModel = {
        patient_Id: 0,
    };
    @Input() FormAction?: 'add' | 'edit' = 'add';
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();
    public isDataEmpty;

    public tags;
    public selectTags;
    public selectAssignee;
    base64ImagePreview: string | ArrayBuffer | null = null;
    isOpen: boolean = true;
    @ViewChild('myModal', { static: false }) myModal: ElementRef;
    elm: HTMLElement;
    @ViewChild('digitalPreviewModal', { static: false }) digitalPreviewModal: ElementRef;
    elm1: HTMLElement;
    /**
     * Constructor
     *
     * @param {CoreSidebarService} _coreSidebarService
     * @param {CalendarService} _calendarService
     */
    constructor(private _digitalDataService: DigitalDataService, private modalService: NgbModal, private _patientListService: PatientPreviewService,
        private _coreConfigService: CoreConfigService, private _route: ActivatedRoute, private _coreSidebarService: CoreSidebarService
        , private _commonValidationService: CommonValidationService, private _digitalDataFormService: DigitalDataService) {
        this._unsubscribeAll = new Subject();
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    filterUpdate(event) {

        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.tempData.filter(function (d) {
            return d.scan_Name.toLowerCase().indexOf(val) !== -1
                || d.type.toLowerCase().indexOf(val) !== -1
                || d.created_At.toLowerCase().indexOf(val) !== -1
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
    files: any;
    base64Image: string | ArrayBuffer | null = null;
    convertToBase64(event: any) {
        const file = event.target.files[0];
        this.files = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.base64Image = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
    ngOnInit(): void {
        this.getData();
        this.formData = new DigitalDataForm(this.FormInput);
    }
    getData() {
        this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
            // If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
            if (config.layout.animation === 'zoomIn') {
                setTimeout(() => {

                    this._patientListService.onScansChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
                        this.data = response;
                        this.rows = this.data;
                        this.tempData = this.rows;
                        this.tempFilterData = this.rows;
                        if (response.length > 0) {
                            this.patientId = response[0].patient_Id
                        }
                    });
                }, 450);
            } else {
                this._patientListService.onScansChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
                    this.data = response;
                    this.rows = this.data;
                    this.tempData = this.rows;
                    this.tempFilterData = this.rows;
                    debugger;
                    if (response.length > 0) {
                        this.patientId = response[0].patient_Id
                    }

                });
            }
        });
    }
    getgetDigitalList() {
        this._patientListService.getDigitalList(this.patientId).subscribe(response => {
            this.data = response;
            this.rows = this.data;
            this.tempData = this.rows;
            this.tempFilterData = this.rows;
            
        })
    }
    toggleSidebar(nameRef): void {
        localStorage.setItem('patientId', this.patientId.toString())
        this.elm1.classList.add('show');
        this.elm1.style.width = '100vw';
    }
    toggleSidebarPreview(nameRef): void {
        this._coreSidebarService.getSidebarRegistry(nameRef).toggleOpen();
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
                this._digitalDataService
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
        this.elm = this.myModal.nativeElement as HTMLElement;
        this.elm1 = this.digitalPreviewModal.nativeElement as HTMLElement;
    }
    preview(id): void {
        this._digitalDataService.getData(id).subscribe(resp => {
            this.apiData = resp;
            this.base64ImagePreview = resp.report_File;
            this.elm.classList.add('show');
            this.elm.style.width = '100vw';
        });

    }
    close(): void {
        this.elm.classList.remove('show');
        this.elm1.classList.remove('show');
        setTimeout(() => {
            this.elm.style.width = '0';
        }, 75);
        setTimeout(() => {
            this.elm1.style.width = '0';
        }, 75);
    }
    saveForm(): void {
        this.submitted = true;
        this._commonValidationService.validateAllFormFields(this.formData);
        if (this.formData.invalid) {
            // console.log('> invalidForm ---> ', this.formData);
            return;
        } else {
            const payload: any = this.formData.getRawValue();
            payload.report_File = this.base64Image;
            payload.patient_Id = localStorage.getItem('patientId').toString();

            this.loading = true;
            this._digitalDataFormService.save(payload, this.FormAction).pipe(catchError((error) => {
                this.loading = false;
                this.error = error;
                this.callBackEvent.emit({
                    status: 'failure',
                    data: error,
                    page: this.FormAction,
                });
                return '';
            })).subscribe((response) => {
                this.loading = false;
                this.getgetDigitalList();
                this.elm1.classList.remove('show');
                this.elm1.style.width = '0';
            });
        }
    }

}
