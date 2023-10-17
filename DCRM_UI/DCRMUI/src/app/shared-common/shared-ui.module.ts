import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagesPipe } from './pipes/error-message.pipe';
import { UiTextInputComponent } from './ui-inputs/ui-text-input/ui-text-input.component';
import { UiEmailInputComponent } from './ui-inputs/ui-email-input/ui-email-input.component';
import { UiDateInputComponent } from './ui-inputs/ui-date-input/ui-date-input.component';
import { UiSelectInputComponent } from './ui-inputs/ui-select-input/ui-select-input.component';

const components = [
    ErrorMessagesPipe,

    UiTextInputComponent,
    UiEmailInputComponent,
    UiDateInputComponent,
    UiSelectInputComponent
];


@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})

export class SharedCommonModule { }