import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { validationMessages } from 'app/shared-common/pipes/error-message';

@Component({
  selector: 'shared-ui-select-input',
  templateUrl: './ui-select-input.component.html',
  styleUrls: ['./ui-select-input.component.scss']
})

export class UiSelectInputComponent implements OnInit {

  @Input() label?: string = '';
  @Input() control?: FormControl;
  @Input() options?: string[] = [];
  @Input() messages?: any = validationMessages;
  @Input() placeholder?: string = '';
  @Input() valueKey?: string = '';
  @Input() displaykey?: string = '';
  @Input() isMultiple?: boolean = false;
  @Input() submitted?: boolean = false;

  constructor() { }

  ngOnInit(): void { }

}