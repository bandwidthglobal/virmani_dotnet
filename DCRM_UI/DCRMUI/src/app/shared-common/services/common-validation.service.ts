import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })

export class CommonValidationService {
  validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        this.validateAllFormFields(control as any);
      }
    });
  }

  dateFormat_Y_M_D(str: any = null): any {
    return str ? formatDate(str, 'yyyy-MM-dd', 'en_US') : str;
  }

  dateTimeFormat(str: any = null): any {
    return str ? formatDate(str, 'yyyy-MM-dd hh:mm:ss', 'en_US') : str;
  }
}