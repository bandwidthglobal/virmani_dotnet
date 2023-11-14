import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { EventRef } from 'app/main/apps/calendar/calendar.model';
import { User } from '../../models';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class CalendarService implements Resolve<any> {
    // Public
    public events;
    public calendar;
    public currentEvent;
    public tempEvents;
    rows: any;
    public onEventChange: BehaviorSubject<any>;
    public onCurrentEventChange: BehaviorSubject<any>;
    public onCalendarChange: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(private _httpClient: HttpClient) {
        this.onEventChange = new BehaviorSubject({});
        this.onCurrentEventChange = new BehaviorSubject({});
        this.onCalendarChange = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([this.getEvents(), this.getCalendar()]).then(res => {
                resolve(res);
            }, reject);
        });
    }
   

    /**
     * Get Events
     */
    getEvents(): Promise<any[]> {
        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUser.jwtToken}`
        });
        const requestOptions = { headers: headers };
        const url = `${environment.apiUrl}/Appointment/GetAppointmentWithPatient`;
        return new Promise((resolve, reject) => {
            this._httpClient.get(url, requestOptions).subscribe((response: any) => {
                this.rows = response;
                var objList = []
                for (var i = 0; i < this.rows.length; i++) {
                    let item = {
                        id: 0, url: '', title: '', start: '', end: '', allDay: true, calendar: '', extendedProps: {
                            location: '',
                            description: '',
                            addGuest: []
                        },
                        color: { primary: "#b94a48", secondary: "#b94a48" },
                        resizable: { beforeStart: true, afterEnd: true },
                        meta : { type: "calendarEvent" }
                    }
                    item.id = this.rows[i].id;
                    item.end = this.rows[i].date.split('T')[0] + ' ' + this.rows[i].end_Time;
                    item.start = this.rows[i].date.split('T')[0] + ' ' + this.rows[i].start_Time;
                    item.title = "Patient: " + this.rows[i].patient_Name + "/ Doctor: " + this.rows[i].doctor_Name + "/ End Time: " +this.rows[i].end_Time;
                    item.calendar = '';
                    item.meta = { type: "calendarEvent" }
                    item.color = { primary: "#b94a48", secondary: "#b94a48" };
                    item.allDay = false;
                    item.extendedProps = {
                        location: '',
                        description: '',
                        addGuest: []
                    };
                    objList.push(item)
                }
                this.events = objList;
                this.tempEvents = objList;
                debugger;
                this.onEventChange.next(this.events);
                resolve(this.events);
            }, reject);
        });
    }

    /**
     * Get Calendar
     */
    getCalendar(): Promise<any[]> {
        const url = `api/calendar-filter`;

        return new Promise((resolve, reject) => {
            this._httpClient.get(url).subscribe((response: any) => {
                this.calendar = response;
                this.onCalendarChange.next(this.calendar);
                resolve(this.calendar);
            }, reject);
        });
    }

    getAppointmentsRows() {
        let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
        return new Promise((resolve, reject) => {
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser.jwtToken}`
            });
            const requestOptions = { headers: headers };
            this._httpClient.get(`${environment.apiUrl}/Appointment/GetAppointmentCalendar`, requestOptions).subscribe((response: any) => {
                this.rows = response;
                var objList = []
                for (var i = 0; i < this.rows.length; i++) {
                    let item = {
                        id: 0, url: '', title: '', start: '', end: '', allDay: false, calendar: '', extendedProps: {
                            location: '',
                            description: '',
                            addGuest: []
                        }
                    }
                    item.id = this.rows[i].id;
                    item.end = (new Date(this.rows[i].end)).toString();
                    item.start = (new Date(this.rows[i].start)).toString();
                    item.title = this.rows[i].title;
                    objList.push(item)
                }
                this.events = this.rows;
                this.tempEvents = this.rows;
                //this.events = response;
                debugger;
                this.onEventChange.next(this.events);
                resolve(this.events);
            }, reject);
        });
    }
    /**
     * Create New Event
     */
    createNewEvent() {
        this.currentEvent = {};
        this.onCurrentEventChange.next(this.currentEvent);
    }

    /**
     * Calendar Update
     *
     * @param calendars
     */
    calendarUpdate(calendars) {
        const calendarsChecked = calendars.filter(calendar => {
            return calendar.checked === true;
        });

        let calendarRef = [];
        calendarsChecked.map(res => {
            calendarRef.push(res.filter);
        });

        let filteredCalendar = this.tempEvents.filter(event => calendarRef.includes(event.calendar));
        this.events = filteredCalendar;
        this.onEventChange.next(this.events);
    }

    /**
     * Delete Event
     *
     * @param event
     */
    deleteEvent(event) {
        return new Promise((resolve, reject) => {
            this._httpClient.delete('api/calendar-events/' + event.id).subscribe(response => {
                this.getEvents();
                resolve(response);
            }, reject);
        });
    }

    /**
     * Add Event
     *
     * @param eventForm
     */
    addEvent(eventForm) {
        const newEvent = new EventRef();
        newEvent.url = eventForm.url;
        newEvent.title = eventForm.title;
        newEvent.start = eventForm.start;
        newEvent.end = eventForm.end;
        newEvent.allDay = eventForm.allDay;
        newEvent.calendar = eventForm.selectlabel;
        newEvent.extendedProps.location = eventForm.location;
        newEvent.extendedProps.description = eventForm.description;
        newEvent.extendedProps.addGuest = eventForm.addGuest;
        this.currentEvent = newEvent;
        this.onCurrentEventChange.next(this.currentEvent);
        this.postNewEvent();
    }

    /**
     * Update Event
     *
     * @param eventRef
     */
    updateCurrentEvent(eventRef) {
        const newEvent = new EventRef();
        newEvent.allDay = eventRef.event.allDay;
        newEvent.id = parseInt(eventRef.event.id);
        newEvent.url = eventRef.event.url;
        newEvent.title = eventRef.event.title;
        newEvent.start = eventRef.event.start;
        newEvent.end = eventRef.event.end;
        newEvent.calendar = eventRef.event.extendedProps.calendar;
        newEvent.extendedProps.location = eventRef.event.extendedProps.location;
        newEvent.extendedProps.description = eventRef.event.extendedProps.description;
        newEvent.extendedProps.addGuest = eventRef.event.extendedProps.addGuest;
        this.currentEvent = newEvent;
        this.onCurrentEventChange.next(this.currentEvent);
    }

    /**
     * Post New Event
     */
    postNewEvent() {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/calendar-events/', this.currentEvent).subscribe(response => {
                this.getEvents();
                resolve(response);
            }, reject);
        });
    }

    /**
     * Post Updated Event
     *
     * @param event
     */
    postUpdatedEvent(event) {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/calendar-events/' + event.id, { ...event }).subscribe(response => {
                this.getEvents();
                resolve(response);
            }, reject);
        });
    }
}
