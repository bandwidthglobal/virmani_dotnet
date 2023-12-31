import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientPreviewService } from '../patient-preview.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-patientinfo',
    templateUrl: './patientinfo.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PatientinfoComponent implements OnInit {
  // Public
  public calendarRef = [];
  public tempRef = [];
  public checkAll = true;
    private _unsubscribeAll: Subject<any>;
    apiData: any;
    returnUrl: string;
    loading = false;
  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {CalendarService} _calendarService
   */
    constructor(private _patientPreviewService: PatientPreviewService, private route: ActivatedRoute,) {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
    subscription: any;
    ngOnInit() {
        let patientId = 0;
        this.loading = true;
        this.subscription = this.route.params.subscribe(params => {
            patientId = params['id']
        });
        this._patientPreviewService.getPatientPreview(patientId).subscribe(response => {
            this.apiData = response;
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
}
