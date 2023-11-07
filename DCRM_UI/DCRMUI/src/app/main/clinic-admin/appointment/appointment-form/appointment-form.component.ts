import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { validationMessages } from "app/shared-common/pipes/error-message";
import { ToastrService } from "ngx-toastr";
import { CommonValidationService } from "app/shared-common/services/common-validation.service";
import { Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IAppointmentForm, IAppointmentFormModel } from "../model/appointment-from";
import { AppointmentFormService } from "./appointment-form.service";
import { User } from "app/auth/models";
import { WaitingRoomService } from "../waiting-room/waiting-room.service";
import { Router } from "@angular/router";
import { debug } from "console";
import { Validators } from "@angular/forms";

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

    convertFrom24To12Format(time) {
        let hour = (time.split(':'))[0]
        let min = (time.split(':'))[1]
        let part = hour > 12 ? 'PM' : 'AM';
        if (parseInt(hour) == 0)
            hour = 12;
        min = (min + '').length == 1 ? `0${min}` : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour + '').length == 1 ? `0${hour}` : hour;
        return `${hour}:${min} ${part}`;
    }
    ngOnInit(): void {
        if (this.expectedProp != undefined) {
            this.FormInput.date = this.expectedProp.date == '' ? this._commonValidationService.dateFormat_Y_M_D(this.FormInput.date) : this.expectedProp.date;
            
            this.FormInput.start_Time = new Date("1901-01-01 " + this.expectedProp.start_Time).toTimeString().split(' ')[0];
            var endTime = new Date("1901-01-01 " + this.expectedProp.start_Time);
            this.FormInput.end_Time = endTime.getHours() + ":" + (endTime.getMinutes() + 15) + ":00";
            this.FormInput.number_Of_Slot = "1";
            this.FormInput.chair = this.expectedProp.chair.toString();

        }
        else {
            this.FormInput.date = this._commonValidationService.dateFormat_Y_M_D(this.FormInput.date);
        }
     
        this.formData = new IAppointmentForm(this.FormInput);
        
        if (this.formData.patient_Id.value == null || this.formData.patient_Id.value == 0) {
            this.formData.p_type.setValue("New Patient");
            this.formData.get('patient_name').setValidators([Validators.required])
            this.formData.get('phone').setValidators([Validators.required])
            this.formData.get('email').setValidators([Validators.required])
            this.formData.get('patient_Id').setValue(0);
        }
        else {
            this.formData.p_type.setValue("Old Patient");
            this.formData.get('phone').disable;
        }
        

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
        if (this.FormInput.patient_Id > 0) {
            this.formData.get('patient_Id').setValue(this.FormInput.patient_Id);
            this._appointmentFormService.getIPatientsById(this.FormInput.patient_Id).subscribe(res => {
                this.formData.phone.setValue(res.patientContacts[0].phone1);
                this.formData.get('phone').disable
            });
        }
        this._appointmentFormService.getIChairList().pipe().subscribe((response) => {
            this.IChairList = response;
        });
        this.formData.get('patient_Id').valueChanges.subscribe((patient_Id) => {
            this._appointmentFormService.getIPatientsById(patient_Id).subscribe(res => {
                this.formData.phone.setValue(res.patientContacts[0].phone1);
            });
            
        });

        this.formData.get('p_type').valueChanges.subscribe((type) => {
            if (type == "New Patient") {
                this.formData.get('phone').enable
                this.formData.phone.setValue('');
                this.formData.get('patient_name').setValidators([Validators.required])
                this.formData.get('phone').setValidators([Validators.required])
                this.formData.get('email').setValidators([Validators.required])
                this.formData.get('patient_Id').setValue(0);

            }
            else {
                this.formData.get('patient_Id').setValidators([Validators.required])
                this.formData.get('phone').setValidators([Validators.required])
                this.formData.get('phone').disable;
            }
        });

       
    }
   
    changeOldPatient(type) {
       
        if (type == 'old') {
            this.formData.p_type.setValue("Old Patient");
        }
        else {
            this.formData.p_type.setValue("New Patient");
        }
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
    changeAppointmentStatus(status, id, sift) {

        this.saveForm(status, id, sift)
        //this._waitingRoomService.ChangeAppointmentStatus(id.value, status).subscribe(res => {
        //    this.loading = false;
        //    this.callBackEvent.emit({
        //        status: 'failure',
        //        page: this.FormAction,
        //    });
        //    this.router.navigate(["/admin/appointment/chairview"])
        //});
    }
    saveForm(status, id, sift): void {
        this.submitted = true;
        this._commonValidationService.validateAllFormFields(this.formData);
        debugger;
        if (this.formData.invalid) {
            return;
        } else {
            //this.FormInput.patient_Id
            const payload: any = this.formData.getRawValue();
            if (this.FormInput.patient_Id>0) {
                payload.patient_Id = this.FormInput.patient_Id;
            }
            if (status != undefined) {
                payload.appointment_Status = parseInt(status);
            }
            else {
                payload.appointment_Status = 0;
            }
            
            this.loading = true;
            this._appointmentFormService.save(payload, this.FormAction).pipe(catchError((error) => {
                this.loading = false;
                this.error = error;
                this.callBackEvent.emit({
                    status: 'failure',
                    data: error,
                    page: this.FormAction,
                });
                return '';
            })).subscribe((response) => {
                this.loading = false;
                this.callBackEvent.emit({
                    status: 'failure',
                    data: response,
                    page: this.FormAction,
                });
            });
        }
    }
    patientTypeOpen(obj) {
        
    }
    close() {
        this.callBackEvent.emit({
            status: 'failure',
            page: this.FormAction,
        });
    }
};