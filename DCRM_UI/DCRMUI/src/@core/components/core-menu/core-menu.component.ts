import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreMenuService } from '@core/components/core-menu/core-menu.service';
import { User } from 'app/auth/models';
import { menuSatff } from '../../../app/menu/menu-staff';
import { menu } from '../../../app/menu/menu';
import { menuDoctor } from '../../../app/menu/menu-doctor';

@Component({
  selector: '[core-menu]',
  templateUrl: './core-menu.component.html',
  styleUrls: ['./core-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoreMenuComponent implements OnInit {
  currentUser: any;

  @Input()
  layout = 'vertical';

  @Input()
  menu: any;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   *
   * @param {ChangeDetectorRef} _changeDetectorRef
   * @param {CoreMenuService} _coreMenuService
   */
  constructor(private _changeDetectorRef: ChangeDetectorRef, private _coreMenuService: CoreMenuService) {
    // Set the private defaults

      //let currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
      //if (currentUser != null) {
      //    if (currentUser.role.toLowerCase() == "staff") {
      //        this.menu = menuSatff;
      //    }
      //    else if (currentUser.role.toLowerCase() == "doctor") {
      //        this.menu= menuDoctor;
      //    }
      //}


    this._unsubscribeAll = new Subject();
  }

  // Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Set the menu either from the input or from the service
    this.menu = this.menu || this._coreMenuService.getCurrentMenu();
    // Subscribe to the current menu changes
    this._coreMenuService.onMenuChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(() => {
      this.currentUser = this._coreMenuService.currentUser;
        if (this.currentUser != null) {
            if (this.currentUser.role.toLowerCase() == "staff") {
                this.menu = menuSatff;
            }
            else if (this.currentUser.role.toLowerCase() == "doctor") {
                this.menu = menuDoctor;
            }
            else {
                this.menu = menu; 
            }
        }
      // Load menu
      //Commented by arvind
      //this.menu = this._coreMenuService.getCurrentMenu();
      this._changeDetectorRef.markForCheck();
    });
  }
}
