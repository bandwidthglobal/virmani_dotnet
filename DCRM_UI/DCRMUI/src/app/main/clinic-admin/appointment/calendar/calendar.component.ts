import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';


import { CoreConfigService } from '@core/services/config.service';

import { CalendarService } from '../calendar/calendar.service';
import { EventRef } from '../calendar/calendar.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent implements OnInit, AfterViewInit {
  // Public
  public slideoutShow = false;
  public events = [];
  public event: any;
    title: any;
  public calendarOptions: CalendarOptions = {
    headerToolbar: {
      start: 'sidebarToggle, prev,next, title',
      end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
    },
    initialView: 'dayGridMonth',
    initialEvents: this.events,
    weekends: true,
    editable: true,
    eventResizableFromStart: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: 1,
    navLinks: true,
   dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleUpdateEventClick.bind(this),
      eventMouseEnter:this.onMouseOver.bind(this),
    //eventClassNames: this.eventClass.bind(this),
    select: this.handleDateSelect.bind(this),
      slotMinWidth: 1000,
      eventDidMount: this.eventDidMount.bind(this),
      //contentHeight: 1000,
      //height: 1000,
      
  };

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {CalendarService} _calendarService
   * @param {CoreConfigService} _coreConfigService
   */
  constructor(
    
    private _calendarService: CalendarService,
    private _coreConfigService: CoreConfigService
  ) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add Event Class
   *
   * @param s
   */
  eventClass(s: { event: { _def: { extendedProps: { calendar: string | number; }; }; }; }) {
    const calendarsColor = {
      Business: 'primary',
      Holiday: 'success',
      Personal: 'danger',
      Family: 'warning',
      ETC: 'info'
    };
      
    const colorName = calendarsColor[s.event._def.extendedProps.calendar];
    return `bg-light-${colorName}`;
    }
    eventDidMount(info: any) {
        
    }
    onMouseOver(eventRef: { event: { title: any; }; }) {
        this.title = eventRef.event.title;
    }
   
  /**
   * Update Event
   *
   * @param eventRef
   */
    handleUpdateEventClick(eventRef: EventClickArg) {
        if (eventRef.event.id != undefined) {
             
        }
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  toggleSidebar(name: string): void {
   
  }

  /**
   * Date select Event
   *
   * @param eventRef
   */
  handleDateSelect(eventRef: { start: string; end: string; }) {
    const newEvent = new EventRef();
      newEvent.start = eventRef.start;
      newEvent.end = eventRef.end;
      debugger;
    
    this._calendarService.onCurrentEventChange.next(newEvent);
  }
    handleDateClick(eventRef: any) {
      
        //debugger;
    }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe config change
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      if (config.layout.animation === 'zoomIn') {
        setTimeout(() => {
          this._calendarService.onEventChange.subscribe(res => {
            this.events = res;
            this.calendarOptions.events = res;
          });
        }, 450);
      } else {
        this._calendarService.onEventChange.subscribe(res => {
          this.events = res;
          this.calendarOptions.events = res;
        });
      }
    });

    this._calendarService.onCurrentEventChange.subscribe(res => {
        this.event = res;
        
    });
  }

  /**
   * Calendar's custom button on click toggle sidebar
   */
  ngAfterViewInit() {
    // Store this to _this as we need it on click event to call toggleSidebar
    let _this = this;
      this.calendarOptions.customButtons = {
         
      sidebarToggle: {
        text: '',
        click() {
          _this.toggleSidebar('calendar-main-sidebar');
        }
      }
    };
  }
}
