import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { validationMessages } from 'app/shared-common/pipes/error-message';

@Component({
  selector: 'shared-ui-date-input',
  templateUrl: './ui-date-input.component.html',
  styleUrls: ['./ui-date-input.component.scss']
})
export class UiDateInputComponent implements OnInit {

  @Input() submitted: boolean = false;
  @Input() label?: string = '';
  @Input() placeholder?: string = '';
  @Input() control: FormControl;
  @Input() messages = validationMessages;
  @Input() mask: string = '';

  constructor() { }

  ngOnInit(): void {}

}