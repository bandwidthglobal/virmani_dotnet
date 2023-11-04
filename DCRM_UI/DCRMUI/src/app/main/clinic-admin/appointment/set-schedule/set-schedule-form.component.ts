import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SetSscheduleFormService } from './set-schedule-form.service';

@Component({
    selector: 'app-set-schedule-form',
    templateUrl: './set-schedule-form.component.html',
    styleUrls: ['./set-schedule-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SetSscheduleFormComponent implements OnInit, OnDestroy {
    // Public
    public url = this.router.url;
    public urlLastValue;
    public druFromData:any;
    public sidebarToggleRef = false;
    public paymentSidebarToggle = false;
    
    public drugForm: UntypedFormGroup;
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public error = '';
    all_selected_values: string[] = [];
    isEdit = false;
    drugId = 0;
    hideable_1 = true;
    hideable_2 = true;
    hideable_3 = true;
    hideable_4 = true;
    hideable_5 = true;
    hideable_6 = true;
    hideable_7 = true;
    apiData: any;
    date1: any = { start: '', end: '' }
    date2 = { start: '', end: '' }
    date3: any = { start: '', end: '' }
    date4: any = { start: '', end: '' }
    date5: any = { start: '', end: '' }
    date6: any = { start: '', end: '' }
    date7: any = { start: '', end: '' }
    

    //onChange(value: string): void {
    //    if (this.all_selected_values.includes(value)) {
    //        this.all_selected_values = this.all_selected_values.filter((item) => item !== value);
    //    } else {
    //        this.all_selected_values.push(value);
    //    }
    //    console.log(this.all_selected_values);
    //}
    // Private
    private _unsubscribeAll: Subject<any>;
    //private _formBuilder: any;

    /**
     * Constructor
     *
     * @param {Router} router
     * @param {InvoiceEditService} _invoiceEditService
     * @param {CoreSidebarService} _coreSidebarService
     */
    constructor(
        private router: Router,
        private _setSscheduleFormService: SetSscheduleFormService, private _formBuilder: UntypedFormBuilder, private _route: ActivatedRoute, private _toastrService: ToastrService) {
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        const id = this._route.snapshot.paramMap.get('id');
        this._setSscheduleFormService.getSchedule().subscribe(res => {
           
            this.apiData = res;
            for (let itme of this.apiData) {
                if (itme.day_Id == 2) {
                    this.hideable_2 = true;
                    this.date2.start = itme.start.split(' ')[0];
                    this.date2.end = itme.end.split(' ')[0];
                }
                if (itme.day_Id == 3) {
                    this.hideable_3 = true;
                    this.date3.start = itme.start.split(' ')[0];;
                    this.date3.end = itme.end.split(' ')[0];;
                }
                if (itme.day_Id == 4) {
                    this.hideable_4 = true;
                    this.date4.start = itme.start.split(' ')[0];;
                    this.date4.end = itme.end.split(' ')[0];;
                }
                if (itme.day_Id == 5) {
                    this.hideable_5 = true;
                    this.date5.start = itme.start.split(' ')[0];;
                    this.date5.end = itme.end.split(' ')[0];;
                }
                if (itme.day_Id == 6) {
                    this.hideable_6 = true;
                    this.date6.start = itme.start.split(' ')[0];;
                    this.date6.end = itme.end.split(' ')[0];;
                }
                if (itme.day_Id == 7) {
                    this.hideable_7 = true;
                    this.date7.start = itme.start.split(' ')[0];;
                    this.date7.end = itme.end.split(' ')[0];;
                }
            }
        })
    }

    onChange(event) {
        if (event.target.value == 1) {
            event.target.checked == true ? this.hideable_1 = true : this.hideable_1 = false
        }
        if (event.target.value == 2) {
            event.target.checked == true ? this.hideable_2 = true : this.hideable_2 = false
        }
        if (event.target.value == 3) {
            event.target.checked == true ? this.hideable_3 = true : this.hideable_3 = false
        }
        if (event.target.value == 4) {
            event.target.checked == true ? this.hideable_4 = true : this.hideable_4 = false
        }
        if (event.target.value == 5) {
            event.target.checked == true ? this.hideable_5 = true : this.hideable_5 = false
        }
        if (event.target.value == 6) {
            event.target.checked == true ? this.hideable_6 = true : this.hideable_6 = false
        }
        if (event.target.value == 7) {
            event.target.checked == true ? this.hideable_7 = true : this.hideable_7 = false
        }
        if (this.all_selected_values.includes(event.target.value)) {
            this.all_selected_values = this.all_selected_values.filter((item) => item !== event.target.value);
        } else {
            this.all_selected_values.push(event.target.value);
        }
    }
    ngOnDestroy(): void {
       
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
