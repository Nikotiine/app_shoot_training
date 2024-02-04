import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { UserWeaponSetupAddComponent } from '../user-weapon-setup-add/user-weapon-setup-add.component';
import { WeaponSetupService } from '../../../core/api/services/weapon-setup.service';
import { AppUserService } from '../../../core/app/services/app-user.service';

@Component({
  selector: 'app-user-weapon-setup-list',
  standalone: true,
  imports: [ButtonModule, DialogModule, UserWeaponSetupAddComponent],
  templateUrl: './user-weapon-setup-list.component.html',
  styleUrl: './user-weapon-setup-list.component.scss'
})
export class UserWeaponSetupListComponent implements OnInit {
  public visible: boolean = false;
  private weaponSetupService: WeaponSetupService = inject(WeaponSetupService);
  private appUserService: AppUserService = inject(AppUserService);
  public addSetup(): void {
    this.visible = !this.visible;
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    const userId = this.appUserService.getProfile().id;
    if (userId) {
      this.weaponSetupService
        .getAllUserWeaponSetup({
          id: userId
        })
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.log(err);
          }
        });
    }
  }
}
