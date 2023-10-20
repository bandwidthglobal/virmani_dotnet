import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CoreConfigService } from '@core/services/config.service';
import { ReportService } from 'app/main/clinic-admin/report/report-list.service';

@Component({
  selector: 'app-report',
  templateUrl: './report-list.component.html',
    styleUrls: ['./report-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportComponent implements OnInit {
  // Public
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
    public temp = [];
    public patientList: any;
    public doctorList: any;
    public workDoneData: any = {
        toothName: "", workDoneDate: "", treatementCode: "", doctorName: "",
        patientName: "", noteDiagnosis: "", totalAmount: "", paidAmount: "", balance:""
    };
  public searchValue = '';
    public paymentDetailsList: any;
    public isNoData: boolean = false;
  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // Private
    private tempData = [];

  private _unsubscribeAll: Subject<any>;
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('workdoneModal', { static: false }) workdoneModal: ElementRef;//RECEIVE
    workdoneElm: HTMLElement;
  /**
   * Constructor
   *
  
   * @param {ReportService} _reportService
 
   */
  constructor(
      private _reportService: ReportService,
    private _coreConfigService: CoreConfigService
  ) {
    this._unsubscribeAll = new Subject();
  }
    ngAfterViewInit(): void {
        this.workdoneElm = this.workdoneModal.nativeElement as HTMLElement;
    }

   
  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    // Reset ng-select on search

    const val = event.target.value.toLowerCase();

    // Filter Our Data
      const temp = this.tempData.filter(function (d) {
          return d.doctorName.toLowerCase().indexOf(val) !== -1
              || d.patientName.toLowerCase().indexOf(val) !== -1
              || d.paidAmount.toString().toLowerCase().indexOf(val) !== -1
              || d.toothName.toString().toLowerCase().indexOf(val) !== -1
              || !val;
    });

     
    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }
    public searchDoctorName: any = '';
    public searchPatientName: any = '';
    searchData() {
        debugger;
        let temp;
        if (this.searchDoctorName != '' || this.searchPatientName.toLowerCase() != '') {
            if (this.searchDoctorName != '' && this.searchPatientName.toLowerCase() == '') {
                temp = this.tempData.filter(u =>
                    u.doctorName.toLowerCase() == this.searchDoctorName.toLowerCase());
            }
            else if (this.searchDoctorName == '' && this.searchPatientName.toLowerCase() != '') {
                temp = this.tempData.filter(u =>
                    u.patientName.toLowerCase() == this.searchPatientName.toLowerCase());
            }
            else {
                temp = this.tempData.filter(u =>
                    u.doctorName.toLowerCase() == this.searchDoctorName.toLowerCase() && u.patientName.toLowerCase() == this.searchPatientName.toLowerCase());
            }
            this.rows = temp;
            this.table.offset = 0;
        }
        else {
            this.rows = this.tempData;
            this.table.offset = 0;
        }
        
           
           
    }
    searchDoctor(event) {
        if (event.target.options.selectedIndex > 0) {
            this.searchDoctorName = event.target.options[event.target.options.selectedIndex].text.toLowerCase();
        }
        else {
            this.searchDoctorName = '';
        }
    }
    searchPatient(event) {
        if (event.target.options.selectedIndex > 0) {
            this.searchPatientName = event.target.options[event.target.options.selectedIndex].text.toLowerCase();
        }
        else {
            this.searchPatientName = '';
        }
    }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
    ngOnInit(): void {
       
        this.getPatients();
        this.getDoctors();
    // Subscribe config change
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      //! If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
      if (config.layout.animation === 'zoomIn') {
        setTimeout(() => {
            this._reportService.onReportChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.rows = response;
                this.tempData = this.rows;
               
          });
        }, 450);
      } else {
          this._reportService.onReportChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
              this.rows = response;
          this.tempData = this.rows;
        });
      }
    });
  }
    workdoneView(id) {
        this.getWorkDoneData(id)
       
    }
    close(): void {
        this.workdoneElm.classList.remove('show');
        this.workdoneElm.classList.remove('show');
        setTimeout(() => {
            this.workdoneElm.style.width = '0';
            this.workdoneElm.style.display = 'none';
        }, 75);
    }
    getWorkDoneData(id) {
        this._reportService.getWorkDone(id).subscribe(res => {
            this.workDoneData = res;
            this.paymentDetailsList = res.paymentDetailsList;
            if (res.paymentDetailsList.length==0) {
                this.isNoData = true;
            }
            this.workdoneElm.classList.add('show');
            this.workdoneElm.style.display = 'block';
            this.workdoneElm.style.width = '100vw';
        })
    }
    getPatients() {
        this._reportService.getPatients().subscribe(res => {
            this.patientList = res;
            debugger;
        })
    }
    getDoctors() {
        this._reportService.getDoctors().subscribe(res => {
            this.doctorList = res;
        })
    }
  
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
