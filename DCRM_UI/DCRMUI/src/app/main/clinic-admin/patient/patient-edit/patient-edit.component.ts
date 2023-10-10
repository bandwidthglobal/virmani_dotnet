import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { repeaterAnimation } from '../patient.animation';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientEditService } from './patient-edit.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss'],
  animations: [repeaterAnimation],
  encapsulation: ViewEncapsulation.None
})

export class PatientEditComponent implements OnInit, OnDestroy {

  private _unsubscribeAll: Subject<any>;
  FormInput: any;
  returnUrl: string;

  constructor(
    private router: Router,
    private _route: ActivatedRoute,
    private patientEditService: PatientEditService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.patientEditService.onEditChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      // console.log('> onEditChanged ---> ', response);
      this.FormInput = response;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  redirect(event) {
    console.log('> redirect ---> ', event);
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/patient/list';
    this.router.navigateByUrl(this.returnUrl);
  }
}
