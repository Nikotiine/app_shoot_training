import { inject, Injectable } from '@angular/core';
import { TrainingSessionService } from '../../api/services/training-session.service';
import { WeaponSetupService } from '../../api/services/weapon-setup.service';
import { AmmunitionService } from '../../api/services/ammunition.service';
import { Observable } from 'rxjs';
import { UserWeaponSetupDto } from '../../api/models/user-weapon-setup-dto';
import { AmmunitionDto } from '../../api/models/ammunition-dto';
import { TrainingSessionCreateDto } from '../../api/models/training-session-create-dto';
import { TrainingSessionDto } from '../../api/models/training-session-dto';
import { CustomMessageService } from './custom-message.service';
import { TrainingPosition, WeaponSupport } from '../enum/TrainingSession.enum';
import { DropdownModel } from '../model/DropdownModel';

@Injectable({
  providedIn: 'root'
})
export class CustomTrainingService {
  // Private field
  private readonly trainingSessionService: TrainingSessionService = inject(
    TrainingSessionService
  );
  private readonly userSetupService: WeaponSetupService =
    inject(WeaponSetupService);
  private readonly ammunitionService: AmmunitionService =
    inject(AmmunitionService);
  private readonly customMessageService: CustomMessageService =
    inject(CustomMessageService);
  private readonly _currentPageMessageHeader: string = 'Gestion des sesssion';

  public getUserSetups(id: number): Observable<UserWeaponSetupDto[]> {
    return this.userSetupService.getAllUserWeaponSetup({
      id: id
    });
  }

  public getAmmunitionByCaliber(id: number): Observable<AmmunitionDto[]> {
    return this.ammunitionService.getAmmunitionByCaliber({
      id: id
    });
  }

  public saveTrainingSession(
    trainingSession: TrainingSessionCreateDto
  ): Observable<TrainingSessionDto> {
    return this.trainingSessionService.createTrainingSession({
      body: trainingSession
    });
  }

  public successCreateMessage(): void {
    this.customMessageService.successMessage(
      this._currentPageMessageHeader,
      'Session Ajoutée'
    );
  }

  public successUpdateMessage(): void {
    this.customMessageService.successMessage(
      this._currentPageMessageHeader,
      'Session Modifie'
    );
  }

  public errorMessage(message: string): void {
    this.customMessageService.errorMessage(
      this._currentPageMessageHeader,
      message
    );
  }

  public getTrainingPositions(): DropdownModel[] {
    return [
      {
        id: 1,
        name: 'Debout',
        apiEnum: TrainingPosition.STANDING
      },
      {
        id: 2,
        name: 'A genoux',
        apiEnum: TrainingPosition.KNEELING
      },
      {
        id: 3,
        name: 'Assis',
        apiEnum: TrainingPosition.SEATED
      },
      {
        id: 4,
        name: 'Couché',
        apiEnum: TrainingPosition.LYING
      }
    ];
  }

  public getWeaponSupports(): DropdownModel[] {
    return [
      {
        id: 1,
        name: 'Sac de tir',
        apiEnum: WeaponSupport.BAG
      },
      {
        id: 2,
        name: 'Bipied',
        apiEnum: WeaponSupport.BIPOD
      },
      {
        id: 3,
        name: 'Bras franc',
        apiEnum: WeaponSupport.HAND
      }
    ];
  }
}
