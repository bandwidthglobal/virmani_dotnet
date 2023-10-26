import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

import { CoreCommonModule } from '@core/common.module';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { CoreSidebarModule } from '@core/components';

import { ChairListComponent } from 'app/main/clinic-admin/settings/chairs/chair-list/chair-list.component';
import { ChairListService } from 'app/main/clinic-admin/settings/chairs/chair-list/chair-list.service';
import { ChairFormComponent } from 'app/main/clinic-admin/settings/chairs/chair-form/chair-form.component';
import { ChairFormService } from 'app/main/clinic-admin/settings/chairs/chair-form/chair-form.service'


// routing
const routes: Routes = [
    {
        path: 'add',
        component: ChairFormComponent,
        resolve: {
            Sas: ChairFormService
        },
    },
    {
        path: 'list',
        component: ChairListComponent,
        resolve: {
            uls: ChairListService
        },
    },
    {
        path: 'edit/:id',
        component: ChairFormComponent,
        resolve: {
            Sds: ChairFormService
        },
    },
];

@NgModule({
    declarations: [
        ChairFormComponent,
        ChairListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CoreCommonModule,
        CoreDirectivesModule,
        Ng2FlatpickrModule,
        NgxDatatableModule,
        FormsModule,
        CorePipesModule,
        NgbModule,
        NgSelectModule,
        CoreSidebarModule
    ],
    providers: [ChairFormService, ChairListService],
    /*exports: [ChairListService]*/
})
export class ChairDataModule { }
