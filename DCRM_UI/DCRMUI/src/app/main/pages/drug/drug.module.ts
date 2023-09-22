import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from 'app/auth/helpers';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { DrugService } from 'app/main/pages/drug/drug.service';
import { DrugComponent } from 'app/main/pages/drug/drug.component';

const routes: Routes = [
  {
    path: 'doctor',
        component: DrugComponent,
    canActivate: [AuthGuard],
    resolve: {
        doctor: DrugService,
    }
  }
];

@NgModule({
    declarations: [DrugComponent],
    imports: [CommonModule,  RouterModule.forChild(routes), NgbModule, CoreCommonModule, ContentHeaderModule],

    providers: [DrugService]
})
export class DoctorModule {}
