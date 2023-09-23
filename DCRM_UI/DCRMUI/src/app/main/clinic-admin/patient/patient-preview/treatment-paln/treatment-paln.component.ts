import { Component, OnInit, ViewEncapsulation } from '@angular/core';



@Component({
    selector: 'app-treatment-paln',
    templateUrl: './treatment-paln.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TreatmentPalnComponent implements OnInit {
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

  ngOnInit(): void {
   
  }
}
