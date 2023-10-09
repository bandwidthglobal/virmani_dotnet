import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMessagesPipe } from './pipes/error-message.pipe';

const components = [
  ErrorMessagesPipe
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