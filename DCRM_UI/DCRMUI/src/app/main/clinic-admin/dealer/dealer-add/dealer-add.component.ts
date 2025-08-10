import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { repeaterAnimation } from 'app/main/forms/form-repeater/form-repeater.animation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dealer-add',
  templateUrl: './dealer-add.component.html',
  styleUrls: ['./dealer-add.component.scss'],
  animations: [repeaterAnimation],
  encapsulation: ViewEncapsulation.None
})

export class DealerAddComponent implements OnInit, OnDestroy {

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

  redirect(event: any) {
    console.log('> redirect ---> ', event);
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/dealer/list';
    this.router.navigateByUrl(this.returnUrl);
  }
}