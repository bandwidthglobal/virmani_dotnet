import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { validationMessages } from '../error-message';

@Component({
  selector: 'shared-ui-check-box',
  templateUrl: './ui-check-box.component.html',
  styleUrls: ['./ui-check-box.component.scss']
})
export class SharedUiCheckBoxComponent implements OnInit {
  @Input() label = '';
  @Input() control: FormControl;
  @Input() messages = validationMessages;
  @Input() isModified: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
