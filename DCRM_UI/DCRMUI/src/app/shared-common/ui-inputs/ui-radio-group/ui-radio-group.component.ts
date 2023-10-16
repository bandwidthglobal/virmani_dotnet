import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { validationMessages } from '../error-message';

@Component({
  selector: 'shared-ui-radio-group',
  templateUrl: './ui-radio-group.component.html',
  styleUrls: ['./ui-radio-group.component.scss']
})
export class SharedUiRadioGroupComponent implements OnInit {
  @Input() label = '';
  @Input() control: FormControl;
  @Input() options: any = [];
  @Input() valueKey: string;
  @Input() displaykey: string;
  @Input() messages = validationMessages;
  @Input() placeholder?: string;
  @Input() isModified: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
