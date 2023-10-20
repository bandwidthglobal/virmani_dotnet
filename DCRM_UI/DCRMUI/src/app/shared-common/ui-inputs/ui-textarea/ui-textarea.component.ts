import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { validationMessages } from 'app/shared-common/pipes/error-message';

@Component({
  selector: 'shared-ui-textarea',
  templateUrl: './ui-textarea.component.html',
  styleUrls: ['./ui-textarea.component.scss']
})
export class UiTextareaComponent implements OnInit {

  @Input() submitted?: boolean = false;
  @Input() label?: string = '';
  @Input() placeholder?: string = '';
  @Input() control?: FormControl;
  @Input() messages = validationMessages;

  constructor() { }

  ngOnInit(): void { }

}
