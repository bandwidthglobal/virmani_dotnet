import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DealerPreviewService } from 'app/main/clinic-admin/dealer/dealer-preview/dealer-preview.service';

@Component({
    selector: 'app-dealer-preview',
    templateUrl: './dealer-preview.component.html',
    styleUrls: ['./dealer-preview.service.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DealerPreviewComponent implements OnInit, OnDestroy {
    // Public
    public dealerData: any;
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
        private _dealerPreviewService: DealerPreviewService) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this._dealerPreviewService.onDealerPreviewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.dealerData = response;
            // debugger;
        });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}