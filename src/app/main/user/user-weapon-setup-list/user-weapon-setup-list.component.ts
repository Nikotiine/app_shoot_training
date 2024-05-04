import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { UserWeaponSetupAddComponent } from '../user-weapon-setup-add/user-weapon-setup-add.component';
import { UserService } from '../../../core/app/services/user.service';
import { UserWeaponSetupDto } from '../../../core/api/models/user-weapon-setup-dto';
import { TableModule } from 'primeng/table';
import { CustomMessageService } from '../../../core/app/services/custom-message.service';
import { RouterLink } from '@angular/router';
import { UserSetupService } from '../../../core/app/services/user-setup.service';

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
  public weaponsSetups: UserWeaponSetupDto[] = [];
  private userSetupService: UserSetupService = inject(UserSetupService);
  private appUserService: UserService = inject(UserService);
  private customMessageService: CustomMessageService =
    inject(CustomMessageService);

  public ngOnInit(): void {
    const user = this.appUserService.getProfile();
    if (user) {
      this.loadData(user.id);
    }
  }

  private loadData(id: number): void {
    this.userSetupService.getSetupByUserId(id).subscribe({
      next: (data) => {
        this.weaponsSetups = data;
      },
      error: (err) => {
        this.customMessageService.errorMessage(
          'Setup liste',
          err.error.message
        );
      }
    });
  }

  /**
   * Afficher le formulaire d'ajout de setup
   */
  public addSetup(): void {
    this.isAddNewSetup = !this.isAddNewSetup;
  }

  public setupAdded(newSetup: UserWeaponSetupDto): void {
    this.weaponsSetups.push(newSetup);
    this.isAddNewSetup = false;
  }
}
