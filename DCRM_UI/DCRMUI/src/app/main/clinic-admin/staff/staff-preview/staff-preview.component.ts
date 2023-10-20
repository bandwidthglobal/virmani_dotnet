import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { StaffPreviewService } from 'app/main/clinic-admin/staff/staff-preview/staff-preview.service';

@Component({
    selector: 'app-staff-preview',
    templateUrl: './staff-preview.component.html',
    encapsulation: ViewEncapsulation.None
})
export class StaffPreviewComponent implements OnInit, OnDestroy {
    // Public
    public staffData;
    public loading = false;
    public returnUrl: string;
    public error = '';
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
        private _staffPreviewService: StaffPreviewService) {
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this._staffPreviewService.onStaffPreviewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.staffData = response;
            // debugger;
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
