import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AppointmentDownloadService } from './appointment-download.service';

@Component({
  selector: 'app-appointment-download',
    templateUrl: './appointment-download.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppointmentDownloadComponent implements OnInit {
  // Public
  public calendarRef = [];
  public tempRef = [];
  public checkAll = true;
    private _unsubscribeAll: Subject<any>;
    apiData: any;
    returnUrl: string;
    loading = false;
    constructor(private _downloadService: AppointmentDownloadService, private route: ActivatedRoute) {}
    subscription: any;
    ngOnInit() {
        debugger;
        this.loading = true;
        this._downloadService.getApiData().subscribe(response => {
            this.apiData = response;

            this.loading = false;
        });
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
