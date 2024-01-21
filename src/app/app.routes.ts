import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { LayoutComponent } from './main/layout/layout.component';
import { LoginComponent } from './main/authentication/login/login.component';
import { RegisterComponent } from './main/authentication/register/register.component';
import { Routing } from './core/app/enum/Routing.enum';
import { AccountActivationComponent } from './main/authentication/account-activation/account-activation.component';
import { ForgotPasswordComponent } from './main/authentication/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './main/authentication/new-password/new-password.component';
import { UserViewComponent } from './main/user/user-view/user-view.component';
import { userResolver } from './core/app/resolvers/user.resolver';
import { UserWeaponSetupListComponent } from './main/user/user-weapon-setup-list/user-weapon-setup-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    resolve: [userResolver],
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
        path: Routing.USER_PROFILE,
        component: UserViewComponent
      },
      {
        path: Routing.USER_WEAPON_SETUP_LIST,
        component: UserWeaponSetupListComponent
      }
    ]
  }
];
