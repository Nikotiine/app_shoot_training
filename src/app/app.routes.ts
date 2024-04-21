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
import { JouleComponent } from './main/calculator/joule/joule.component';
import { authGuard } from './core/app/guards/auth.guard';
import { AdminDashboardComponent } from './main/admin/admin-dashboard/admin-dashboard.component';
import { adminGuard } from './core/app/guards/admin.guard';
import { AdminUsersListComponent } from './main/admin/admin-users-list/admin-users-list.component';
import { WeaponsTabviewComponent } from './main/admin/weapons-tabview/weapons-tabview.component';
import { OpticsTabviewComponent } from './main/admin/optics-tabview/optics-tabview.component';
import { AmmunitionTabviewComponent } from './main/admin/ammunition-tabview/ammunition-tabview.component';
import { SessionFormComponent } from './main/training/session/session-form/session-form.component';
import { SessionListComponent } from './main/training/session/session-list/session-list.component';

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
        path: Routing.USER,
        canActivate: [authGuard],
        children: [
          {
            path: Routing.USER_PROFILE,
            component: UserViewComponent
          },
          {
            path: Routing.USER_WEAPON_SETUP_LIST,
            component: UserWeaponSetupListComponent
          }
        ]
      },
      {
        path: Routing.ADMIN,
        canActivate: [adminGuard],
        children: [
          {
            path: Routing.ADMIN_DASHBOARD,
            component: AdminDashboardComponent
          },
          {
            path: Routing.ADMIN_USERS_LIST,
            component: AdminUsersListComponent
          },
          {
            path: Routing.ADMIN_WEAPONS_LIST,
            component: WeaponsTabviewComponent
          },
          {
            path: Routing.ADMIN_OPTICS_LIST,
            component: OpticsTabviewComponent
          },
          {
            path: Routing.ADMIN_AMMUNITION_LIST,
            component: AmmunitionTabviewComponent
          }
        ]
      },
      {
        path: Routing.JOULE_CALCULATOR,
        component: JouleComponent
      },
      {
        path: Routing.TRAINING,
        canActivate: [authGuard],
        children: [
          {
            path: Routing.TRAINING_SESSION_FORM,
            component: SessionFormComponent
          },
          {
            path: Routing.TRAINING_SESSION_LIST,
            component: SessionListComponent
          }
        ]
      }
    ]
  }
];
