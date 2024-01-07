import { Routes } from '@angular/router';
import { HomeComponent } from './main/home/home.component';
import { LayoutComponent } from './main/layout/layout.component';
import { LoginComponent } from './main/authentication/login/login.component';
import { RegisterComponent } from './main/authentication/register/register.component';
import { Routing } from './core/app/enum/Routing.enum';
import { AccountActivationComponent } from './main/authentication/account-activation/account-activation.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: Routing.HOME, component: HomeComponent },
      { path: Routing.LOGIN, component: LoginComponent },
      { path: 'authentication/register', component: RegisterComponent },
      {
        path: 'account-activation/:email/activate',
        component: AccountActivationComponent
      }
    ]
  }
];
