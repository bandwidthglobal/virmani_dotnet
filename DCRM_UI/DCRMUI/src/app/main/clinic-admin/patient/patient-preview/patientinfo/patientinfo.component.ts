import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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

  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {CalendarService} _calendarService
   */
  constructor() {}

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
    ngOnInit(): void {
       
    // Subscribe to Calendar changes
    //this._calendarService.onCalendarChange.subscribe(res => {
    //  this.calendarRef = res;
    //});
  }
}
