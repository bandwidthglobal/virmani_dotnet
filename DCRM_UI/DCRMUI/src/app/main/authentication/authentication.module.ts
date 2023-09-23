import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

/*import { ForgotPasswordComponent } from 'app/main/authentication/forgotpassword/forgotpassword.component';*/
import { LoginComponent } from 'app/authentication/login/login.component';
import { LoginService } from 'app/authentication/login/login.service';
//import { RegisterComponent } from 'app/main/authentication/register/register.component';
//import { ForgotPasswordService } from 'app/main/authentication/forgotpassword/forgotpassword.component';
//import { LoginComponent } from 'app/main/authentication/login/login.component';
//import { RegisterComponent } from 'app/main/authentication/register/register.component';
const routes: Routes = [
    {
        path: 'logn',
        component: LoginComponent,
        resolve: {
            Sas: LoginService
        },
        data: { animation: 'LoginComponent' }
    },
    //{
    //    path: 'list',
    //    component: DealerListComponent,
    //    resolve: {
    //        uls: DealerListService
    //    },
    //    data: { animation: 'DealerListComponent' }
    //},
    //{
    //    path: 'preview/:id',
    //    component: DealerPreviewComponent,
    //    resolve: {
    //        Sds: DealerPreviewService
    //    },
    //    data: { path: 'dealer-view/:id', animation: 'DealerPreviewComponent' }
    //},
    //{
    //    path: 'edit/:id',
    //    component: DealerEditComponent,
    //    resolve: {
    //        Ses: DealerEditService
    //    },
    //    data: { path: 'dealer-view/:id', animation: 'DealerEditComponent' }
    //},
    //{
    //    path: 'preview',
    //    redirectTo: '/clinic-admin/dealer/preview/4989' // Redirection
    //},
    //{
    //    path: 'edit',
    //    redirectTo: '/clinic-admin/dealer/edit/4989' // Redirection
    //}
];
@NgModule({

    declarations: [
        /*RegisterComponent,*/
        LoginComponent,
       /* ForgotPasswordComponent,*/
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CoreCommonModule,
        //CoreDirectivesModule,
        //Ng2FlatpickrModule,
        //NgxDatatableModule,
        FormsModule,
       /* CorePipesModule,*/
        NgbModule,
        //NgSelectModule,
        //CoreSidebarModule
    ],
    providers: [LoginService],
    exports: [LoginComponent]
})
export class AuthenticationModule {}
