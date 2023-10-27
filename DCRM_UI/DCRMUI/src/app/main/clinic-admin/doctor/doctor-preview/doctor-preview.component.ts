import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { repeaterAnimation } from 'app/main/clinic-admin/doctor/doctor.animation';
import { DoctorPreviewService } from 'app/main/clinic-admin/doctor/doctor-preview/doctor-preview.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-doctor-preview',
    templateUrl: './doctor-preview.component.html',
    styleUrls: ['./doctor-preview.component.scss'],
    animations: [repeaterAnimation],
    encapsulation: ViewEncapsulation.None
})
export class DoctorPreviewComponent implements OnInit, OnDestroy {


    public url = this.router.url;
    public doctor;
    private _unsubscribeAll: Subject<any>;
    constructor(
        private router: Router,
        private _drugPreviewService: DoctorPreviewService, private _formBuilder: UntypedFormBuilder, private _route: ActivatedRoute, private _toastrService: ToastrService) {
        this._unsubscribeAll = new Subject();
    }
    ngOnInit(): void {
        this._drugPreviewService.onDoctorPreviewChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.doctor = response;
            debugger;
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
