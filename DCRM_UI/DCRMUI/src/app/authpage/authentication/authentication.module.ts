import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from '@core/common.module';

import { ForgotPasswordComponent } from 'app/authpage/authentication/forgotpassword/forgotpassword.component';
import { LoginComponent } from 'app/authpage/authentication/login/login.component';
import { RegisterComponent } from 'app/authpage/authentication/register/register.component';
import { LoginOutComponent } from 'app/authpage/authentication/logout/loginout.component';


// routing
const routes: Routes = [
  {
    path: 'forgotpassword',
        component: ForgotPasswordComponent
  },
    {
        path: 'login',
        component: LoginComponent
    },
  {
      path: 'register',
      component: RegisterComponent
    },
    {
        path: 'logout',
        component: LoginOutComponent
    }
];

@NgModule({
  declarations: [
        ForgotPasswordComponent,
        LoginComponent,
        RegisterComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, FormsModule, ReactiveFormsModule, CoreCommonModule]
})
export class AuthenticationModule {}
