import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from 'rxjs';
import { repeaterAnimation } from "../doctor.animation";

@Component({
  selector: 'app-doctor-add',
  templateUrl: './doctor-add.component.html',
  styleUrls: ['./doctor-add.component.scss'],
  animations: [repeaterAnimation],
  encapsulation: ViewEncapsulation.None
})
export class DoctorAddComponent implements OnInit, OnDestroy {
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
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/doctor/list';
    this.router.navigateByUrl(this.returnUrl);
  }
}
