import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { repeaterAnimation } from "../staff.animation";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from 'rxjs';

@Component({
    selector: 'app-staff-add',
    templateUrl: './staff-add.component.html',
    styleUrls: ['./staff-add.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class StaffAddComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any>;
    returnUrl: string;

    constructor(
        private router: Router,
        private _route: ActivatedRoute
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
        this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/staff/list';
        this.router.navigateByUrl(this.returnUrl);
    }
}
