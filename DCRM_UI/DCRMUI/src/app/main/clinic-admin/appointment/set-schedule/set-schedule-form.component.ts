import { Component, ElementRef, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { debounce, takeUntil } from 'rxjs/operators';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SetSscheduleFormService } from './set-schedule-form.service';
import { SetSscheduleFormModel, scheduledFormModel } from './set-schedule-form.model';

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
    public druFromData: any;
    public sidebarToggleRef = false;
    public paymentSidebarToggle = false;
    private _elementRef: ElementRef;
    public drugForm: UntypedFormGroup;
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public error = '';
    all_selected_values: string[] = [];
    success = '';
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
    public scheduleForm: UntypedFormGroup;

    public scheduledFormModel: scheduledFormModel = {
        start1: '',
        start2: '',
        start3: '',
        start4: '',
        start5: '',
        start6: '',
        start7: '',
        end1: '',
        end2: '',
        end3: '',
        end4: '',
        end5: '',
        end6: '',
        end7: '',
        day1: '',
        day2: '',
        day3: '',
        day4: '',
        day5: '',
        day6: '',
        day7: '',
    }
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

    getSchedule() {
        this.loading = true;
        this._setSscheduleFormService.getSchedule().subscribe(res => {
            this.loading = false;
            this.scheduledFormModel.start1 = '';
            this.scheduledFormModel.end1 = '';
            this.scheduledFormModel.day1 = '1';
            this.apiData = res;
            for (let itme of this.apiData) {
                debugger;
                if (itme.day_Id == 2) {
                    this.hideable_2 = true;
                    this.scheduledFormModel.start2 = itme.start;
                    this.scheduledFormModel.end2 = itme.end;
                    this.scheduledFormModel.day2 = '2';
                }
                
                if (itme.day_Id == 3) {
                    this.hideable_3 = true;
                    this.scheduledFormModel.start3 = itme.start.split(' ')[0];
                    this.scheduledFormModel.end3 = itme.end.split(' ')[0];
                    this.scheduledFormModel.day3 = '3';
                }

                if (itme.day_Id == 4) {
                    this.hideable_4 = true;
                    this.scheduledFormModel.start4 = itme.start.split(' ')[0];
                    this.scheduledFormModel.end4 = itme.end.split(' ')[0];
                    this.scheduledFormModel.day4 = '4';
                }
               
                if (itme.day_Id == 5) {
                    this.hideable_5 = true;
                    this.scheduledFormModel.start5 = itme.start.split(' ')[0];
                    this.scheduledFormModel.end5 = itme.end.split(' ')[0];
                    this.scheduledFormModel.day5 = '5';
                }
               
                if (itme.day_Id == 6) {
                    this.hideable_6 = true;
                    this.scheduledFormModel.start6 = itme.start.split(' ')[0];
                    this.scheduledFormModel.end6 = itme.end.split(' ')[0];
                    this.scheduledFormModel.day6 = '6';
                }
               
                if (itme.day_Id == 7) {
                    this.hideable_7 = true;
                    this.scheduledFormModel.start7 = itme.start.split(' ')[0];
                    this.scheduledFormModel.end7 = itme.end.split(' ')[0];
                    this.scheduledFormModel.day7 = '7';
                }
                
            }
            //var abc = this.setscheduleForm;
          
        })
    }
    ngOnInit(): void {
        this.getSchedule();
        this.scheduleForm = this._formBuilder.group({
            start1: [''],
            start2: [''],
            start3: [''],
            start4: [''],
            start5: [''],
            start6: [''],
            start7: [''],
            end1: [''],
            end2: [''],
            end3: [''],
            end4: [''],
            end5: [''],
            end6: [''],
            end7: [''],
            day1: [''],
            day2: [''],
            day3: [''],
            day4: [''],
            day5: [''],
            day6: [''],
            day7: [''],
        });

    }

    getDayTime(dayId) {
       /* this._setSscheduleFormService.getSchedule().subscribe(res => {*/
            this.loading = false;
        debugger;
        this.apiData;
        for (let itme of this.apiData) {

            if (itme.day_Id == dayId) {
                    this.hideable_2 = true;
                    this.scheduledFormModel.start2 = itme.start;
                    this.scheduledFormModel.end2 = itme.end;
                    this.scheduledFormModel.day2 = '2';
                }

            if (itme.day_Id == dayId) {
                    this.hideable_3 = true;
                    this.scheduledFormModel.start3 = itme.start.split(' ')[0];
                    this.scheduledFormModel.end3 = itme.end.split(' ')[0];
                    this.scheduledFormModel.day3 = '3';
                }

            if (itme.day_Id == dayId) {
                    this.hideable_4 = true;
                    this.scheduledFormModel.start4 = itme.start.split(' ')[0];
                    this.scheduledFormModel.end4 = itme.end.split(' ')[0];
                    this.scheduledFormModel.day4 = '4';
                }

            if (itme.day_Id == dayId) {
                    this.hideable_5 = true;
                    this.scheduledFormModel.start5 = itme.start.split(' ')[0];
                    this.scheduledFormModel.end5 = itme.end.split(' ')[0];
                    this.scheduledFormModel.day5 = '5';
                }

            if (itme.day_Id == dayId) {
                    this.hideable_6 = true;
                    this.scheduledFormModel.start6 = itme.start.split(' ')[0];
                    this.scheduledFormModel.end6 = itme.end.split(' ')[0];
                    this.scheduledFormModel.day6 = '6';
                }

            if (itme.day_Id == dayId) {
                    this.hideable_7 = true;
                    this.scheduledFormModel.start7 = itme.start.split(' ')[0];
                    this.scheduledFormModel.end7 = itme.end.split(' ')[0];
                    this.scheduledFormModel.day7 = '7';
                }

        } 
            //var abc = this.setscheduleForm;
            debugger;
       /* })*/
    }
    onChange(event) {
       
        if (event.target.value == 1) {
            if (event.target.checked == true) {
                this.hideable_1 = true
               
            }
            else {
                this.hideable_1 = false
            }
           /* event.target.checked == true ? this.hideable_1 = true : this.hideable_1 = false*/
        }
        if (event.target.value == 2) {
            if (event.target.checked == true) {
                debugger;
                this.hideable_2 = true
                //this.getDayTime(event.target.value);
            }
            else {
                this.hideable_2 = false
               
                //this.scheduledFormModel.start2 = "";
                //this.scheduledFormModel.end2 = "";
            }
           /* event.target.checked == true ? this.hideable_2 = true : this.hideable_2 = false*/
        }
        if (event.target.value == 3) {
            if (event.target.checked == true) {
                this.hideable_3 = true

            }
            else {
                this.hideable_3 = false
                //this.getDayTime(event.target.value);
            }
        }
        if (event.target.value == 4) {
            if (event.target.checked == true) {
                this.hideable_4 = true

            }
            else {
                this.hideable_4 = false
                this.getDayTime(event.target.value);
            }
        }
        if (event.target.value == 5) {
            if (event.target.checked == true) {
                this.hideable_5 = true

            }
            else {
                this.hideable_5 = false
                this.getDayTime(event.target.value);
            }
        }
        if (event.target.value == 6) {
            if (event.target.checked == true) {
                this.hideable_6 = true

            }
            else {
                this.hideable_6 = false
                this.getDayTime(event.target.value);
            }
        }
        if (event.target.value == 7) {
            if (event.target.checked == true) {
                this.hideable_7 = true

            }
            else {
                this.hideable_7 = false
                this.getDayTime(event.target.value);
            }
        }

        debugger;
    }
    get f() {
        return this.scheduleForm.controls;
    }
    onSubmit() {
        this.success = '';
        this.error = '';
        this.submitted = true;
        this.loading = true;
        if (this.scheduleForm.invalid) {
            return;
        }
        debugger;
        this._setSscheduleFormService
            .saveForm(this.scheduledFormModel)
            .pipe()
            .subscribe(
                data => {
                    this.success = "Schedule updated successfully";
                    this.getSchedule();
                    this.loading = false;
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }
    ngOnDestroy(): void {

        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
