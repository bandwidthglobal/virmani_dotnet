import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from 'app/auth/helpers';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { DoctorService } from 'app/main/pages/doctor/doctor.service';
import { DoctorComponent } from 'app/main/pages/doctor/doctor.component';

import { InvoiceListService } from 'app/main/apps/invoice/invoice-list/invoice-list.service';
import { InvoiceModule } from 'app/main/apps/invoice/invoice.module';

const routes: Routes = [
  {
    path: 'doctor',
        component: DoctorComponent,
    canActivate: [AuthGuard],
    resolve: {
        doctor: DoctorService,
        invc: InvoiceListService
    }
  }
];

@NgModule({
    declarations: [DoctorComponent],
    imports: [CommonModule, InvoiceModule, RouterModule.forChild(routes), NgbModule, CoreCommonModule, ContentHeaderModule],

    providers: [DoctorService]
})
export class DoctorModule {}
