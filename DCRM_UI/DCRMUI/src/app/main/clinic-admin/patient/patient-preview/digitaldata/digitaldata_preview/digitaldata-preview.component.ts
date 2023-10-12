import {Component, OnDestroy, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { DigitalDataForm, DigitalDataFormModel } from '../digitaldata-add/Model/digital-from';
import { validationMessages } from 'app/shared-common/pipes/error-message';
import { CommonValidationService } from 'app/shared-common/services/common-validation.service';
import { DigitalDataService } from '../digitaldata.service';
import { catchError } from 'rxjs/operators';



@Component({
  selector: 'app-digitaldata-preview',
    templateUrl: './digitaldata-preview.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DigitaldataPreviewComponent implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any>;

    loading: boolean = false;
    submitted: boolean = false;
    error: any = '';
    messages = validationMessages;
    formData?: DigitalDataForm;
    @Input() FormInput?: DigitalDataFormModel = {
        patient_Id: 0,
    };
    @Input() FormAction?: 'add' | 'edit' = 'add';
    @Output() callBackEvent: EventEmitter<any> = new EventEmitter<any>();
  public isDataEmpty;
 
  public tags;
  public selectTags;
  public selectAssignee;

  public dueDateOptions = {
    altInput: true,
    mode: 'single',
    altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
    altFormat: 'F j, Y',
    dateFormat: 'Y-m-d'
  };

  /**
   * Constructor
   *
   * @param {TodoService} _todoService
   * @param {CoreSidebarService} _coreSidebarService
   */
    constructor(private _digitalDataFormService: DigitalDataService,private _coreSidebarService: CoreSidebarService, private _commonValidationService: CommonValidationService) {}
    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Close Sidebar
   */
    closePreviewSidebar() {
        this._coreSidebarService.getSidebarRegistry('digitaldata-preview-sidebar').toggleOpen();
  }

    files: any;
    base64Image: string | ArrayBuffer | null = null;
    convertToBase64(event: any) {
        const file = event.target.files[0];
        this.files = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                this.base64Image = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }
    ngOnInit(): void {
        this.formData = new DigitalDataForm(this.FormInput);
    }
    saveForm(): void {
        this.submitted = true;
        this._commonValidationService.validateAllFormFields(this.formData);
        if (this.formData.invalid) {
            // console.log('> invalidForm ---> ', this.formData);
            return;
        } else {
            const payload: any = this.formData.getRawValue();
            payload.report_File = this.base64Image;
            payload.patient_Id = localStorage.getItem('patientId').toString();
            // console.log('> saveForm ---> ', payload);
            this.loading = true;
            this._digitalDataFormService.save(payload, this.FormAction).pipe(catchError((error) => {
                // console.log('> error ---> ', error);
                this.loading = false;
                this.error = error;
                this.callBackEvent.emit({
                    status: 'failure',
                    data: error,
                    page: this.FormAction,
                });
                return '';
            })).subscribe((response) => {
                // console.log('> save ---> ', response);
                this.loading = false;
                localStorage.removeItem('patientId');
                this._coreSidebarService.getSidebarRegistry('digitaldata-add-sidebar').toggleOpen();
                this.callBackEvent.emit({
                    status: 'failure',
                    data: response,
                    page: this.FormAction,
                });
            });
        }
    }


}
