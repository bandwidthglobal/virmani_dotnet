import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { validationMessages } from 'app/shared-common/pipes/error-message';

@Component({
  selector: 'shared-ui-check-box',
  templateUrl: './ui-check-box.component.html',
  styleUrls: ['./ui-check-box.component.scss']
})

export class UiCheckBoxComponent implements OnInit {

  @Input() submitted?: boolean = false;
  @Input() label?: any = '';
  @Input() control?: FormControl;
  @Input() messages?: any = validationMessages;

  constructor() { }

  ngOnInit(): void { }

}