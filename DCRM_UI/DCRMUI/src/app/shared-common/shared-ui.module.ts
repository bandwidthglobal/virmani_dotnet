import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagesPipe } from './pipes/error-message.pipe';
import { UiTextInputComponent } from './ui-inputs/ui-text-input/ui-text-input.component';
import { UiEmailInputComponent } from './ui-inputs/ui-email-input/ui-email-input.component';
import { UiDateInputComponent } from './ui-inputs/ui-date-input/ui-date-input.component';
import { UiSelectInputComponent } from './ui-inputs/ui-select-input/ui-select-input.component';
import { UiCheckBoxComponent } from './ui-inputs/ui-check-box/ui-check-box.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { UiTextareaComponent } from './ui-inputs/ui-textarea/ui-textarea.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
const components = [
  ErrorMessagesPipe,
  UiTextInputComponent,
  UiEmailInputComponent,
  UiDateInputComponent,
  UiSelectInputComponent,
  UiCheckBoxComponent,
  UiTextareaComponent
];


@NgModule({
  declarations: [...components],
  exports: [...components],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCheckboxModule,
    MatRadioModule,
    // MatSelectModule,
    // MatAutocompleteModule,
    // MatChipsModule,
    // MatTableModule,
  ],
})

export class SharedCommonModule { }