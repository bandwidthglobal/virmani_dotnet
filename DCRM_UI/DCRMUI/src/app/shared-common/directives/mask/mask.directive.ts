import { Directive, ElementRef, HostListener, Input, Optional } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[mask]' })

export class MaskDirective {

  PatterFormatList = {
    alpha: '^[a-zA-Z]*$',
    alphaAllowSpaces: '^[a-zA-Z ]*$',
    alphaAllowSpacesAndSplash: '^[a-zA-Z /]*$',
    alphaNumeric: '^[a-zA-Z0-9]*$',
    alphaNumericAllowSpaces: '^[a-zA-Z0-9 ]*$',
    alphaNumericAllowDash: '^[a-zA-Z0-9-]*$',
    numericAllowDash: '^[0-9-]*$',
    numeric: '^[0-9]*$',
    currency: '^[0-9,]*$',
    addressLine: '^(([0-9]{1,}).(.*[a-zA-Z#/&]){2,}$)|(([RRHC]{2,}).[0-9]{1,})|(([0-9]{1,}).(.*[a-zA-Z#/&]){2,}.(.*[0-9#])$)',
    date: '^((0|1)d{1})((0|1|2|3)d{1})((19|20)d{2})',
  };

  decimales: string = '';
  private _oldvalue: string = '';
  private regExpr: any;

  constructor(@Optional() private control: NgControl) { }

  @Input()
  set mask(value: string) {
    // console.log('> mask ---> ', value);
    if (!value) { value = ''; }

    let val = this.PatterFormatList[value];
    const i = val.indexOf('d{0,');
    if (i > 0) {
      const decimales = +val.substr(i + 4, 1);
      this.decimales = '000000000'.substr(0, decimales);
    }
    this.regExpr = new RegExp(val);
  }

  @HostListener('blur', ['$event'])
  blur($event: { target: any; }): void {
    if (this.decimales) {
      // console.log('> blur ---> ');
      const item = $event.target;
      const values = item.value.split('.');
      const value =
        values.length > 1
          ? values[0] + '.' + (values[1] + this.decimales).substr(0, this.decimales.length)
          : values[0] + '.' + this.decimales;
      this.control.control.setValue(value, { emit: false });
    }
  }

  @HostListener('input', ['$event'])
  change($event: { target: any; }): void {
    const item = $event.target;
    const value = item.value;
    let pos = item.selectionStart;
    const matchvalue = value;
    const noMatch: boolean = value && !this.regExpr.test(matchvalue);
    // console.log('> change ---> ');
    if (noMatch) {
      item.selectionStart = item.selectionEnd = pos - 1;
      if (item.value.length < this._oldvalue.length && pos === 0) { pos = 2; }
      if (this.control) { this.control.control.setValue(this._oldvalue, { emit: false }); }

      item.value = this._oldvalue;
      item.selectionStart = item.selectionEnd = pos - 1;
    } else { this._oldvalue = value; }
  }
}