import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from 'app/auth/helpers';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';
import { InvoiceListService } from 'app/main/apps/invoice/invoice-list/invoice-list.service';
import { InvoiceModule } from 'app/main/apps/invoice/invoice.module';
import { PatientService } from 'app/main/pages/patient/patient.service';
import { PatientComponent } from 'app/main/pages/patient/patient.component';

const routes: Routes = [
  {
    path: 'patient',
        component: PatientComponent,
    canActivate: [AuthGuard],
    resolve: {
        profile: PatientService,
        inv: InvoiceListService
    }
  }
];

@NgModule({
    declarations: [PatientComponent],
    imports: [CommonModule, InvoiceModule, RouterModule.forChild(routes), NgbModule, CoreCommonModule, ContentHeaderModule],

  providers: [PatientService]
})
export class PatientModule {}
