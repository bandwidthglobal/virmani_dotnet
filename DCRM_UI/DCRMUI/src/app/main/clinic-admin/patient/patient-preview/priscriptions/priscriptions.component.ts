import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
    selector: 'app-priscriptions',
    templateUrl: './priscriptions.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PriscriptionsComponent implements OnInit {
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
