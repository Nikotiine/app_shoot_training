import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { LayoutComponent } from './main/layout/layout.component';
import { LoginComponent } from './main/authentication/login/login.component';
import { RegisterComponent } from './main/authentication/register/register.component';
import { Routing } from './core/app/enum/Routing.enum';
import { AccountActivationComponent } from './main/authentication/account-activation/account-activation.component';
import { ForgotPasswordComponent } from './main/authentication/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './main/authentication/new-password/new-password.component';
import { ShooterViewComponent } from './main/shooter/shooter-view/shooter-view.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: Routing.HOME, component: HomeComponent },
      { path: Routing.LOGIN, component: LoginComponent },
      { path: Routing.REGISTER, component: RegisterComponent },
      {
        path: Routing.ACCOUNT_ACTIVATION + ':email/activate',
        component: AccountActivationComponent
      },
      {
        path: Routing.FORGOT_PASSWORD,
        component: ForgotPasswordComponent
      },
      {
        path: Routing.NEW_PASSWORD + ':email/activate',
        component: NewPasswordComponent
      },
      {
        path: Routing.SHOOTER_PROFILE,
        component: ShooterViewComponent
      }
    ]
  }
];
