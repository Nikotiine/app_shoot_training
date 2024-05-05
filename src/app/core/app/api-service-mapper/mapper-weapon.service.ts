import { inject, Injectable } from '@angular/core';
import { ApiWeaponService } from '../../api/services/api-weapon.service';
import { Observable } from 'rxjs';
import { WeaponDto } from '../../api/models/weapon-dto';
import { WeaponCreateDto } from '../../api/models/weapon-create-dto';
import { WeaponCategoryDto } from '../../api/models/weapon-category-dto';
import { WeaponTypeDto } from '../../api/models/weapon-type-dto';

@Injectable({
  providedIn: 'root'
})
export class MapperWeaponService {
  private readonly apiWeaponService: ApiWeaponService =
    inject(ApiWeaponService);

  public getAllActiveWeapons(): Observable<WeaponDto[]> {
    return this.apiWeaponService.getAllActiveWeapons();
  }

  public disableWeapon(id: number): Observable<WeaponDto[]> {
    return this.apiWeaponService.disableWeapon({
      id: id
    });
  }

  public create(weapon: WeaponCreateDto): Observable<WeaponDto> {
    return this.apiWeaponService.newWeapon({
      body: weapon
    });
  }

  public edit(weapon: WeaponDto): Observable<WeaponDto> {
    return this.apiWeaponService.editWeapon({
      body: weapon
    });
  }

  public getWeaponCategories(): Observable<WeaponCategoryDto[]> {
    return this.apiWeaponService.getAllCategories();
  }

  public getWeaponTypes(): Observable<WeaponTypeDto[]> {
    return this.apiWeaponService.getAllType();
  }
}
