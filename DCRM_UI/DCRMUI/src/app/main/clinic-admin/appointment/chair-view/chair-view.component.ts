import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreConfigService } from '@core/services/config.service';
import { Subject } from 'rxjs';
import { AppointmentChairViewService } from './chair-view.service';

import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { SearchParamModel } from './search-param-model';
import { CoreLoadingScreenService } from '@core/services/loading-screen.service';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';
import { elementAt, takeUntil } from 'rxjs/operators';
import { AppointmentEditService } from '../appointment-edit/appointment-edit.service';
import { formatDate } from '@angular/common';
@Component({
    selector: 'app-chair-view',
    templateUrl: './chair-view.component.html',
    styleUrls: ['./chair-view.component.scss'],
    encapsulation: ViewEncapsulation.None
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
    // private
    public data: any;
    private tempData = [];
    private _unsubscribeAll: Subject<any>;
    public rows;
    public tempFilterData;
    public previousStatusFilter = '';
    selectedItems = [];
    dropdownSettings = {};
    chairList: any;
    dropdownList = []
    FormInput: any;
    isAppontmentClose = false;
   
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();
    @ViewChild('appointmentModal', { static: false }) workdoneModal: ElementRef;//RECEIVE
    workdoneElm: HTMLElement;
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
        private _coreConfigService: CoreConfigService, private _coreLoadingScreenService: CoreLoadingScreenService, private _appointmentEditService: AppointmentEditService) {
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
        this.loading = true;
        const id = this._route.snapshot.paramMap.get('id');
        var t = new Date().getDate();
        var m = new Date().getUTCMonth();
        var y = new Date().getFullYear();
        this.searchParam.scheduleDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US') ;
        //this.dropdownSettings: IDropdownSettings = {
        //    singleSelection: false,
        //    idField: 'item_id',
        //    textField: 'item_text',
        //    selectAllText: 'Select All',
        //    unSelectAllText: 'UnSelect All',
        //    itemsShowLimit: 3,
        //    allowSearchFilter: true
        //};
        this.getData();
    }
    getData() {
        this.loading = true;
        this._chairViewService.getAppointmentChairViewlist().subscribe(response => {
            this.data = response;
            this.rows = this.data;
            debugger;
            this.chairList = this.data.chairList;
            for (var i = 0; i < this.data.chairList.length; i++) {
                let obj: any = {}
                obj.item_id = this.data.chairList[i].id;
                obj.item_text = this.data.chairList[i].name;
                this.dropdownList.push(obj)
            }
            this.tempData = this.rows;
            this.tempFilterData = this.rows;
            this.loading = false;
        });
    }
    searchData() {
        this.loading = true;
        var param = this.searchParam;
        this._chairViewService.getAppointmentChairViewSearchlist(this.searchParam).subscribe(response => {
            this.data = response;
            this.rows = this.data;
            this.chairList = this.data.chairList;
            for (var i = 0; i < this.data.chairList.length; i++) {
                let obj: any = {}
                obj.item_id = this.data.chairList[i].id;
                obj.item_text = this.data.chairList[i].name;
                this.dropdownList.push(obj)
            }
            this.tempData = this.rows;
            this.tempFilterData = this.rows;
            this.loading = false;
        });
    }
    appointmentView(appointmentId, slatTime) {

        //const date = new Date().getDate();
        //const month = new Date().getMonth()+1;
        //const year = new Date().getFullYear();
        //var todayDate = new Date(year + "-" + month + "-" + date);

        //const sdate = new Date(this.searchParam.scheduleDate).getDate();
        //const smonth = new Date(this.searchParam.scheduleDate).getMonth() + 1;
        //const syear = new Date(this.searchParam.scheduleDate).getFullYear();
        //var scheduleDate = new Date(syear + "-" + smonth + "-" + sdate);
        //alert(todayDate+"/"+ scheduleDate);
        ////const dateOne = new Date(this.searchParam.scheduleDate)
        ////const dateTwo = new Date('2021-05-10')
        ////if (dateOne == dateTwo) {
        ////    alert("=")
        ////}
        ////if (dateOne == dateTwo) {
        ////    alert("=")
        ////}
        if (this.searchParam.scheduleDate != '') {
            const appointmentDate = formatDate(this.searchParam.scheduleDate + " " + slatTime, 'yyyy-MM-dd hh:mm:ss', 'en-US');
            const todayDate = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss', 'en-US');
            let appointmentDateTime = new Date(this.searchParam.scheduleDate)
            let todayDateTime = new Date()
            if (appointmentDateTime.getTime() < todayDateTime.getTime()) {
                this.isAppontmentClose = true;
                this.workdoneElm.classList.add('show');
                this.workdoneElm.style.display = 'block';
                this.workdoneElm.style.width = '100vw';
                return false;
            }
            else{
                this.isAppontmentClose = false;
            }
          
        }
        if (appointmentId > 0) {
          
            this._appointmentEditService.getAppointmentData(appointmentId).subscribe(response => {
                this.FormInput = response;
                this.workdoneElm.classList.add('show');
                this.workdoneElm.style.display = 'block';
                this.workdoneElm.style.width = '100vw';
                this.isEdit = true;
            });
        }
        else {
            this.isEdit = false;
            this.workdoneElm.classList.add('show');
            this.workdoneElm.style.display = 'block';
            this.workdoneElm.style.width = '100vw';
        }
    }
    redirect(event) {
        console.log('> redirect ---> ', event);
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/appointment/chairview';
        this.router.navigateByUrl(this.returnUrl);
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
    dateChange(evt) {
        var date = evt.target.value;
        
        this.searchData()
    }
    searchChair() {

    }
    close(): void {
        this.workdoneElm.classList.remove('show');
        this.workdoneElm.classList.remove('show');
        setTimeout(() => {
            this.workdoneElm.style.width = '0';
            this.workdoneElm.style.display = 'none';
        }, 75);
    }
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
