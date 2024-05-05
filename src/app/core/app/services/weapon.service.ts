import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { WeaponDto } from '../../api/models/weapon-dto';
import { MapperWeaponService } from '../api-service-mapper/mapper-weapon.service';
import { MapperFactoryService } from '../api-service-mapper/mapper-factory.service';
import { FactoryDto } from '../../api/models/factory-dto';
import { FactoryType } from '../enum/FactoryType.enum';
import { WeaponCreateDto } from '../../api/models/weapon-create-dto';
import { MapperCaliberService } from '../api-service-mapper/mapper-caliber.service';
import { CaliberDto } from '../../api/models/caliber-dto';
import { WeaponTypeDto } from '../../api/models/weapon-type-dto';
import { WeaponCategoryDto } from '../../api/models/weapon-category-dto';
import { CustomMessageService } from './custom-message.service';

@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  private readonly mapperWeaponService: MapperWeaponService =
    inject(MapperWeaponService);
  private readonly mapperFactoryService: MapperFactoryService =
    inject(MapperFactoryService);
  private readonly mapperCaliberService: MapperCaliberService =
    inject(MapperCaliberService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly _currentServiceMessageHeader: string = 'Gestion des armes';
  public getAllWeapons(): Observable<WeaponDto[]> {
    return this.mapperWeaponService.getAllActiveWeapons();
  }

  public disableWeapon(id: number): Observable<WeaponDto[]> {
    return this.mapperWeaponService.disableWeapon(id);
  }

  public createWeapon(weapon: WeaponCreateDto): Observable<WeaponDto> {
    return this.mapperWeaponService.create(weapon);
  }

  public editWeapon(weapon: WeaponDto): Observable<WeaponDto> {
    return this.mapperWeaponService.edit(weapon);
  }

  public getWeaponFactories(): Observable<FactoryDto[]> {
    return this.mapperFactoryService.getAllFactoryByType(FactoryType.WEAPON);
  }

  public getWeaponTypes(): Observable<WeaponTypeDto[]> {
    return this.mapperWeaponService.getWeaponTypes();
  }

  public getWeaponCategories(): Observable<WeaponCategoryDto[]> {
    return this.mapperWeaponService.getWeaponCategories();
  }

  public getWeaponCalibers(): Observable<CaliberDto[]> {
    return this.mapperCaliberService.getAll();
  }
  public successMessage(message: string): void {
    this.customMessageService.successMessage(
      this._currentServiceMessageHeader,
      message
    );
  }
  public errorMessage(message: string): void {
    this.customMessageService.errorMessage(
      this._currentServiceMessageHeader,
      message
    );
  }
}
