import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { CoreConfigService } from '@core/services/config.service';

import { PatientWorkdonelistService } from 'app/main/clinic-admin/report/patient-workdone-list/patient-workdone-list.service';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment'
@Component({
    selector: 'app-patient-workdone-list',
    templateUrl: './patient-workdone-list.component.html',
    styleUrls: ['./patient-workdone-list.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PatientWorkdoneListComponent implements OnInit {
    public data: any;
    public selectedOption = 10;
    public ColumnMode = ColumnMode;
    public selectedStatus = [];
    public searchValue = '';
    @ViewChild(DatatableComponent) table: DatatableComponent;
    public returnUrl: string;
    public loading = false;
    public error = '';
    private tempData = [];
    private _unsubscribeAll: Subject<any>;
    public rows: any[];
    public tempFilterData: any[];
    public previousStatusFilter = '';
    patientList: any;
    selectCustomSelected: any;
    isOpen: boolean = true;
    fromDate: any;
    toDate: any;
    patientId: any = 0;
    constructor(private router: Router, private _workListService: PatientWorkdonelistService, private _coreConfigService: CoreConfigService, private _route: ActivatedRoute) {
        this._unsubscribeAll = new Subject();
        document.title = "Patient Workdones";
    }
    filterUpdate(event: { target: { value: string; }; }) {
        const val = event.target.value.toLowerCase();
        // filter our data
        const temp = this.tempData.filter(function (d) {
            return d.id.toString().toLowerCase().indexOf(val) !== -1
                || d.date.toLowerCase().indexOf(val) !== -1
                || d.toothName.toLowerCase().indexOf(val) !== -1
                || d.doctorName.toLowerCase().indexOf(val) !== -1
                || d.notesdiagnosis.toLowerCase().indexOf(val) !== -1
                || d.treatmentCode.toLowerCase().indexOf(val) !== -1
                || d.workdoneStatus.toLowerCase().indexOf(val) !== -1
                || d.amtDueCurrentWork.toString().toLowerCase().indexOf(val) !== -1
                || !val;
        });
        this.rows = temp;
        this.table.offset = 0;
    }
    
    
    ngOnInit(): void {
        this.getPatients();
    }
    reverseAndTimeStamp(dateString: moment.MomentInput) {
        return moment(dateString).format('DD-MM-YYYY');;
    }
    searchData() {
        let fromdate = moment(this.fromDate).format('DD-MM-YYYY');
        console.log(fromdate)
        let todate = moment(this.toDate).format('DD-MM-YYYY');
        if (this.fromDate && this.toDate) {
            const selectedMembers = this.tempData.filter(m => {
                return this.reverseAndTimeStamp(m.date) >= fromdate && m.date <= todate
            }
            );
            this.rows = selectedMembers
            this.table.offset = 0;
        }
        else {
            this.rows = this.tempData;
        }
        this.table.offset = 0;
    }
    searchWorkdone(evt: any) {
        if (this.selectCustomSelected != undefined) {
            this.getData(this.selectCustomSelected);
        }
    }
    getData(id: any) {
        this.loading = true;
        this._workListService.getWorkDoneHistoryList(id).subscribe(response => {
            this.data = response;
            this.rows = this.data;
            this.tempData = this.rows;
            this.tempFilterData = this.rows;
            this.loading = false;
        })

    }
    getPatients() {
        this._workListService.getPatients().subscribe(res => {
            this.patientList = res;
            this.loading = false;
        })
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
