import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { repeaterAnimation } from 'app/main/apps/invoice/invoice.animation';
import { DealerEditService } from './dealer-edit.service';

@Component({
  selector: 'app-dealer-edit',
  templateUrl: './dealer-edit.component.html',
  styleUrls: ['./dealer-edit.component.scss'],
  animations: [repeaterAnimation],
  encapsulation: ViewEncapsulation.None
})

export class DealerEditComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;
  FormInput: any;
  returnUrl: string;

  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private _dealerEditService: DealerEditService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this._dealerEditService.onDealerEditChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      // console.log('> onDealerEditChanged ---> ', response);
      this.FormInput = response;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  redirect(event) {
    console.log('> redirect ---> ', event);
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/dealer/list';
    this.router.navigateByUrl(this.returnUrl);
  }
}