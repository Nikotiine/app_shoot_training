import { inject, Injectable } from '@angular/core';
import { MapperWeaponService } from '../api-service-mapper/mapper-weapon.service';
import { Observable } from 'rxjs';
import { WeaponDto } from '../../api/models/weapon-dto';
import { UserWeaponSetupCreateDto } from '../../api/models/user-weapon-setup-create-dto';
import { UserWeaponSetupDto } from '../../api/models/user-weapon-setup-dto';
import { MapperUserSetupService } from '../api-service-mapper/mapper-user-setup.service';
import { MapperOpticsService } from '../api-service-mapper/mapper-optics.service';
import { OpticsDto } from '../../api/models/optics-dto';
import { CustomMessageService } from './custom-message.service';

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

  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);

  private readonly _currentServiceMessageHeader: string =
    "Gestion des setup d'arme";

  public getAllWeapons(): Observable<WeaponDto[]> {
    return this.mapperWeaponService.getAllActiveWeapons();
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
