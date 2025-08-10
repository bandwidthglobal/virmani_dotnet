import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { validationMessages } from "app/shared-common/pipes/error-message";
import { ToastrService } from "ngx-toastr";
import { CommonValidationService } from "app/shared-common/services/common-validation.service";
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IAppointmentForm, IAppointmentFormModel } from "../../model/appointment-from";
import { AppointmentFormService } from "../../appointment-form/appointment-form.service";
import { User } from "app/auth/models";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-appointment-chair-form',
    templateUrl: './appointment-chair-form.component.html',
    styleUrls: ['./appointment-chair-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class AppointmentChairFormComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    currentUser: any = <User>JSON.parse(localStorage.getItem('currentUser'));
    pageTitle?: string;
    loading: boolean = false;
    submitted: boolean = false;
    error: any = '';
    returnUrl = '';
    messages = validationMessages;
    formData?: IAppointmentForm;
    @Input() FormInput?: any = new IAppointmentFormModel();
    @Input() inpuDate: '';
    @Input() inpuSlatTime?: any;
    @Input() inpuChair: '';
    @Input() FormAction?: 'add' | 'edit' = 'add';
    @Input() item = ''; 
    @Input() expectedProp: { start_Time: string, date: string, chair: string };
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();
    
    IDoctors: Array<any> = [];
    IPatients: Array<any> = [];
    IStartTimes: Array<any> = this._appointmentFormService.getIStartTimes();
    ISlotTimes: Array<any> = this._appointmentFormService.getISlotTimes();
    IChairList: Array<any> = [];
    constructor(private router: Router,
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
            this.FormInput.end_Time = endTime.getHours()+":"+ (endTime.getMinutes() + 15)+":00";
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

    saveForm(): void {
       
        this.submitted = true;
        this._commonValidationService.validateAllFormFields(this.formData);
        if (this.formData.invalid) {
            return;
        } else {
            const payload: any = this.formData.getRawValue();
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
    close() {
        this.router.navigate(['/admin/appointment/chairview']);
    }
};