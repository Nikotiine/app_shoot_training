import { inject, Injectable } from '@angular/core';
import { ApiUserWeaponSetupService } from '../../api/services/api-user-weapon-setup.service';
import { Observable } from 'rxjs';
import { UserWeaponSetupDto } from '../../api/models/user-weapon-setup-dto';
import { UserWeaponSetupCreateDto } from '../../api/models/user-weapon-setup-create-dto';

@Injectable({
  providedIn: 'root'
})
export class MapperUserSetupService {
  private readonly apiUserWeaponSetupService: ApiUserWeaponSetupService =
    inject(ApiUserWeaponSetupService);

  public getAllSetupByUser(id: number): Observable<UserWeaponSetupDto[]> {
    return this.apiUserWeaponSetupService.getAllUserWeaponSetup({
      id: id
    });
  }
  public save(setup: UserWeaponSetupCreateDto): Observable<UserWeaponSetupDto> {
    return this.apiUserWeaponSetupService.newSetup({
      body: setup
    });
  }
}
