import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { UserWeaponSetupAddComponent } from '../user-weapon-setup-add/user-weapon-setup-add.component';
import { UserService } from '../../../core/app/services/user.service';
import { UserWeaponSetupDto } from '../../../core/api/models/user-weapon-setup-dto';
import { TableModule } from 'primeng/table';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { RouterLink } from '@angular/router';
import { UserSetupService } from '../../../core/app/services/user-setup.service';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { lastValueFrom, tap } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user-weapon-setup-list',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    UserWeaponSetupAddComponent,
    TableModule,
    RouterLink
  ],
  templateUrl: './user-weapon-setup-list.component.html',
  styleUrl: './user-weapon-setup-list.component.scss'
})
export class UserWeaponSetupListComponent implements OnInit {
  public isAddNewSetup: boolean = false;
  public weaponsRiffleSetups: UserWeaponSetupDto[] = [];
  public weaponsHandGunSetups: UserWeaponSetupDto[] = [];
  private userSetupService: UserSetupService = inject(UserSetupService);
  private appUserService: UserService = inject(UserService);
  private $_userId: WritableSignal<number> = signal(0);

  public ngOnInit(): void {
    const user = this.appUserService.getProfile();
    if (user) {
      this.$_userId.set(user.id);
    }
  }

  protected setupByUserIdQuery = injectQuery(() => ({
    queryKey: ['setups'],
    queryFn: () =>
      lastValueFrom(
        this.userSetupService.getSetupByUserId(this.$_userId()).pipe(
          catchError((err) => {
            this.userSetupService.errorMessage(err.error.message);
            throw err;
          }),
          tap((res) => {
            this.weaponsRiffleSetups = res.filter(
              (setup) => setup.weapon.type.type === 'RIFFLE'
            );
            this.weaponsHandGunSetups = res.filter(
              (setup) => setup.weapon.type.type === 'HAND_GUN'
            );
          })
        )
      ),
    retry: false,
    enabled: this.$_userId() > 0
  }));

  /**
   * Afficher le formulaire d'ajout de setup
   */
  public addSetup(): void {
    this.isAddNewSetup = !this.isAddNewSetup;
  }

  public setupAdded(newSetup: UserWeaponSetupDto): void {
    newSetup.weapon.type.type === 'RIFFLE'
      ? this.weaponsRiffleSetups.push(newSetup)
      : this.weaponsHandGunSetups.push(newSetup);
    this.isAddNewSetup = false;
  }
}
