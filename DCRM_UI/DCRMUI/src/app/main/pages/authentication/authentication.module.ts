import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { ForgotPasswordComponent } from 'app/main/pages/authentication/forgotpassword/forgotpassword.component';
import { LoginComponent } from 'app/main/pages/authentication/login/login.component';
import { RegisterComponent } from 'app/main/pages/authentication/register/register.component';

// routing
const routes: Routes = [
  {
    path: 'forgotpassword',
        component: ForgotPasswordComponent
  },
    {
        path: 'login-v2',
        component: LoginComponent
    },
  {
      path: 'authentication/register-v2',
      component: RegisterComponent
  },
  //{
  //  path: 'authentication/login',
  //  component: LoginComponent
  //},
  //{
  //  path: 'authentication/reset-password-v1',
  //  component: AuthResetPasswordV1Component
  //},
  //{
  //  path: 'authentication/reset-password-v2',
  //  component: AuthResetPasswordV2Component
  //},
  //{
  //  path: 'authentication/forgot-password-v1',
  //  component: AuthForgotPasswordV1Component
  //},
  //{
  //  path: 'authentication/forgot-password-v2',
  //  component: AuthForgotPasswordV2Component
  //}
];

@NgModule({
  declarations: [
        ForgotPasswordComponent,
        LoginComponent,
        RegisterComponent,
    //AuthRegisterV2Component,
    //AuthForgotPasswordV1Component,
    //AuthForgotPasswordV2Component,
    //AuthResetPasswordV1Component,
    //AuthResetPasswordV2Component
  ],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, FormsModule, ReactiveFormsModule, CoreCommonModule]
})
export class AuthenticationModule {}
