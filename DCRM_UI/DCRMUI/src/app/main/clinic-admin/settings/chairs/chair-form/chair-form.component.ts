import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { repeaterAnimation } from 'app/main/forms/form-repeater/form-repeater.animation';
import { ChairFormService } from 'app/main/clinic-admin/settings/chairs/chair-form/chair-form.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ChairFormModel } from './chair-form.model';

@Component({
    selector: 'app-chair-form',
    templateUrl: './chair-form.component.html',
    styleUrls: ['./chair-form.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class ChairFormComponent implements OnInit, OnDestroy {
    // public
    public apiData;
    public sidebarToggleRef = false;
    public invoiceSelect;
    public invoiceSelected;
    isEdit = false;
    chairId = 0;
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public error = '';
    doctorNameList: any;
    public chairForm: UntypedFormGroup;
    public chairModel: ChairFormModel = {
        id: 0,
        name: "",
        appoinment_Limit: "",
        doctor_Id: 0,
        status: "",
        address: "",
        uid:''
    }

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {InvoiceAddService} _invoiceAddService
     * @param {CoreSidebarService} _coreSidebarService
     */
    constructor(private _chairFromService: ChairFormService, private _coreSidebarService: CoreSidebarService, private route: ActivatedRoute
        , private _formBuilder: UntypedFormBuilder, private router: Router,) {
        this._unsubscribeAll = new Subject();
    }


    /**
     * Toggle Sidebar
     *
     * @param name
     */
    toggleSidebar(name) {
        this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
    }
    ngOnInit(): void {
        this.getDoctors();
        this.chairForm = this._formBuilder.group({
            name: ['', Validators.required],
            doctor_Id: ['', Validators.required],
            appoinment_Limit: ['', Validators.required],
            status: ['', Validators.required],
            address: [''],
            
        });
        const id = this.route.snapshot.paramMap.get('id');
        if (id != undefined && id != null) {
            this.chairId = parseInt(id);
        }
        if (this.chairId > 0) {
            this.isEdit = true;
            this._chairFromService.getChair(this.chairId).subscribe(response => {
                this.apiData = response;
                this.chairModel.address = this.apiData.address;
                this.chairModel.doctor_Id = this.apiData.doctor_Id;
                this.chairModel.name = this.apiData.name;
                this.chairModel.appoinment_Limit = this.apiData.appoinment_Limit;
                this.chairModel.status = this.apiData.status;
            })
        }
    }
    getDoctors() {
        this._chairFromService.getDoctors().subscribe(response => {
            this.doctorNameList = response;
        })
    }
    get f() {
        return this.chairForm.controls;
    }
    onSubmit() {
        this.submitted = true;

        if (this.chairForm.invalid) {
            return;
        }
        this.loading = true;
        this.chairModel.id = this.chairId;
        this._chairFromService
            .getSaveChair(this.chairId,this.chairModel)
            .pipe()
            .subscribe(
                data => {
                    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/settings/chair/list';
                    this.router.navigateByUrl(this.returnUrl);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            );
    }
    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
