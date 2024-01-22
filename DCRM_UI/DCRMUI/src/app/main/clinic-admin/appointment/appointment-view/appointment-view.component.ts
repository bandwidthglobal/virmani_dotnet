import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { repeaterAnimation } from 'app/main/apps/invoice/invoice.animation';
import { AppointmentEditService } from '../appointment-edit/appointment-edit.service';
import { AppointmentFormService } from '../appointment-form/appointment-form.service';

@Component({
    selector: 'app-appointment-view',
    templateUrl: './appointment-view.component.html',
    styleUrls: ['./appointment-view.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})

export class AppointmentViewComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    appointmentDetails: any;
    loading: any;
    IPatients: Array<any> = [];
    IDoctors: Array<any> = [];
    IChairList: Array<any> = [];
    Patient:any;
    chair:any;

    constructor(
        private router: Router,
        private _route: ActivatedRoute,
        private _appointmentViewService: AppointmentEditService ,
        private _appointmentFormService: AppointmentFormService 

    ) {

        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        const appointmentId = this._route.snapshot.params['id'];

        this._appointmentViewService.getAppointmentData(appointmentId)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((response: any) => {
            this.appointmentDetails = response;
            this._appointmentFormService.getIPatientsById( this.appointmentDetails.patient_Id).subscribe((response) => {
                this.Patient = response;
    
            });
        });

        this._appointmentFormService.getIDoctors().pipe().subscribe((response) => {
            this.IDoctors = response;
            this.appointmentDetails.doctor_Name = this.IDoctors.find(x=> x.id === this.appointmentDetails.doctor_Id).name;
 });
        this._appointmentFormService.getIChairList().pipe().subscribe((response) => {           
        this.IChairList = response;
        this.chair = this.IChairList.find(x=> x.id == this.appointmentDetails.chair).name;
    });
}

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    redirect() {
        const returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/appointment/list';
        this.router.navigateByUrl(returnUrl);
    }

     printDiv() {
        const printContent = document.getElementById("printDiv");
        const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
        WindowPrt.document.write(printContent.innerHTML);
        WindowPrt.document.close();
        WindowPrt.focus();
        WindowPrt.print();
    }
}

