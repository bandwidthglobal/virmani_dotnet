import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { validationMessages } from '../error-message';

@Component({
  selector: 'shared-ui-textarea',
  templateUrl: './ui-textarea.component.html',
  styleUrls: ['./ui-textarea.component.scss']
})
export class SharedUiTextareaComponent implements OnInit {
  @Input() label = '';
  @Input() control: FormControl;
  @Input() placeholder?: string;
  @Input() messages = validationMessages;
  @Input() isModified: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
