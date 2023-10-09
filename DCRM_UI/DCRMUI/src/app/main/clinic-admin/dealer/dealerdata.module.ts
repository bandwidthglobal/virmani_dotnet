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

import { DealerListComponent } from 'app/main/clinic-admin/dealer/dealer-list/dealer-list.component';
import { DealerListService } from 'app/main/clinic-admin/dealer/dealer-list/dealer-list.service';

import { DealerAddComponent } from 'app/main/clinic-admin/dealer/dealer-add/dealer-add.component';
import { DealerAddService } from 'app/main/clinic-admin/dealer/dealer-add/dealer-add.service';

import { DealerEditComponent } from 'app/main/clinic-admin/dealer/dealer-edit/dealer-edit.component';
import { DealerEditService } from 'app/main/clinic-admin/dealer/dealer-edit/dealer-edit.service';
import { DealerPreviewComponent } from 'app/main/clinic-admin/dealer/dealer-preview/dealer-preview.component';
import { DealerPreviewService } from 'app/main/clinic-admin/dealer/dealer-preview/dealer-preview.service';
import { SharedCommonModule } from 'app/shared-common/shared-ui.module';
import { MaskModule } from 'app/shared-common/directives/mask/mask.module';
import { DealerFormComponent } from './dealer-form/dealer-form.component';


// routing
const routes: Routes = [
    {
        path: 'add',
        component: DealerAddComponent,
        resolve: {
            Sas: DealerAddService
        },
        data: { animation: 'DealerAddComponent' }
    },
    {
        path: 'list',
        component: DealerListComponent,
        resolve: {
            uls: DealerListService
        },
        data: { animation: 'DealerListComponent' }
    },
    {
        path: 'preview/:id',
        component: DealerPreviewComponent,
        resolve: {
            Sds: DealerPreviewService
        },
        data: { path: 'dealer-view/:id', animation: 'DealerPreviewComponent' }
    },
    {
        path: 'edit/:id',
        component: DealerEditComponent,
        resolve: {
            Ses: DealerEditService
        },
        data: { path: 'dealer-view/:id', animation: 'DealerEditComponent' }
    },
    {
        path: 'preview',
        redirectTo: '/clinic-admin/dealer/preview/4989' // Redirection
    },
    {
        path: 'edit',
        redirectTo: '/clinic-admin/dealer/edit/4989' // Redirection
    }
];

@NgModule({
    declarations: [
        DealerAddComponent,
        DealerListComponent,
        DealerPreviewComponent,
        DealerEditComponent,
        DealerFormComponent
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
        CoreSidebarModule,
        SharedCommonModule,
        MaskModule
    ],
    providers: [DealerListService, DealerPreviewService, DealerEditService, DealerAddService],
    exports: [DealerListComponent]
})
export class DealerDataModule { }
