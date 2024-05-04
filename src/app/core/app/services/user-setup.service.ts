import { inject, Injectable } from '@angular/core';
import { MapperWeaponService } from '../api-service-mapper/mapper-weapon.service';
import { Observable } from 'rxjs';
import { WeaponDto } from '../../api/models/weapon-dto';
import { UserWeaponSetupCreateDto } from '../../api/models/user-weapon-setup-create-dto';
import { UserWeaponSetupDto } from '../../api/models/user-weapon-setup-dto';
import { MapperUserSetupService } from '../api-service-mapper/mapper-user-setup.service';
import { MapperOpticsService } from '../api-service-mapper/mapper-optics.service';
import { OpticsDto } from '../../api/models/optics-dto';

@Injectable({
  providedIn: 'root'
})
export class UserSetupService {
  private readonly mapperWeaponService: MapperWeaponService =
    inject(MapperWeaponService);
  private readonly mapperUserSetupService: MapperUserSetupService = inject(
    MapperUserSetupService
  );
  private readonly mapperOpticsService: MapperOpticsService =
    inject(MapperOpticsService);

  public getAllWeapons(): Observable<WeaponDto[]> {
    return this.mapperWeaponService.getAllWeapons();
  }

  public save(setup: UserWeaponSetupCreateDto): Observable<UserWeaponSetupDto> {
    return this.mapperUserSetupService.save(setup);
  }

  public getSetupByUserId(id: number): Observable<UserWeaponSetupDto[]> {
    return this.mapperUserSetupService.getAllSetupByUser(id);
  }

  public getAllActivesOptics(): Observable<OpticsDto[]> {
    return this.mapperOpticsService.getAllActives();
  }
}
