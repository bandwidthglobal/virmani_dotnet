import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { Subject } from 'rxjs';
import { AppointmentChairViewService } from './chair-view.service';


import { SearchParamModel } from './search-param-model';
import { CoreLoadingScreenService } from '@core/services/loading-screen.service';

import { AppointmentEditService } from '../appointment-edit/appointment-edit.service';
import { WaitingRoomService } from '../waiting-room/waiting-room.service';
import { formatDate } from '@angular/common';
import { IAppointmentFormModel } from '../model/appointment-from';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { takeUntil } from 'rxjs/operators';
@Component({
    selector: 'app-chair-view',
    templateUrl: './chair-view.component.html',
    styleUrls: ['./chair-view.component.scss'],
    encapsulation: ViewEncapsulation.None,

})
export class AppointmentChairViewComponent implements OnInit, OnDestroy {
    // Public
    public url = this.router.url;
    public loading = true;
    public submitted = false;
    public returnUrl: string;
    public error = '';
    medicinBrands: any;
    medicinCategories: any;
    isEdit = false;
    isAdd = false;
    public Date = '';
    // private
    public data: any;
    private tempData = [];
    private _unsubscribeAll: Subject<any>;
    public rows: any[];
    public tempFilterData: any[];
    public previousStatusFilter = '';
    selectedItems = [];
    dropdownSettings = {};
    chairList:any= [];
    dropdownList = [];
    appointmentScheduleTimes: any;
    doctorList: any =[];
    FormInput: any;
    isAppontmentClose = false;
    addParam = { start_Time: '', date: '', chair: '' }
    public popupMassage = "Appointment closed in this slot";
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('appointmentModal', { static: false }) workdoneModal: ElementRef;//RECEIVE
    workdoneElm: HTMLElement;
    isChair= true;
    public searchParam: SearchParamModel = {
        doctorIds: '',
        chairIds: "",
        scheduleDate: new Date().toISOString().slice(0, 16),
    }

    /**
     * Constructor
     *
     * @param {Router} router
     * @param {InvoiceEditService} _invoiceEditService
     * @param {CoreSidebarService} _coreSidebarService
     */
    constructor(
        private router: Router,
        private _chairViewService: AppointmentChairViewService, private _route: ActivatedRoute,
        private _coreConfigService: CoreConfigService
        , private _waitingRoomServiceService: WaitingRoomService
        , private _appointmentEditService: AppointmentEditService) {
        this._unsubscribeAll = new Subject();
    }

    ngAfterViewInit(): void {
        this.workdoneElm = this.workdoneModal.nativeElement as HTMLElement;
    }
    alert_function() {

    }
    /**
     * On init
     */
    ngOnInit(): void {
        this._chairViewService.getDoctors().subscribe(response => {
            this.doctorList = response;
        });
        this._chairViewService.getChairs().subscribe(response => {
            this.chairList = response;
        });
        //const id = this._route.snapshot.paramMap.get('id');
        //var t = new Date().getDate();
        //var m = new Date().getUTCMonth();
        //var y = new Date().getFullYear();
        this.searchParam.scheduleDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
        this.loading = true;
        this.searchData();
    }
    searchData() {
        this.loading = true;
        this._chairViewService.getAppointmentChairViewSearchlist(this.searchParam).subscribe(response => {
            this.data = response;
            this.rows = this.data;
            debugger;
            if (this.chairList.length == 0) {
                this.error = "No chair found"
            }
            else {
                this.appointmentScheduleTimes = this.data.appointmentScheduleTimes
                this.tempData = this.rows;
                this.tempFilterData = this.rows;
            }
            this.loading = false;
        });
    }
    
    appointmentView(appointmentId: number, slatTime: string, chair: string, status: number) {
        this.isAppontmentClose = false;
        if (status === 2) {
            this.isAppontmentClose = true;
            this.popupMassage = "Appointment has been completed.";
            this.workdoneElm.classList.add('show');
            this.workdoneElm.style.display = 'block';
            this.workdoneElm.style.width = '100vw';
            return;
        }

        const date1 = new Date(this.searchParam.scheduleDate + " " + slatTime);
        const date2 = new Date(new Date());
       
        if (date1.getTime() < date2.getTime()) {
            this.isAppontmentClose = false;
            this.workdoneElm.classList.add('show');
            this.workdoneElm.style.display = 'block';
            this.workdoneElm.style.width = '100vw';
        } else {

            this.isAppontmentClose = false;
        }
      
        if (appointmentId > 0) {
            this._appointmentEditService.getAppointmentData(appointmentId).subscribe(response => {
                this.FormInput = response;
                this.workdoneElm.classList.add('show');
                this.workdoneElm.style.display = 'block';
                this.workdoneElm.style.width = '100vw';
                this.isEdit = true;
                this.isAdd = false;
            });
        }
        else {
            this.addParam.start_Time = slatTime;
            debugger;
            this.addParam.date = this.Date;
            this.addParam.chair = chair;
            this.isEdit = false;
            this.isAdd = true;
            this.workdoneElm.classList.add('show');
            this.workdoneElm.style.display = 'block';
            this.workdoneElm.style.width = '100vw';
        }
    }
    redirect(event) {
        this.close();
        this.searchData();

        //window.location.reload()
        //console.log('> redirect ---> ', event);
        //this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/appointment/add';
        //this.router.navigateByUrl(this.returnUrl);
    }
    printDiv() {
        const printContent = document.getElementById("printDiv");
        const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
        WindowPrt.document.write(printContent.innerHTML);
        WindowPrt.document.close();
        WindowPrt.focus();
        WindowPrt.print();
    }
    onItemSelect(item: any) {
        console.log(item);
    }
    onSelectAll(items: any) {
        console.log(items);
    }

    dateChange(evt: { target: { value: any; }; }) {
        var date = evt.target.value;
        this.Date = date;
        this.searchData()
    }
    searchAppointment() {
        this.searchData();
    }
    close(): void {
        //window.location.reload();
        this.workdoneElm.classList.remove('show');
        this.workdoneElm.classList.remove('show');
        this.isEdit = false;
        this.isAdd = false;
        setTimeout(() => {
            this.workdoneElm.style.width = '0';
            this.workdoneElm.style.display = 'none';
        }, 75);
    }
    changeAppointmentStatus(evnt: { target: { value: any; }; }, id: any) {

        this._waitingRoomServiceService.ChangeAppointmentStatus(id, evnt.target.value).subscribe(res => {
            this.searchData();
        });
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
