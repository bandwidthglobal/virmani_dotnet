import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientPreviewService } from '../patient-preview.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
}
