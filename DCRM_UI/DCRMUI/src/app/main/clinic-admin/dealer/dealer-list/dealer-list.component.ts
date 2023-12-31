import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { CoreConfigService } from '@core/services/config.service';
import Swal from 'sweetalert2';
import * as snippet from 'app/main/extensions/sweet-alerts/sweet-alerts.snippetcode';
import { DealerListService } from 'app/main/clinic-admin/dealer/dealer-list/dealer-list.service';

@Component({
  selector: 'app-dealer-list',
  templateUrl: './dealer-list.component.html',
  styleUrls: ['./dealer-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DealerListComponent implements OnInit, OnDestroy {
  public data: any;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public selectedStatus = [];
  public searchValue = '';
  // decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;
  public returnUrl: string;
  public loading = false;
  public error = '';
  // private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  public rows: any[];
  public tempFilterData: any[];
  public previousStatusFilter = '';
  public _snippetCodeConfirmText = snippet.snippetCodeConfirmText;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {CalendarService} _calendarService
   * @param {InvoiceListService} _staffListService
   */
  constructor(
    private _dealerListService: DealerListService,
    private _coreConfigService: CoreConfigService
  ) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event: { target: { value: string; }; }) {
    // Reset ng-select on search
    const val = event.target.value.toLowerCase();
    // filter our data
    const temp = this.tempData.filter(function (d) {
        return d.company_Name.toLowerCase().indexOf(val) !== -1 ||
            d.email1.toLowerCase().indexOf(val) !== -1 ||
            d.phone1.toLowerCase().indexOf(val) !== -1 ||
            !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * Filter By Roles
   *
   * @param event
   */
  filterByStatus(event: { value: any; }) {
    const filter = event ? event.value : '';
    this.previousStatusFilter = filter;
    this.tempFilterData = this.filterRows(filter);
    this.rows = this.tempFilterData;
  }

  /**
   * Filter Rows
   *
   * @param statusFilter
   */
  filterRows(statusFilter: string): any[] {
    // Reset search on select change
    this.searchValue = '';
    statusFilter = statusFilter.toLowerCase();
    return this.tempData.filter(row => {
      const isPartialNameMatch = row.invoiceStatus.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
      return isPartialNameMatch;
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe config change
    this._coreConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(config => {
      // If we have zoomIn route Transition then load datatable after 450ms(Transition will finish in 400ms)
      if (config.layout.animation === 'zoomIn') {
        setTimeout(() => {
          this._dealerListService.onDealerListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
            this.data = response;
            this.rows = this.data;
            this.tempData = this.rows;
            this.tempFilterData = this.rows;
          });
        }, 450);
      } else {
        this._dealerListService.onDealerListChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
          this.data = response;
          this.rows = this.data;
          this.tempData = this.rows;
          this.tempFilterData = this.rows;
        });
      }
    });
  }
  delete(id: any) {
    let rowIndex = -1;
    this.tempData.forEach((currentValue, index) => {
      if (currentValue.id == id) {
        rowIndex = index
      }
    });
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._dealerListService
          .delete(id)
          .pipe()
          .subscribe(
            data => {
              delete this.tempData[rowIndex];
              var temp = [];
              this.tempData.forEach((currentValue, index) => {
                temp.push(currentValue);
              });
              this.rows = temp;
            },
            error => {
              this.error = error;
            }
          );
      }
    })
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}