import { Component, OnInit, ViewEncapsulation } from '@angular/core';


@Component({
    selector: 'app-digitaldata',
    templateUrl: './digitaldata.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DigitaldataComponent implements OnInit {
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
