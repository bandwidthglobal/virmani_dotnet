import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { PayrollServiceSplashScreenService } from '@shared/services/splash-screen';
import { environment } from '@env/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '@core/auth/auth.service';
import { PayrollServiceNotificationService } from '@shared/services/toast-notification-service';
import { PayrollServiceSessionStorageService } from '@shared/services/session-storage-service';

@Component({
  selector: 'shared-ui-file-upload',
  templateUrl: './ui-file-upload.component.html',
  styleUrls: ['./ui-file-upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SharedUiFileUploadComponent implements OnInit {
  @Input() label_name: string;
  @Input() moduleName: string = '';
  @Input() apiUrl: string = '';
  @Input() typeofInput: string = '';
  @Input() fileurl: string = '';
  @Input() unitType: string = 'MB';
  @Input() isDisabled: boolean = false;
  @Input() showButton: boolean = false;
  @Input() is_multiple: boolean = false;

  @Output() submitFileDetails = new EventEmitter<any>();
  @Input() fileType?: 'PDF' | 'XLS' | 'IMG' | 'CSV' = 'PDF';
  @Input() fileSize?: any = 0;

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    this.selectedFile(event);
  }

  @ViewChild('fileUpload') fileUpload: ElementRef;
  fileAttr = 'Choose File';
  file_size: any = 0;
  upload_file: File | null = null;
  fileExtension: string = '';
  filename: string = '';
  @Input() formData: any;
  errorRecord = [];
  fileList: File[] = [];
  listOfFiles: any[] = [];
  errorText = '';
  filesizeIncrease: boolean = false;
  fileTypeError: string = '';
  apiURL: string = environment.payrollURL;

  acceptFile: Object = {
    PDF: {
      format: '.pdf',
      valid: ['pdf'],
    },
    XLS: {
      format: '.xls, .xlsx',
      valid: ['xls', 'xlsx'],
    },
    IMG: {
      format: 'image/*',
      valid: ['jpeg', 'jpg', 'png'],
    },
    CSV: {
      format: '.csv',
      valid: ['csv'],
    },
  };

  constructor(
    private http: HttpClient,
    private _authService: AuthService,
    private _notificationService: PayrollServiceNotificationService,
    private _payrollServiceSplashScreenService: PayrollServiceSplashScreenService,
    private _sessionStorage: PayrollServiceSessionStorageService
  ) {}

  ngOnInit(): void {
    this.fileAttr = this.label_name;
  }

  selectedFile(event: FileList) {
    if (event.length > 1) {
      this.fileTypeError = 'Kindly Select only one File at the Time.';
      return;
    }
    const upload_file = event && event.item(0);
    this.upload_file = upload_file;
    this.fileExtension = upload_file.name.split('.').pop();
    this.fileTypeError = '';
    if (
      this.acceptFile[this.fileType].valid.includes(this.fileExtension) ===
      false
    ) {
      this.fileTypeError =
        'File should be only ' +
        this.acceptFile[this.fileType].valid.toString();
      return;
    }
    if (this.unitType === 'GB') {
      if ((upload_file.size / 1024 / 1024 / 1024).toFixed(2) <= this.fileSize) {
        this.uploadData();
        this.filesizeIncrease = false;
      } else {
        this.filesizeIncrease = true;
      }
    } else if (this.unitType === 'MB') {
      if ((upload_file.size / 1024 / 1024).toFixed(2) <= this.fileSize) {
        this.uploadData();
        this.filesizeIncrease = false;
      } else {
        this.filesizeIncrease = true;
      }
    } else if (this.unitType === 'KB') {
      if ((upload_file.size / 1024).toFixed(2) <= this.fileSize) {
        this.uploadData();
        this.filesizeIncrease = false;
      } else {
        this.filesizeIncrease = true;
      }
    }
  }

  uploadData() {
    const LegalEntityId =
      this._sessionStorage.getLegalEntityId() || 'NOT_FOUND';
    this.errorText = '';
    if (this.fileUpload.nativeElement.value == '') {
      this._notificationService.showNotificationMessage(
        'Error',
        'Choose the file',
        'error'
      );
      return;
    }

    let formData = this.formData;
    //console.log('> formData ---> ', formData);
    let payload = new FormData();
    payload.append('type_of_action', 'upload');
    payload.append('file', this.upload_file);
    if (this.typeofInput) {
      payload.append('type_of_option', this.typeofInput);
    }

    if (formData?.group_master_id) {
      payload.append('group_master_id', formData.group_master_id);
    }
    if (formData?.legal_entity_id) {
      payload.append('legal_entity_id', formData.legal_entity_id);
    }
    if (formData?.unit_sl_mode) {
      payload.append('unit_sl_mode', formData.unit_sl_mode);
      if (formData?.unit_sl_mode === 'U' && formData?.unit_id?.unit_id) {
        payload.append('unit_id', formData.unit_id.unit_id);
      } else if (
        formData?.unit_sl_mode === 'S' &&
        formData?.ser_loc_id?.ser_loc_id
      ) {
        payload.append('ser_loc_id', formData.ser_loc_id.ser_loc_id);
      } else if (formData?.unit_sl_mode === 'U' && formData?.unit_id?.id) {
        payload.append('unit_id', formData.unit_id.id);
      } else if (formData?.unit_sl_mode === 'S' && formData?.ser_loc_id?.id) {
        payload.append('ser_loc_id', formData.ser_loc_id.ser_loc_id.id);
      }
    }
    if (formData?.emp_type) {
      payload.append('emp_type', formData.emp_type);
      if (formData?.emp_type === 'E' && formData?.pay_group_id?.pay_group_id) {
        payload.append('pay_group_id', formData.pay_group_id.pay_group_id);
      } else if (formData?.emp_type === 'L' && formData?.cont_id?.cont_id) {
        payload.append('cont_id', formData.cont_id.cont_id);
      } else if (formData?.emp_type === 'E' && formData?.pay_group_id?.id) {
        payload.append('pay_group_id', formData.pay_group_id.id);
      } else if (formData?.emp_type === 'L' && formData?.cont_id?.id) {
        payload.append('cont_id', formData.cont_id.id);
      }
    }
    if (formData?.size) {
      payload.append('size', formData.upload_file.size + '');
    }
    if (formData?.pay_month_no) {
      payload.append('pay_month_no', formData.pay_month_no);
    }
    if (formData?.input_type_id) {
      payload.append('input_type_id', formData.input_type_id);
    }
    if (formData?.pay_year) {
      payload.append('pay_year', formData.pay_year);
    }

    let day: any = new Date();
    let month: any = day.getMonth();
    let year: any = day.getFullYear();

    //updated 23-06-2023
    if (
      this.apiUrl == 'input_template_upload/input_template_upload_file_creation'
    ) {
      // payload.append("pay_month_no", month);
      // payload.append("pay_year", year);
      payload.append('financial_year', this.formData.financial_year);
    } else {
      payload.append('month', month);
      payload.append('year', year);
    }
    //updated 23-06-2023

    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this._authService.accessToken,
      LegalEntityId: LegalEntityId,
    });
    let options = { headers: headers };
    if (this.apiUrl == 'api/generalmaster/upload_files') {
      this.http
        .post(environment.payrollURL + this.apiUrl, payload, options)
        .pipe(
          catchError((err) => {
            this.errorRecord = [];
            this.fileUpload.nativeElement.value = '';
            return of(err);
          })
        )
        .subscribe((event) => {
          this.errorRecord = [];
          this.fileUpload.nativeElement.value = '';
          if (event.status == 400) {
            this._notificationService.showNotificationMessage(
              'Error',
              event.error.message,
              'error'
            );
          } else {
            if (event.status.toLowerCase() == 'success') {
              this._notificationService.showNotificationMessage(
                'Success',
                'Uploaded Successfully',
                'success'
              );
              this.fileurl = event.url;
              this.filename = this.fileurl.substr(
                this.fileurl.lastIndexOf('/') + 1
              );

              this.submitFileDetails.emit({
                doc_name: this.filename,
                doc_path: this.fileurl,
              });
              if (this.is_multiple) {
                this.filename = '';
                this.fileurl = '';
              }
            } else if (event.message.toLowerCase() == 'error') {
              this.errorRecord = event.data;
              this._notificationService.showNotificationMessage(
                'Error',
                'Unable to save, Due to Discrepancies in input correct & save',
                'error'
              );
            }
          }
          this._payrollServiceSplashScreenService.hide();
        });
    } else {
      let URL: string = `${environment.payrollURL + this.moduleName}/${
        this.apiUrl
      }/`;
      if (!this.moduleName) {
        URL = `${environment.payrollURL}${this.apiUrl}/`;
      }//changes made by sriram 02-08-2023 for page not found error(input template upload)
      this.http
        .post(URL, payload, options)
        .pipe(
          catchError((err) => {
            this.errorRecord = [];
            this.fileUpload.nativeElement.value = '';
            return of(err);
          })
        )
        .subscribe((event) => {
          this.errorRecord = [];
          this.fileUpload.nativeElement.value = '';
          if (event.status == 400) {
            this._notificationService.showNotificationMessage(
              'Error',
              event.error.message,
              'error'
            );
          } else {
            if (event.message.toLowerCase() == 'success') {
              this._notificationService.showNotificationMessage(
                'Success',
                'Uploaded Successfully',
                'success'
              );
              this.fileurl = event.url;
              this.filename = this.fileurl.substr(
                this.fileurl.lastIndexOf('/') + 1
              );

              this.submitFileDetails.emit({
                doc_name: this.filename,
                doc_path: this.fileurl,
              });
              if (this.is_multiple) {
                this.filename = '';
                this.fileurl = '';
              }
            } else if (event.message.toLowerCase() == 'error') {
              this.errorRecord = event.data;
              this._notificationService.showNotificationMessage(
                'Error',
                'Unable to save, Due to Discrepancies in input correct & save',
                'error'
              );
            }
          }
          this._payrollServiceSplashScreenService.hide();
        });
    }
  }

  deleteData() {
    const LegalEntityId =
      this._sessionStorage.getLegalEntityId() || 'NOT_FOUND';
    this.errorText = '';
    if (this.fileurl.length <= 0) {
      this._notificationService.showNotificationMessage(
        'Error',
        'Choose the file',
        'error'
      );
      return;
    }
    // Sriram 2023-08-02 Start
    let formData = this.formData;
    formData.type_of_option = 'delete_file';
    let payload = new FormData();
    if (formData.form_action === 'edit') {
      payload.append('type_of_action', formData.type_of_option);
      payload.append('file_path', formData.bill_copy_path);
    } else {
      payload.append('upload_file', this.upload_file);
      if (formData?.legal_entity_id) {
        payload.append('legal_entity_id', formData.legal_entity_id);
      }
      if (formData?.group_master_id) {
        payload.append('group_master_id', formData.group_master_id);
      }
      // if (this?.type_of_option) {
      payload.append('type_of_option', this.typeofInput);
      // }
      if (formData?.unit_id) {
        payload.append('unit_id', formData.unit_id);
      }
      if (formData?.pay_group_id) {
        payload.append('pay_group_id', formData.pay_group_id);
      }
      if (formData?.unit_sl_mode) {
        payload.append('unit_sl_mode', formData.unit_sl_mode);
      }
      if (formData?.pay_month_no) {
        payload.append('pay_month_no', formData.pay_month_no);
      }
      if (formData?.input_type_id) {
        payload.append('input_type_id', formData.input_type_id);
      }
      if (formData?.pay_year) {
        payload.append('pay_year', formData.pay_year);
      }
      if (formData?.size) {
        payload.append('size', formData.upload_file.size + '');
      }
    }
    // Sriram 2023-08-02 End

    let headers = new HttpHeaders({
      Authorization: 'Bearer ' + this._authService.accessToken,
      LegalEntityId: LegalEntityId,
    });
    let options = { headers: headers };
    // Sriram 2023-08-02 Start
    if (this.apiUrl == 'api/generalmaster/upload_files') {
      this.http
        .post(environment.payrollURL + this.apiUrl, payload, options)

        .pipe(
          catchError((err) => {
            return of(err.error);
          })
        )
        .subscribe((event) => {
          if (event.status == 400) {
            this._notificationService.showNotificationMessage(
              'Error',
              event.message,
              'error'
            );
            this.errorRecord = event.data;
          } else if (event.message == 'File Not Exited') {
            this._notificationService.showNotificationMessage(
              'Error',
              event.message,
              'error'
            );
            this.errorRecord = event.data;
            this.filename = '';
            this.fileurl = '';
          } else {
            if (event.message.toLowerCase() == 'deleted successfully') {
              this._notificationService.showNotificationMessage(
                'Success',
                'File Deleted',
                'success'
              );
              this.fileurl = '';
              this.filename = '';
              this.submitFileDetails.emit({
                doc_name: this.filename,
                doc_path: this.fileurl,
              });
            } else if (event.message.toLowerCase() == 'error') {
              this.errorRecord = event.data;
              this._notificationService.showNotificationMessage(
                'Error',
                'Unable to save, Due to Discrepancies in input correct & save',
                'error'
              );
            }
          }
        });
    } else {
      let URL: string = `${environment.payrollURL + this.moduleName}/${
        this.apiUrl
      }/`;
      if (!this.moduleName) {
        URL = `${environment.payrollURL}${this.apiUrl}/`;
      } //changes made by sriram 02-08-2023 for page not found error(input template upload)
      this.http
        .post(URL, payload, options)
        .pipe(
          catchError((err) => {
            return of(err.error);
          })
        )
        .subscribe((event) => {
          if (event.status == 400) {
            this._notificationService.showNotificationMessage(
              'Error',
              event.message,
              'error'
            );
            this.errorRecord = event.data;
          } else {
            if (event.message.toLowerCase() == 'deleted successfully') {
              this._notificationService.showNotificationMessage(
                'Success',
                'File Deleted',
                'success'
              );
              this.fileurl = '';
              this.filename = '';
              this.submitFileDetails.emit({
                doc_name: this.filename,
                doc_path: this.fileurl,
              });
            } else if (event.message.toLowerCase() == 'error') {
              this.errorRecord = event.data;
              this._notificationService.showNotificationMessage(
                'Error',
                'Unable to save, Due to Discrepancies in input correct & save',
                'error'
              );
            }
          }
        });
    }
    // Sriram 2023-08-02 End
  }
}
