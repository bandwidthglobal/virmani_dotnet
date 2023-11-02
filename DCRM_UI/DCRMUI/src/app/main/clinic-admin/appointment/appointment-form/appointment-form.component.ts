import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { validationMessages } from "app/shared-common/pipes/error-message";
import { ToastrService } from "ngx-toastr";
import { CommonValidationService } from "app/shared-common/services/common-validation.service";
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IAppointmentForm, IAppointmentFormModel } from "../model/appointment-from";
import { AppointmentFormService } from "./appointment-form.service";
import { User } from "app/auth/models";
import { WaitingRoomService } from "../waiting-room/waiting-room.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-appointment-form',
    templateUrl: './appointment-form.component.html',
    styleUrls: ['./appointment-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AppointmentFormComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    currentUser: any = <User>JSON.parse(localStorage.getItem('currentUser'));
    pageTitle?: string;
    loading: boolean = false;
    submitted: boolean = false;
    error: any = '';
    messages = validationMessages;
    formData?: IAppointmentForm;
    @Input() FormInput?: any = new IAppointmentFormModel();
    @Input() FormAction?: 'add' | 'edit' = 'add';
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();
    @Input() expectedProp: { start_Time: string, date: string, chair: string };
    IDoctors: Array<any> = [];
    IPatients: Array<any> = [];
    IStartTimes: Array<any> = this._appointmentFormService.getIStartTimes();
    ISlotTimes: Array<any> = this._appointmentFormService.getISlotTimes();
    IChairList: Array<any> = [];
    constructor(
        private _toastrService: ToastrService,
        private router: Router,
        private _waitingRoomService: WaitingRoomService,
        private _appointmentFormService: AppointmentFormService,
        private _commonValidationService: CommonValidationService,
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
       
        if (this.expectedProp != undefined) {
            this.FormInput.date = this.expectedProp.date == '' ? this._commonValidationService.dateFormat_Y_M_D(this.FormInput.date) : this.expectedProp.date;
            this.FormInput.start_Time = new Date("1901-01-01 " + this.expectedProp.start_Time).toTimeString().split(' ')[0];
            var endTime = new Date("1901-01-01 " + this.expectedProp.start_Time);
            this.FormInput.end_Time = endTime.getHours() + ":" + (endTime.getMinutes() + 15) + ":00";
            this.FormInput.chair = this.expectedProp.chair;

        }
        else {
            this.FormInput.date = this._commonValidationService.dateFormat_Y_M_D(this.FormInput.date);
        }
        this.formData = new IAppointmentForm(this.FormInput);
        if (this.FormAction === 'add') {
            this.pageTitle = 'Add Appointment';
        } else {
            this.pageTitle = 'Edit Appointment';
        }
        this._appointmentFormService.getIDoctors().pipe().subscribe((response) => {
            this.IDoctors = response;
        });
        this._appointmentFormService.getIPatients().pipe().subscribe((response) => {
            this.IPatients = response;
        });
        this._appointmentFormService.getIChairList().pipe().subscribe((response) => {
            this.IChairList = response;
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    changeAppointmentStatus(status, id, sift) {
      
        this._waitingRoomService.ChangeAppointmentStatus(id.value, status).subscribe(res => {
            this.router.navigate(["/admin/appointment/chairview"])
        });
    }
    saveForm(): void {
        this.submitted = true;
        this._commonValidationService.validateAllFormFields(this.formData);
        if (this.formData.invalid) {
            return;
        } else {
            const payload: any = this.formData.getRawValue();
            // console.log('> saveForm ---> ', payload);
            this.loading = true;
            this._appointmentFormService.save(payload, this.FormAction).pipe(catchError((error) => {
                // console.log('> error ---> ', error);
                this.loading = false;
                this.error = error;
                this.callBackEvent.emit({
                    status: 'failure',
                    data: error,
                    page: this.FormAction,
                });
                return '';
            })).subscribe((response) => {
                // console.log('> save ---> ', response);
                this.loading = false;
                this.callBackEvent.emit({
                    status: 'failure',
                    data: response,
                    page: this.FormAction,
                });
            });
        }
    }
};