import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from 'app/auth/helpers';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { InvoiceListService } from 'app/main/apps/invoice/invoice-list/invoice-list.service';
import { InvoiceModule } from 'app/main/apps/invoice/invoice.module';
import { DealerService } from 'app/main/pages/dealer/dealer.service';
import { DealerComponent } from 'app/main/pages/dealer/dealer.component';

const routes: Routes = [
  {
        path: 'dealer',
        component: DealerComponent,
    canActivate: [AuthGuard],
    resolve: {
        profile: DealerService,
        inv: InvoiceListService
    }
  }
];

@NgModule({
    declarations: [DealerComponent],
    imports: [CommonModule, InvoiceModule, RouterModule.forChild(routes), NgbModule, CoreCommonModule, ContentHeaderModule],

    providers: [DealerService]
})
export class DealerModule {}
