/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { WeaponService } from './services/weapon.service';
import { UserService } from './services/user.service';
import { WeaponSetupService } from './services/weapon-setup.service';
import { RegistrationService } from './services/registration.service';
import { OpticsService } from './services/optics.service';
import { ForgotPasswordService } from './services/forgot-password.service';
import { FactoryService } from './services/factory.service';
import { AuthenticationService } from './services/authentication.service';
import { AmmunitionService } from './services/ammunition.service';
import { AdminService } from './services/admin.service';
import { CaliberService } from './services/caliber.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    WeaponService,
    UserService,
    WeaponSetupService,
    RegistrationService,
    OpticsService,
    ForgotPasswordService,
    FactoryService,
    AuthenticationService,
    AmmunitionService,
    AdminService,
    CaliberService,
    ApiConfiguration
  ],
})
export class ApiModule {
  static forRoot(params: ApiConfigurationParams): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [
        {
          provide: ApiConfiguration,
          useValue: params
        }
      ]
    }
  }

  constructor( 
    @Optional() @SkipSelf() parentModule: ApiModule,
    @Optional() http: HttpClient
  ) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
      'See also https://github.com/angular/angular/issues/20575');
    }
  }
}
