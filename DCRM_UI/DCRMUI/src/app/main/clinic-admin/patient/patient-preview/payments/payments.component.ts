import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PaymentsComponent implements OnInit {
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
