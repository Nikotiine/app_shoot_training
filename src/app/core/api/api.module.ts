/* tslint:disable */
/* eslint-disable */
import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfiguration, ApiConfigurationParams } from './api-configuration';

import { ApiAmmunitionWeightService } from './services/api-ammunition-weight.service';
import { ApiWeaponService } from './services/api-weapon.service';
import { ApiOpticsService } from './services/api-optics.service';
import { ApiFactoryService } from './services/api-factory.service';
import { ApiCaliberService } from './services/api-caliber.service';
import { ApiAmmunitionService } from './services/api-ammunition.service';
import { ApiUserService } from './services/api-user.service';
import { ApiTrainingSessionService } from './services/api-training-session.service';
import { ApiUserWeaponSetupService } from './services/api-user-weapon-setup.service';
import { RegistrationService } from './services/registration.service';
import { ForgotPasswordService } from './services/forgot-password.service';
import { AuthenticationService } from './services/authentication.service';
import { AdminService } from './services/admin.service';

/**
 * Module that provides all services and configuration.
 */
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    ApiAmmunitionWeightService,
    ApiWeaponService,
    ApiOpticsService,
    ApiFactoryService,
    ApiCaliberService,
    ApiAmmunitionService,
    ApiUserService,
    ApiTrainingSessionService,
    ApiUserWeaponSetupService,
    RegistrationService,
    ForgotPasswordService,
    AuthenticationService,
    AdminService,
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
