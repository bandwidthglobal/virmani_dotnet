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

import { ProsthesisTypeComponent } from 'app/main/clinic-admin/settings/prosthesis-type/prosthesis-type-list/prosthesis-type-list.component';
import { ProsthesisTypeListService } from 'app/main/clinic-admin/settings/prosthesis-type/prosthesis-type-list/prosthesis-type-list.service';
import { ProsthesisTypeFormComponent } from 'app/main/clinic-admin/settings/prosthesis-type/prosthesis-type-form/prosthesis-type-form.component';
import { ProsthesisTypeFormService } from 'app/main/clinic-admin/settings/prosthesis-type/prosthesis-type-form/prosthesis-type-form.service'


// routing
const routes: Routes = [
    {
        path: 'add',
        component: ProsthesisTypeFormComponent,
        resolve: {
            Sas: ProsthesisTypeFormService
        },
    },
    {
        path: 'list',
        component: ProsthesisTypeComponent,
        resolve: {
            uls: ProsthesisTypeListService
        },
    },
    {
        path: 'edit/:id',
        component: ProsthesisTypeFormComponent,
        resolve: {
            Sds: ProsthesisTypeFormService
        },
    },
];

@NgModule({
    declarations: [
        ProsthesisTypeFormComponent,
        ProsthesisTypeComponent,
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
    providers: [ProsthesisTypeFormService, ProsthesisTypeListService],
    /*exports: [ChairListService]*/
})
export class ProsthesisTypeDataModule { }
