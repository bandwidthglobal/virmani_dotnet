import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { repeaterAnimation } from 'app/main/clinic-admin/prescription/prescription.animation';
import { PrescriptionPreviewService } from 'app/main/clinic-admin/prescription/prescription-preview/prescription-preview.service';
import { PrescriptionAddModel } from '../prescription-add/prescription-add.model';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-prescription-preview',
    templateUrl: './prescription-preview.component.html',
    styleUrls: ['./prescription-preview.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class PrescriptionPreviewComponent implements OnInit, OnDestroy {

    public prescriptionData: any;
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
        private _prescriptionPreviewService: PrescriptionPreviewService, private _formBuilder: UntypedFormBuilder, private _route: ActivatedRoute, private _toastrService: ToastrService) {
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this._prescriptionPreviewService.onPrescriptionChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.prescriptionData = response;
            debugger;

        });
    }
    printDiv() {
        const printContent = document.getElementById("printdiv");
        const WindowPrt = window.open('', '', 'left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0');
        WindowPrt.document.write(printContent.innerHTML);
        WindowPrt.document.close();
        WindowPrt.focus();
        WindowPrt.print();
        //WindowPrt.close();
    }
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
