import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CoreConfigService } from '@core/services/config.service';
import { PatientWorkdoneDetailsService } from '../patient-workdone-details/patient-workdone-details.service';

@Component({
    selector: 'app-patient-workdone-details',
    templateUrl: './patient-workdone-details.component.html',
    styleUrls: ['./patient-workdone-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PatientWorkdoneDetailsComponent implements OnInit {
  // Public
    public rows;
    apiData: any;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
    public temp = [];
    public patientList: any;
    public doctorList: any;
    loading = true;
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
      private _reportService: PatientWorkdoneDetailsService,
    private _coreConfigService: CoreConfigService
  ) {
    this._unsubscribeAll = new Subject();
  }
    getWorkDoneDetails() {
        this._reportService.getWorkDoneDetails().subscribe(data => {
            this.apiData = data;
            debugger;
            this.loading = false;
        })

    }
    
    printDiv() {
        const printContent = document.getElementById("dvPrint");
        const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
        WindowPrt.document.write(printContent.innerHTML);
        WindowPrt.document.close();
        WindowPrt.focus();
        WindowPrt.print();
    }
    ngOnInit(): void {
      
        this.getWorkDoneDetails();
  }
  
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
