import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SetSscheduleFormService } from './set-schedule-form.service';

@Component({
    selector: 'app-set-schedule-form',
    templateUrl: './set-schedule-form.component.html',
    styleUrls: ['./set-schedule-form.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SetSscheduleFormComponent implements OnInit, OnDestroy {
    // Public
    public url = this.router.url;
    public urlLastValue;
    public druFromData:any;
    public sidebarToggleRef = false;
    public paymentSidebarToggle = false;
    public items = [{ itemId: '', itemName: '', itemQuantity: '', itemCost: '' }];
    public invoiceSelect;
    public invoiceSelected;
    public drugForm: UntypedFormGroup;
    public loading = false;
    public submitted = false;
    public returnUrl: string;
    public error = '';
    medicinBrands: any;
    medicinCategories: any;
    isEdit = false;
    drugId = 0;
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
        private router: Router,
        private _drugFormService: SetSscheduleFormService, private _formBuilder: UntypedFormBuilder, private _route: ActivatedRoute, private _toastrService: ToastrService) {
        this._unsubscribeAll = new Subject();
    }

    /**
     * On init
     */
    ngOnInit(): void {
        const id = this._route.snapshot.paramMap.get('id');
        //if (id != undefined && id != null) {
        //    this.drugId = parseInt(id);
        //}
        //if (this.drugId > 0) {
        //    this.isEdit = true;

        //    this._drugFormService.onDrugChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
        //        this.drug = response;
        //        this.base64Image = this.drug.medicine_Image;
        //    });
        //}
        //this._drugFormService.onMedicinBrandChanged.subscribe(res => (this.medicinBrands = res));
        //this._drugFormService.onMedicinCategoriesChanged.subscribe(res => (this.medicinCategories = res));
        //this.drugForm = this._formBuilder.group({
        //    medicinecompany: ['', Validators.required],
        //    medicinetype: ['', Validators.required],
        //    basicsalt: ['', Validators.required],
        //    form: ['', Validators.required],
        //    dosage: ['', Validators.required],
        //    doseno: ['', Validators.required],
        //    details: ['', Validators.required],
        //    category: ['', Validators.required],
        //    brand: ['', Validators.required],
        //});
    }
    //files: any;
    //base64Image: string | ArrayBuffer | null = null;
    //// imagePreviewUrl: string | ArrayBuffer | null = null;
    //convertToBase64(event: any) {
    //    const file = event.target.files[0];
    //    this.files = event.target.files;
    //    if (file) {
    //        const reader = new FileReader();
    //        reader.onload = (e: any) => {
    //            this.base64Image = e.target.result;
    //        };
    //        // reader.onload = (e: any) => {
    //        //   this.imagePreviewUrl = e.target.result;
    //        //   this.base64Image = e.target.result;
    //        // };
    //        reader.readAsDataURL(file);
    //        //reader.readAsDataURL(this.selectedImage);
    //    }
    //}
    //get f() {
    //    return this.drugForm.controls;
    //}
    //onCategorySelected(ob) {

    //}
    //onBrandSelected(ob) {

    //}
    //cancel() {
    //    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/drug/list';
    //    this.router.navigateByUrl(this.returnUrl);
    //}
    //onSubmit() {
    //    this.submitted = true;

    //    if (this.drugForm.invalid) {
    //        return;
    //    }
    //    this.drug.id = this.drugId;
    //    this.drug.medicine_Image = this.base64Image
    //    this.loading = true;
    //    debugger;
    //    this._drugFormService
    //        .saveForm(this.drug)
    //        .pipe()
    //        .subscribe(
    //            data => {
    //                this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/admin/drug/list';
    //                this.router.navigateByUrl(this.returnUrl);
    //            },
    //            error => {
    //                this.error = error;
    //                this.loading = false;
    //            }
    //        );
    //}
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
