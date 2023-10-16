import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { validationMessages } from 'app/shared-common/pipes/error-message';

@Component({
  selector: 'shared-ui-text-input',
  templateUrl: './ui-text-input.component.html',
  styleUrls: ['./ui-text-input.component.scss']
})
export class UiTextInputComponent implements OnInit {

  @Input() isDisabled?: boolean = false;
  @Input() submitted?: boolean = false;
  @Input() label?: string = '';
  @Input() placeholder?: string = '';
  @Input() control?: FormControl;
  @Input() messages?: any = validationMessages;
  @Input() mask?: string = '';

  constructor() { }

  ngOnInit(): void {}

}