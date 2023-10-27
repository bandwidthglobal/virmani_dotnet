import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { repeaterAnimation } from 'app/main/apps/invoice/invoice.animation';
import { StaffEditService } from "./staff-edit.service";

@Component({
    selector: 'app-staff-edit',
    templateUrl: './staff-edit.component.html',
    styleUrls: ['./staff-edit.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})

export class StaffEditComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    FormInput: any;
    returnUrl: string;

    constructor(
        private router: Router,
        private _route: ActivatedRoute,
        private _staffEditService: StaffEditService
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this._staffEditService.onEditChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            // console.log('> onDealerEditChanged ---> ', response);
            response.staffBankDetail = response.staffBankList;
            response.staffInsuranceDetail = response.staffInsuranceList;
            response.staffVaccination = response.staffVaccinationList;
            this.FormInput = response;
            debugger;
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    redirect(event) {
        console.log('> redirect ---> ', event);
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/stafff/list';
        this.router.navigateByUrl(this.returnUrl);
    }
}
