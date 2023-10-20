import { FormGroup, Validators } from '@angular/forms';

export const FormTypeValidation: any = (formGroup: FormGroup) => {
    formGroup.get('estimated_Amount').valueChanges.subscribe((estimated_Amount) => {
        let courtesy = formGroup.get('courtesy').value;
        let data: number = 0;
        if (estimated_Amount) {
            data = estimated_Amount - courtesy;
        }
        formGroup.controls['estimated_total'].setValue(data);
        // formGroup.controls['estimated_total'].updateValueAndValidity();
    });
    formGroup.get('courtesy').valueChanges.subscribe((courtesy) => {
        let estimated_Amount = formGroup.get('estimated_Amount').value;
        let data: number = 0;
        if (courtesy) {
            data = estimated_Amount - courtesy;
        }
        formGroup.controls['estimated_total'].setValue(data);
        // formGroup.controls['estimated_total'].updateValueAndValidity();
    });
};
