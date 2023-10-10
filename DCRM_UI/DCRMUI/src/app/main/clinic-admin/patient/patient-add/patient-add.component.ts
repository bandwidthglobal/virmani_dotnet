import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-patient-add',
    templateUrl: './patient-add.component.html',
    styleUrls: ['./patient-add.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class PatientAddComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    returnUrl: string;

    constructor(
        private router: Router,
        private _route: ActivatedRoute,
    ) {
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void { }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    redirect(event) {
        console.log('> redirect ---> ', event);
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/patient/list';
        this.router.navigateByUrl(this.returnUrl);
    }
    
};