import { Component, OnInit, ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'app-workdonehistory',
    templateUrl: './workdonehistory.component.html',
  encapsulation: ViewEncapsulation.None
})
export class WorkdoneHistoryComponent implements OnInit {
  // Public
  public calendarRef = [];
  public tempRef = [];
  public checkAll = true;

  constructor() {}

  ngOnInit(): void {
  
  }
}
