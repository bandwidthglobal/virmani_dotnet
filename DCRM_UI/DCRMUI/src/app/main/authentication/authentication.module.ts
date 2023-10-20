import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { ForgotPasswordComponent } from 'app/main/authentication/forgotpassword/forgotpassword.component';
import { LoginComponent } from 'app/main/authentication/login/login.component';
import { LoginService } from 'app/main/authentication/login/login.service';
import { RegisterComponent } from 'app/main/authentication/register/register.component';
const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'forgotpassword',
        component: ForgotPasswordComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
];
@NgModule({

    declarations: [
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        CoreCommonModule,
        FormsModule,
        NgbModule,
    ],
    providers: [LoginService],
    exports: [LoginComponent, ForgotPasswordComponent, RegisterComponent]
})
export class AuthenticationModule {}
